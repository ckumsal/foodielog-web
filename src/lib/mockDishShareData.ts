export type MockDishShareRecord = {
  id: string;
  dishName: string;
  restaurantName: string;
  city: string;
  country: string;
  imageUrl: string;
  userDisplayName: string;
  culinaryRank?: string;
  tagline?: string;
  hook?: string;
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

export function getMockDishShareRecord(id: string): MockDishShareRecord {
  return (
    mockDishShareRecords[id] ?? {
      id,
      dishName: "Chef's Special Pasta",
      restaurantName: "Luna Trattoria",
      city: "Rome",
      country: "Italy",
      imageUrl:
        "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=1600&q=80",
      userDisplayName: "FoodieLog",
      culinaryRank: "Dish Explorer",
      tagline: "A memorable pick on FoodieLog",
      hook: "Worth trying",
    }
  );
}
