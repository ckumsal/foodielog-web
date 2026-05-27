import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublicMapDish } from "@/lib/publicMapDishes";

export const dynamicParams = true;
export const dynamic = "force-dynamic";

type DishSharePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ??
  "https://apps.apple.com/us/app/foodielog/id6736481989";

export async function generateMetadata({
  params,
}: DishSharePageProps): Promise<Metadata> {
  const { id } = await params;
  const dish = await getPublicMapDish(id);

  if (!dish) {
    return {
      title: "Dish not found",
      description: "This public FoodieLog dish is not available.",
    };
  }

  const description =
    [dish.restaurant_name, dish.city, dish.country].filter(Boolean).join(" · ") ||
    "Discovered on FoodieLog";

  return {
    title: `${dish.dish_name} at ${dish.restaurant_name}`,
    description,
    openGraph: {
      title: `${dish.dish_name} at ${dish.restaurant_name}`,
      description,
      url: `/dish/${id}`,
      type: "website",
      images: [
        {
          url: dish.photo_url,
          width: 1600,
          height: 1200,
          alt: dish.dish_name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dish.dish_name} at ${dish.restaurant_name}`,
      description,
      images: [dish.photo_url],
    },
  };
}

export default async function DishSharePage({ params }: DishSharePageProps) {
  const { id } = await params;
  const dish = await getPublicMapDish(id);
  const appDeepLink = `foodielog://dish/${encodeURIComponent(id)}`;

  if (!dish) {
    return (
      <main className="preview-page">
        <section className="empty-preview">
          <p className="eyebrow">FoodieLog</p>
          <h1>This public dish is not available.</h1>
          <p>It may have been removed or changed to private.</p>
          <Link className="hero-cta" href="/">
            Back to map
          </Link>
        </section>
      </main>
    );
  }

  const locationLabel = [dish.city, dish.country].filter(Boolean).join(", ");

  return (
    <main className="preview-page">
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
              if (!isIOS) return;
              var started = Date.now();
              window.location.href = ${JSON.stringify(appDeepLink)};
              setTimeout(function () {
                if (Date.now() - started < 1800) {
                  document.documentElement.classList.add("show-store-fallback");
                }
              }, 1200);
            })();
          `,
        }}
      />

      <Link className="back-link" href="/">
        Map
      </Link>

      <section className="preview-card">
        <div className="preview-image-wrap">
          <Image
            src={dish.photo_url}
            alt={dish.dish_name}
            fill
            priority
            unoptimized
            sizes="(max-width: 800px) 100vw, 560px"
            className="preview-image"
          />
        </div>

        <div className="preview-content">
          <p className="eyebrow">{locationLabel || "FoodieLog"}</p>
          <h1>{dish.dish_name}</h1>
          <p className="restaurant-name">{dish.restaurant_name}</p>
          <div className="preview-actions">
            <a className="hero-cta" href={appDeepLink}>
              Open in FoodieLog
            </a>
            <a className="store-cta" href={APP_STORE_URL}>
              App Store
            </a>
          </div>
        </div>
      </section>

      <footer className="preview-footer">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/support">Support</a>
      </footer>
    </main>
  );
}
