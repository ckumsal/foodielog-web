import { cache } from "react";
import {
  getMockDishShareRecord,
  type MockDishShareRecord,
} from "@/lib/mockDishShareData";

type DishShareRow = {
  id: string;
  photo_url: string | null;
  photo_feed_url?: string | null;
  photo_detail_url?: string | null;
  photo_original_url?: string | null;
  city: string | null;
  created_at: string;
  restaurant: {
    name: string | null;
    city: string | null;
    country: string | null;
  } | null;
  canonical_dish: {
    primary_name: string | null;
  } | null;
};

export type DishShareData = MockDishShareRecord & {
  source: "real" | "fallback";
};

const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80";

const PHOTO_VARIANT_FILE_NAMES = {
  feed: "feed_4x5.jpg",
  detail: "detail_1600.jpg",
  original: "original.jpg",
} as const;

export const getDishShareDataById = cache(
  async (dishId: string): Promise<DishShareData> => {
    logDebug(`dish_fetch_started dish_id=${dishId}`);

    try {
      const configuration = getSupabaseConfiguration();

      if (!configuration) {
        throw new Error("Missing Supabase environment variables.");
      }

      const response = await fetchShareRows(dishId, configuration);
      logDebug(
        `candidate_row_count=${response.length} dish_id=${dishId}`,
      );

      if (response.length === 0) {
        logDebug(`dish_fetch_not_found dish_id=${dishId}`);
        return toFallbackShareData(dishId);
      }

      const representative = selectRepresentativeRow(response);

      if (!representative) {
        logDebug(`dish_fetch_not_found dish_id=${dishId}`);
        return toFallbackShareData(dishId);
      }

      const dishName = normalizeText(
        representative.canonical_dish?.primary_name,
      ) ?? "Memorable dish";
      const restaurantName = normalizeText(representative.restaurant?.name);
      const city =
        normalizeText(representative.restaurant?.city) ??
        normalizeText(representative.city);
      const country = normalizeText(representative.restaurant?.country);
      const imageSelection = selectRepresentativeImage(representative);
      const imageUrl = imageSelection?.url ?? FALLBACK_HERO_IMAGE;

      logDebug(`representative_row_selected id=${representative.id}`);
      logDebug(`representative_image_selected url=${imageUrl}`);

      logDebug(`dish_fetch_succeeded dish_id=${dishId}`);

      return {
        id: dishId,
        dishName,
        restaurantName,
        city,
        country,
        imageUrl,
        tagline:
          restaurantName && city
            ? `${dishName} in ${city}`
            : "Discovered on FoodieLog",
        hook: "Discovered on FoodieLog",
        source: "real",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown_error";
      logDebug(`dish_fetch_failed dish_id=${dishId} error=${message}`);
      return toFallbackShareData(dishId);
    }
  },
);

async function fetchShareRows(
  dishId: string,
  configuration: { url: string; anonKey: string },
): Promise<DishShareRow[]> {
  const richSelect = [
    "id",
    "photo_url",
    "photo_feed_url",
    "photo_detail_url",
    "photo_original_url",
    "city",
    "created_at",
    "restaurant:restaurants!dish_posts_restaurant_id_fkey(name,city,country)",
    "canonical_dish:canonical_dishes!dish_posts_canonical_dish_id_fkey(primary_name)",
  ].join(",");

  try {
    return await requestShareRows(dishId, configuration, richSelect);
  } catch (error) {
    if (!shouldFallbackToLegacyPhotoSelect(error)) {
      throw error;
    }

    return requestShareRows(
      dishId,
      configuration,
      [
        "id",
        "photo_url",
        "city",
        "created_at",
        "restaurant:restaurants!dish_posts_restaurant_id_fkey(name,city,country)",
        "canonical_dish:canonical_dishes!dish_posts_canonical_dish_id_fkey(primary_name)",
      ].join(","),
    );
  }
}

async function requestShareRows(
  dishId: string,
  configuration: { url: string; anonKey: string },
  select: string,
): Promise<DishShareRow[]> {
  const requestUrl = new URL("/rest/v1/dish_posts", configuration.url);
  requestUrl.searchParams.set("select", select);
  requestUrl.searchParams.set("canonical_dish_id", `eq.${dishId}`);
  requestUrl.searchParams.set("order", "created_at.desc");
  requestUrl.searchParams.set("limit", "12");

  const response = await fetch(requestUrl, {
    method: "GET",
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
      `Supabase responded with ${response.status}: ${errorText}`,
    );
  }

  return (await response.json()) as DishShareRow[];
}

function selectRepresentativeRow(rows: DishShareRow[]): DishShareRow | null {
  rows.forEach((row) => {
    const selectedImage = selectRepresentativeImage(row);
    logDebug(
      `candidate_image_url row_id=${row.id} url=${selectedImage?.url ?? "none"}`,
    );
  });

  return rows
    .map((row) => ({
      row,
      imageSelection: selectRepresentativeImage(row),
      score:
        (selectRepresentativeImage(row)?.score ?? 0) * 100 +
        (normalizeText(row.restaurant?.name) ? 2 : 0) +
        (normalizeText(row.restaurant?.city) ?? normalizeText(row.city) ? 2 : 0) +
        (normalizeText(row.restaurant?.country) ? 1 : 0),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return (
        new Date(right.row.created_at).getTime() -
        new Date(left.row.created_at).getTime()
      );
    })[0]?.row ?? null;
}

function toFallbackShareData(dishId: string): DishShareData {
  const fallback = getMockDishShareRecord(dishId);
  return {
    ...fallback,
    imageUrl: fallback.imageUrl || FALLBACK_HERO_IMAGE,
    source: "fallback",
  };
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

function normalizeText(value: string | null | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function selectRepresentativeImage(
  row: DishShareRow,
): { url: string; source: string; score: number } | null {
  const orderedCandidates: Array<{ url?: string; source: string; score: number }> = [
    {
      url: normalizeText(row.photo_detail_url),
      source: "photo_detail_url",
      score: 6,
    },
    {
      url: deriveVariantUrl(row.photo_original_url, PHOTO_VARIANT_FILE_NAMES.detail),
      source: "photo_original_url->detail",
      score: 5,
    },
    {
      url: normalizeText(row.photo_original_url),
      source: "photo_original_url",
      score: 4,
    },
    {
      url: normalizeText(row.photo_feed_url),
      source: "photo_feed_url",
      score: 3,
    },
    {
      url: deriveVariantUrl(row.photo_url, PHOTO_VARIANT_FILE_NAMES.detail),
      source: "photo_url->detail",
      score: 2,
    },
    {
      url: normalizeText(row.photo_url),
      source: "photo_url",
      score: 1,
    },
  ];

  const selected = orderedCandidates.find((candidate) => candidate.url);
  if (!selected?.url) {
    return null;
  }

  return {
    url: selected.url,
    source: selected.source,
    score: selected.score,
  };
}

function deriveVariantUrl(
  source: string | null | undefined,
  targetFileName: string,
): string | undefined {
  const normalized = normalizeText(source);
  if (!normalized) {
    return undefined;
  }

  try {
    const sourceUrl = new URL(normalized);
    const currentFileName = sourceUrl.pathname.split("/").pop()?.toLowerCase();
    const knownNames = new Set<string>([
      PHOTO_VARIANT_FILE_NAMES.feed,
      PHOTO_VARIANT_FILE_NAMES.detail,
      PHOTO_VARIANT_FILE_NAMES.original,
    ]);

    if (!currentFileName || !knownNames.has(currentFileName)) {
      return undefined;
    }

    return sourceUrl.href.replace(/[^/]+$/, targetFileName);
  } catch {
    return undefined;
  }
}

function shouldFallbackToLegacyPhotoSelect(error: unknown): boolean {
  const message =
    error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  return (
    message.includes("photo_feed_url") ||
    message.includes("photo_detail_url") ||
    message.includes("photo_original_url") ||
    message.includes("schema cache") ||
    message.includes("column")
  );
}

function logDebug(message: string) {
  console.log(`[WebDishShareDebug] ${message}`);
}
