import type { Metadata } from "next";
import { getProfileShareDataByUsername } from "@/lib/getProfileShareDataByUsername";

export const dynamicParams = true;
export const dynamic = "force-dynamic";

type ProfileSharePageProps = {
  params: Promise<{
    username: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProfileSharePageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfileShareDataByUsername(username);
  const title =
    profile.source === "real"
      ? `${profile.displayName} on FoodieLog`
      : "FoodieLog Profile";
  const description =
    profile.source === "real"
      ? `${profile.stats.dishes} dishes • ${profile.stats.cuisines} cuisines • ${profile.stats.countries} countries`
      : "A culinary passport on FoodieLog.";
  const image = profile.avatarURL || `/profile/${username}/opengraph-image`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/profile/${username}`,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProfileSharePage({
  params,
}: ProfileSharePageProps) {
  const { username } = await params;
  const profile = await getProfileShareDataByUsername(username);
  const requestedPath = `/profile/${username}`;
  console.log(
    `[WebProfileUniversalLinkDebug] profile_request_received path=${requestedPath}`,
  );
  console.log("[WebProfileShareDebug] hero_image_render_mode=html_img");

  if (profile.source === "fallback") {
    console.log(
      `[WebProfileShareDebug] fallback_profile_rendered username=${username}`,
    );
  }
  console.log(
    `[WebProfileUniversalLinkDebug] profile_direct_render username=${username}`,
  );
  console.log(
    `[WebProfileUniversalLinkDebug] profile_response_completed username=${username}`,
  );

  return (
    <main className="min-h-screen bg-[#0a0908] text-stone-50">
      <article className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 py-5 sm:px-5">
        <section className="overflow-hidden rounded-[30px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(223,184,112,0.16),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_28px_90px_rgba(0,0,0,0.34)]">
          <div className="border-b border-white/7 px-5 pb-5 pt-7 sm:px-6">
            <div className="flex items-start gap-4">
              {profile.avatarURL ? (
                <img
                  src={profile.avatarURL}
                  alt={profile.displayName}
                  width={76}
                  height={76}
                  className="h-[76px] w-[76px] rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/10 bg-white/6 text-[28px] font-semibold text-stone-100">
                  {profile.displayName.charAt(0)}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-300/70">
                  Dish Passport
                </p>
                <h1 className="mt-2 text-[2rem] leading-[0.95] font-semibold tracking-[-0.05em] text-white sm:text-[2.4rem]">
                  {profile.displayName}
                </h1>
                <p className="mt-2 text-sm text-stone-300/74">
                  @{profile.username}
                  {profile.homeCity ? ` · ${profile.homeCity}` : ""}
                </p>
                {profile.culinaryRankTitle && (
                  <p className="mt-3 inline-flex rounded-full border border-[#dfb870]/20 bg-[#dfb870]/10 px-3 py-1 text-xs font-medium text-[#f3d7a0]">
                    {profile.culinaryRankTitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 px-5 py-5 sm:grid-cols-5 sm:px-6">
            {[
              ["Dishes", profile.stats.dishes],
              ["Restaurants", profile.stats.restaurants],
              ["Cuisines", profile.stats.cuisines],
              ["Cities", profile.stats.cities],
              ["Countries", profile.stats.countries],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/8 bg-white/5 px-3 py-4 text-center"
              >
                <div className="text-2xl font-semibold tracking-[-0.03em] text-white">
                  {value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-stone-300/64">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {profile.signatureDishes.length > 0 && (
          <section className="mt-5 rounded-[28px] border border-white/7 bg-white/4 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-300/70">
              Signature Dishes
            </p>
            <div className="mt-4 space-y-4">
              {profile.signatureDishes.map((dish) => (
                <div key={dish.id} className="flex items-center gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white/6">
                    {dish.imageURL ? (
                      <img
                        src={dish.imageURL}
                        alt={dish.dishName}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-white">
                      {dish.dishName}
                    </p>
                    <p className="truncate text-sm text-stone-300/74">
                      {[dish.restaurantName, dish.city].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-6">
          <a
            href={`foodielog://profile/${profile.username}`}
            className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-[linear-gradient(180deg,#f3d7a0_0%,#dfb870_100%)] px-6 text-[15px] font-semibold tracking-[-0.01em] text-[#18120d] shadow-[0_18px_42px_rgba(223,184,112,0.22)] transition-transform duration-150 hover:-translate-y-0.5"
          >
            Open in App
          </a>
        </div>
      </article>
    </main>
  );
}
