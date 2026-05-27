import PublicDishMap from "@/app/components/PublicDishMap";
import ExploreMapButton from "@/app/components/ExploreMapButton";
import { getPublicMapDishes } from "@/lib/publicMapDishes";

export const dynamic = "force-dynamic";

export default async function Home() {
  const dishes = await getPublicMapDishes();

  return (
    <main className="map-shell">
      <PublicDishMap dishes={dishes} />

      <section className="hero-panel" aria-label="FoodieLog public map">
        <p className="eyebrow">Live public dish map</p>
        <h1>Discover the dishes people remember.</h1>
        <p className="hero-copy">
          FoodieLog turns favorite meals into a living map, powered only by
          public dish posts from the app.
        </p>
        <ExploreMapButton />
      </section>

      <footer className="site-footer">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/support">Support</a>
      </footer>
    </main>
  );
}
