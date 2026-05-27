import { cache } from "react";

export type PublicMapDish = {
  dish_post_id: string;
  dish_name: string;
  restaurant_name: string;
  city: string | null;
  country: string | null;
  latitude: number;
  longitude: number;
  photo_url: string;
};

type PublicMapDishRow = Partial<PublicMapDish> & {
  id?: string;
  canonical_dish_name?: string;
  primary_name?: string;
  name?: string;
  restaurant?: string;
  lat?: number;
  lng?: number;
  image_url?: string;
};

const PUBLIC_MAP_COLUMNS = [
  "dish_post_id",
  "dish_name",
  "restaurant_name",
  "city",
  "country",
  "latitude",
  "longitude",
  "photo_url",
].join(",");

export const getPublicMapDishes = cache(
  async (limit = 500): Promise<PublicMapDish[]> => {
    const configuration = getSupabaseConfiguration();
    if (!configuration) return [];

    const requestUrl = new URL("/rest/v1/public_map_dishes", configuration.url);
    requestUrl.searchParams.set("select", PUBLIC_MAP_COLUMNS);
    requestUrl.searchParams.set("order", "dish_post_id.desc");
    requestUrl.searchParams.set("limit", String(limit));

    const rows = await requestPublicMapRows(requestUrl, configuration);
    return rows
      .map(normalizeDish)
      .filter((dish): dish is PublicMapDish => Boolean(dish));
  },
);

export const getPublicMapDish = cache(
  async (id: string): Promise<PublicMapDish | null> => {
    const configuration = getSupabaseConfiguration();
    if (!configuration) return null;

    const requestUrl = new URL("/rest/v1/public_map_dishes", configuration.url);
    requestUrl.searchParams.set("select", PUBLIC_MAP_COLUMNS);
    requestUrl.searchParams.set("dish_post_id", `eq.${id}`);
    requestUrl.searchParams.set("limit", "1");

    const rows = await requestPublicMapRows(requestUrl, configuration);
    return normalizeDish(rows[0]);
  },
);

async function requestPublicMapRows(
  requestUrl: URL,
  configuration: { url: string; anonKey: string },
): Promise<PublicMapDishRow[]> {
  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        apikey: configuration.anonKey,
        Authorization: `Bearer ${configuration.anonKey}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) return [];
    return (await response.json()) as PublicMapDishRow[];
  } catch {
    return [];
  }
}

function normalizeDish(row: PublicMapDishRow | undefined): PublicMapDish | null {
  if (!row) return null;

  const dishPostID = normalizeText(row.dish_post_id ?? row.id);
  const dishName = normalizeText(
    row.dish_name ?? row.canonical_dish_name ?? row.primary_name ?? row.name,
  );
  const restaurantName = normalizeText(row.restaurant_name ?? row.restaurant);
  const photoURL = normalizeText(row.photo_url ?? row.image_url);
  const latitude = row.latitude ?? row.lat;
  const longitude = row.longitude ?? row.lng;

  if (!dishPostID || !dishName || !restaurantName || !photoURL) return null;
  if (typeof latitude !== "number" || typeof longitude !== "number") return null;

  return {
    dish_post_id: dishPostID,
    dish_name: dishName,
    restaurant_name: restaurantName,
    city: normalizeText(row.city) ?? null,
    country: normalizeText(row.country) ?? null,
    latitude,
    longitude,
    photo_url: photoURL,
  };
}

function getSupabaseConfiguration():
  | { url: string; anonKey: string }
  | null {
  const url = normalizeText(
    process.env.SUPABASE_URL ??
      process.env.NEXT_PUBLIC_SUPABASE_URL ??
      process.env.EXPO_PUBLIC_SUPABASE_URL,
  );
  const anonKey = normalizeText(
    process.env.SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  );

  if (!url || !anonKey) return null;
  return { url, anonKey };
}

function normalizeText(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}
