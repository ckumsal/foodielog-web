import { cache } from "react";

type ProfileRow = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  home_city: string | null;
};

type PassportSourcePostRow = {
  id: string;
  created_at: string;
  photo_url: string | null;
  photo_feed_url?: string | null;
  canonical_dish: {
    id: string;
    primary_name: string | null;
    cuisine_key?: string | null;
    cuisine_display_name?: string | null;
  };
  restaurant: {
    id: string;
    name: string | null;
    city: string | null;
    country: string | null;
    country_code?: string | null;
    country_name?: string | null;
  };
};

export type ProfileShareData = {
  username: string;
  displayName: string;
  avatarURL?: string;
  homeCity?: string;
  stats: {
    dishes: number;
    restaurants: number;
    cuisines: number;
    cities: number;
    countries: number;
  };
  culinaryRankTitle?: string;
  signatureDishes: Array<{
    id: string;
    dishName: string;
    restaurantName?: string;
    city?: string;
    imageURL?: string;
  }>;
  shareURL: string;
  source: "real" | "fallback";
};

const FALLBACK_PROFILE_SHARE_DATA = (username: string): ProfileShareData => ({
  username,
  displayName: "FoodieLog Member",
  stats: {
    dishes: 0,
    restaurants: 0,
    cuisines: 0,
    cities: 0,
    countries: 0,
  },
  signatureDishes: [],
  shareURL: `https://foodielog.app/profile/${username}`,
  source: "fallback",
});

const CULINARY_RANK_LADDER: Array<{
  title: string;
  dishes?: number;
  cities?: number;
  countries?: number;
  cuisines?: number;
}> = [
  { title: "Food Enthusiast", dishes: 1, cities: 1 },
  { title: "Curious Eater", dishes: 10, cities: 1, cuisines: 1 },
  { title: "Local Explorer", dishes: 10, cities: 3 },
  { title: "Dish Collector", dishes: 25, cities: 3 },
  { title: "City Taster", dishes: 25, cities: 5, cuisines: 3 },
  { title: "Cuisine Seeker", dishes: 25, cuisines: 5 },
  { title: "Urban Foodie", dishes: 50, cities: 5 },
  { title: "Regional Explorer", dishes: 50, cities: 10, countries: 1 },
  { title: "Culinary Wanderer", dishes: 50, countries: 3, cuisines: 5 },
  { title: "Traveling Taster", dishes: 50, cities: 10, countries: 3 },
  { title: "Global Explorer", dishes: 100, countries: 5, cities: 10 },
  { title: "Cultural Foodie", dishes: 100, cuisines: 10, countries: 5 },
  { title: "Taste Curator", dishes: 100, cuisines: 10, cities: 25 },
  { title: "Culinary Connoisseur", dishes: 100, cuisines: 15, countries: 10 },
  { title: "Epicurean", dishes: 100, cities: 50, cuisines: 10 },
  {
    title: "Gastronomy Aficionado",
    dishes: 100,
    countries: 10,
    cities: 25,
    cuisines: 15,
  },
  { title: "World Traveler", countries: 25, cities: 50 },
  { title: "Global Tastemaker", dishes: 100, countries: 25, cuisines: 15 },
  {
    title: "World Gourmet",
    dishes: 100,
    countries: 50,
    cities: 100,
    cuisines: 15,
  },
];

