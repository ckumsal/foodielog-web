export type MockDishShareRecord = {
  id: string;
  dishName: string;
  restaurantName?: string;
  city?: string;
  country?: string;
  imageUrl: string;
  userDisplayName?: string;
  culinaryRank?: string;
  tagline?: string;
  hook?: string;
  isFallback?: boolean;
};

const mockDishShareRecords: Record<string, MockDishShareRecord> = {
  "123": {
    id: "123",
    dishName: "Bacalhau a Bras",
    restaurantName: "Pateo 51",
    city: "Lisbon",
    country: "Portugal",
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80",
    userDisplayName: "Cem",
    culinaryRank: "Taste Curator",
    tagline: "Cem's pick in Lisbon",
    hook: "Worth remembering",
  },
  "456": {
    id: "456",
    dishName: "Adana Kebap",
    restaurantName: "Ciya Sofrasi",
    city: "Istanbul",
    country: "Turkiye",
    imageUrl:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80",
    userDisplayName: "Salih",
    culinaryRank: "Culinary Wanderer",
    tagline: "Salih's pick in Istanbul",
    hook: "Loved by local foodies",
  },
};

export function findMockDishShareRecord(id: string): MockDishShareRecord | null {
  return mockDishShareRecords[id] ?? null;
}

export function makeFallbackDishShareRecord(id: string): MockDishShareRecord {
  return {
    id,
    dishName: "Memorable dish",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    tagline: "Discovered on FoodieLog",
    hook: "Worth remembering",
    isFallback: true,
  };
}

export function getMockDishShareRecord(id: string): MockDishShareRecord {
  return findMockDishShareRecord(id) ?? makeFallbackDishShareRecord(id);
}
