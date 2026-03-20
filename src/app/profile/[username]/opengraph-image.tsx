import { ImageResponse } from "next/og";
import { getProfileShareDataByUsername } from "@/lib/getProfileShareDataByUsername";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type ProfileOpenGraphImageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function Image({ params }: ProfileOpenGraphImageProps) {
  const { username } = await params;
  const profile = await getProfileShareDataByUsername(username);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background:
            "radial-gradient(circle at top, rgba(223,184,112,0.22), transparent 34%), linear-gradient(180deg, #14100c 0%, #090909 100%)",
          color: "#f5efe4",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(245,239,228,0.72)",
            }}
          >
            Dish Passport
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            {profile.displayName}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(245,239,228,0.78)",
            }}
          >
            @{profile.username}
            {profile.homeCity ? ` · ${profile.homeCity}` : ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 22,
          }}
        >
          {[
            ["Dishes", profile.stats.dishes],
            ["Cuisines", profile.stats.cuisines],
            ["Countries", profile.stats.countries],
          ].map(([label, value]) => (
            <div
              key={String(label)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                padding: "18px 22px",
                borderRadius: 22,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ fontSize: 42, fontWeight: 700 }}>{String(value)}</div>
              <div
                style={{
                  fontSize: 20,
                  color: "rgba(245,239,228,0.68)",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                }}
              >
                {String(label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