export const getProfileShareDataByUsername = cache(
  async (username: string): Promise<ProfileShareData> => {
    logDebug(`profile_fetch_started username=${username}`);

    try {
      const configuration = getSupabaseConfiguration();
      if (!configuration) {
        throw new Error("Missing Supabase environment variables.");
      }

      const profile = await fetchProfileByUsername(username, configuration);
      if (!profile) {
        logDebug(`profile_fetch_not_found username=${username}`);
        return FALLBACK_PROFILE_SHARE_DATA(username);
      }

      const sourcePosts = await fetchAllPassportSourcePosts(
        profile.id,
        configuration,
      );

      const stats = buildStats(sourcePosts);
      const signatureDishes = buildSignatureDishes(sourcePosts);

      logDebug(`profile_fetch_succeeded username=${username}`);

      return {
        username: profile.username,
        displayName:
          normalizeText(profile.display_name) ??
          normalizeText(profile.username) ??
          "FoodieLog Member",
        avatarURL: normalizeText(profile.avatar_url),
        homeCity: normalizeText(profile.home_city),
        stats,
        culinaryRankTitle: evaluateCulinaryRank(stats),
        signatureDishes,
        shareURL: `https://foodielog.app/profile/${profile.username}`,
        source: "real",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown_error";
      logDebug(`profile_fetch_failed username=${username} error=${message}`);
      return FALLBACK_PROFILE_SHARE_DATA(username);
    }
  },
);

async function fetchProfileByUsername(
  username: string,
  configuration: { url: string; anonKey: string },
): Promise<ProfileRow | null> {
  const requestUrl = new URL("/rest/v1/profiles", configuration.url);
  requestUrl.searchParams.set(
    "select",
    "id,username,display_name,avatar_url,home_city",
  );
  requestUrl.searchParams.set("username", `eq.${username}`);
  requestUrl.searchParams.set("limit", "1");

  const response = await fetch(requestUrl, {
    headers: {
      apikey: configuration.anonKey,
      Authorization: `Bearer ${configuration.anonKey}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Supabase profile query failed ${response.status}: ${errorText}`,
    );
  }

  const rows = (await response.json()) as ProfileRow[];
  return rows[0] ?? null;
}

async function fetchAllPassportSourcePosts(
  profileID: string,
  configuration: { url: string; anonKey: string },
): Promise<PassportSourcePostRow[]> {
  const pageSize = 500;
  let offset = 0;
  const allRows: PassportSourcePostRow[] = [];

  while (true) {
    const page = await fetchPassportSourcePostPage(
      profileID,
      configuration,
      pageSize,
      offset,
    );
    allRows.push(...page);
    if (page.length < pageSize) {
      break;
    }
    offset += pageSize;
  }

  return allRows;
}

async function fetchPassportSourcePostPage(
  profileID: string,
  configuration: { url: string; anonKey: string },
  limit: number,
  offset: number,
): Promise<PassportSourcePostRow[]> {
  const richSelect = [
    "id",
    "created_at",
    "photo_url",
    "photo_feed_url",
    "canonical_dish:canonical_dishes!dish_posts_canonical_dish_id_fkey(id,primary_name,cuisine_key,cuisine_display_name)",
    "restaurant:restaurants!dish_posts_restaurant_id_fkey(id,name,city,country,country_code,country_name)",
  ].join(",");

  try {
    return await requestPassportSourcePostPage(
      profileID,
      configuration,
      richSelect,
      limit,
      offset,
    );
  } catch (error) {
    if (!shouldFallbackToLegacyPassportSelect(error)) {
      throw error;
    }

    return requestPassportSourcePostPage(
      profileID,
      configuration,
      [
        "id",
        "created_at",
        "photo_url",
        "canonical_dish:canonical_dishes!dish_posts_canonical_dish_id_fkey(id,primary_name)",
        "restaurant:restaurants!dish_posts_restaurant_id_fkey(id,name,city,country)",
      ].join(","),
      limit,
      offset,
    );
  }
}

async function requestPassportSourcePostPage(
  profileID: string,
  configuration: { url: string; anonKey: string },
  select: string,
  limit: number,
  offset: number,
): Promise<PassportSourcePostRow[]> {
  const requestUrl = new URL("/rest/v1/dish_posts", configuration.url);
  requestUrl.searchParams.set("select", select);
  requestUrl.searchParams.set("profile_id", `eq.${profileID}`);
  requestUrl.searchParams.set("order", "created_at.desc");
  requestUrl.searchParams.set("limit", String(limit));
  requestUrl.searchParams.set("offset", String(offset));

  const response = await fetch(requestUrl, {
    headers: {
      apikey: configuration.anonKey,
      Authorization: `Bearer ${configuration.anonKey}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Supabase passport posts query failed ${response.status}: ${errorText}`,
    );
  }

  return (await response.json()) as PassportSourcePostRow[];
}

function buildStats(sourcePosts: PassportSourcePostRow[]) {
  const restaurantIDs = new Set<string>();
  const cityTokens = new Set<string>();
  const countryTokens = new Set<string>();
  const cuisineTokens = new Set<string>();

  sourcePosts.forEach((post) => {
    restaurantIDs.add(post.restaurant.id);

    const city = normalizeText(post.restaurant.city);
    if (city) {
      cityTokens.add(city.toLowerCase());
    }

    const country =
      normalizeText(post.restaurant.country_name) ??
      normalizeText(post.restaurant.country_code) ??
      normalizeText(post.restaurant.country);
    if (country) {
      countryTokens.add(country.toLowerCase());
    }

    const cuisine =
      normalizeText(post.canonical_dish.cuisine_key) ??
      normalizeText(post.canonical_dish.cuisine_display_name);
    if (cuisine) {
      cuisineTokens.add(cuisine.toLowerCase());
    }
  });

  return {
    dishes: sourcePosts.length,
    restaurants: restaurantIDs.size,
    cuisines: cuisineTokens.size,
    cities: cityTokens.size,
    countries: countryTokens.size,
  };
}

function buildSignatureDishes(sourcePosts: PassportSourcePostRow[]) {
  const aggregates = new Map<
    string,
    {
      id: string;
      dishName: string;
      restaurantName?: string;
      city?: string;
      imageURL?: string;
      count: number;
      latestCreatedAt: number;
    }
  >();

  sourcePosts.forEach((post) => {
    const key = `${post.canonical_dish.id}|${post.restaurant.id}`;
    const existing = aggregates.get(key);
    const candidateImage =
      normalizeText(post.photo_feed_url) ?? normalizeText(post.photo_url);
    const candidateDate = new Date(post.created_at).getTime();

    if (existing) {
      existing.count += 1;
      existing.latestCreatedAt = Math.max(existing.latestCreatedAt, candidateDate);
      if (!existing.imageURL && candidateImage) {
        existing.imageURL = candidateImage;
      }
      return;
    }

    aggregates.set(key, {
      id: key,
      dishName:
        normalizeText(post.canonical_dish.primary_name) ?? "Memorable dish",
      restaurantName: normalizeText(post.restaurant.name),
      city: normalizeText(post.restaurant.city),
      imageURL: candidateImage,
      count: 1,
      latestCreatedAt: candidateDate,
    });
  });

  return Array.from(aggregates.values())
    .sort((left, right) => {
      if (right.count !== left.count) {
        return right.count - left.count;
      }
      return right.latestCreatedAt - left.latestCreatedAt;
    })
    .slice(0, 3)
    .map(({ id, dishName, restaurantName, city, imageURL }) => ({
      id,
      dishName,
      restaurantName,
      city,
      imageURL,
    }));
}

function evaluateCulinaryRank(stats: ProfileShareData["stats"]) {
  let currentRankTitle: string | undefined;

  CULINARY_RANK_LADDER.forEach((rank) => {
    const qualifies =
      (rank.dishes === undefined || stats.dishes >= rank.dishes) &&
      (rank.cities === undefined || stats.cities >= rank.cities) &&
      (rank.countries === undefined || stats.countries >= rank.countries) &&
      (rank.cuisines === undefined || stats.cuisines >= rank.cuisines);

    if (qualifies) {
      currentRankTitle = rank.title;
    }
  });

  return currentRankTitle;
}

function getSupabaseConfiguration():
  | { url: string; anonKey: string }
  | null {
  const url = normalizeText(
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
      process.env.SUPABASE_URL ??
      process.env.EXPO_PUBLIC_SUPABASE_URL,
  );
  const anonKey = normalizeText(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.SUPABASE_ANON_KEY ??
      process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  );

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

function shouldFallbackToLegacyPassportSelect(error: unknown) {
  const message =
    error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  return (
    message.includes("photo_feed_url") ||
    message.includes("country_code") ||
    message.includes("country_name") ||
    message.includes("cuisine_key") ||
    message.includes("cuisine_display_name") ||
    message.includes("schema cache") ||
    message.includes("column")
  );
}

function normalizeText(value: string | null | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function logDebug(message: string) {
  console.log(`[WebProfileShareDebug] ${message}`);
}
