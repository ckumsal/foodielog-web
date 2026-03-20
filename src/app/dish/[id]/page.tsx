import type { Metadata } from "next";
import Image from "next/image";
import { getMockDishShareRecord } from "@/lib/mockDishShareData";

type DishSharePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: DishSharePageProps): Promise<Metadata> {
  const { id } = await params;
  const dish = getMockDishShareRecord(id);
  const description = `${dish.restaurantName} · ${dish.city}`;

  return {
    title: dish.dishName,
    description,
    openGraph: {
      title: dish.dishName,
      description,
      url: `/dish/${id}`,
      type: "website",
      images: [
        {
          url: dish.imageUrl,
          width: 1600,
          height: 1200,
          alt: dish.dishName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dish.dishName,
      description,
      images: [dish.imageUrl],
    },
  };
}

export default async function DishSharePage({ params }: DishSharePageProps) {
  const { id } = await params;
  const dish = getMockDishShareRecord(id);
  const locationLabel = `${dish.city}, ${dish.country}`;

  return (
    <main className="min-h-screen bg-[#0a0908] text-stone-50">
      <article className="mx-auto flex min-h-screen w-full max-w-xl flex-col">
        <section className="relative min-h-[62vh] overflow-hidden">
          <Image
            src={dish.imageUrl}
            alt={dish.dishName}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/90" />

          <div className="relative flex min-h-[62vh] flex-col justify-end px-5 pb-6 pt-16 sm:px-6">
            <div className="max-w-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-200/72">
                Discovered on FoodieLog
              </p>

              <h1 className="mt-3 text-[2.35rem] leading-[0.95] font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                {dish.dishName}
              </h1>

              <div className="mt-4 space-y-1.5">
                <p className="text-base font-medium text-white/90">
                  {dish.restaurantName}
                </p>
                <p className="text-sm text-white/68">{locationLabel}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-1 flex-col gap-6 px-5 py-6 sm:px-6">
          <div className="space-y-2">
            <p className="text-base leading-6 text-stone-100/88">
              {dish.tagline ?? `${dish.userDisplayName}'s pick in ${dish.city}`}
            </p>

            <p className="text-sm leading-6 text-stone-300/74">
              {dish.userDisplayName}
              {dish.culinaryRank ? ` · ${dish.culinaryRank}` : ""}
              {dish.hook ? ` · ${dish.hook}` : ""}
            </p>
          </div>

          <a
            href={`foodielog://dish/${id}`}
            className="inline-flex min-h-13 items-center justify-center rounded-full bg-[linear-gradient(180deg,#f3d7a0_0%,#dfb870_100%)] px-6 text-[15px] font-semibold tracking-[-0.01em] text-[#18120d] shadow-[0_18px_42px_rgba(223,184,112,0.22)] transition-transform duration-150 hover:-translate-y-0.5"
          >
            Open in App
          </a>
        </section>
      </article>
    </main>
  );
}
