const features = [
  {
    title: "Recognize dishes",
    text: "Snap or upload a photo and get an instant dish suggestion.",
  },
  {
    title: "Save memories",
    text: "Keep the dishes you actually want to remember, with place and context.",
  },
  {
    title: "Discover nearby",
    text: "Find dishes loved by real food lovers around you.",
  },
];

const pills = [
  "Near you",
  "In a city",
  "Around the world",
  "Dish-first results",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F0F10] text-white">
      <div className="mx-auto max-w-6xl px-6">
        <header className="flex items-center justify-between py-7">
          <div className="text-2xl font-extrabold tracking-tight">FoodieLog</div>

          <nav className="hidden gap-6 text-sm text-white/65 md:flex">
            <a href="#features">Features</a>
            <a href="#passport">Passport</a>
            <a href="/support">Support</a>
          </nav>
        </header>

        <section className="grid items-center gap-14 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-[#42E8C6]">
              Dish-first food discovery
            </p>

            <h1 className="max-w-3xl text-6xl font-black leading-[0.95] tracking-[-0.07em] md:text-8xl">
              Know what you’re eating. 
              Instantly.
            </h1>

            <p className="mt-7 max-w-xl text-xl leading-8 text-white/70">
              FoodieLog helps you recognize, remember, and discover the best
              dishes around you. Not just restaurants, the actual dishes worth
              eating.
                </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
              href="https://apps.apple.com/app/idYOUR_APP_ID"
              className="rounded-full bg-[#42E8C6] px-6 py-4 font-bold text-[#07110F]"
              >
              Get FoodieLog
              </a>

<p className="mt-3 text-lg font-semibold text-[#42E8C6]">
  No ads. Just great food.
</p>
              <a
                href="#features"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-4 font-bold text-white"
              >
                Explore FoodieLog
              </a>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl">
            <div className="overflow-hidden rounded-[2rem] bg-[#111] p-5">
              <div className="flex items-center justify-between pb-5 text-sm text-white/70">
                <span>9:41</span>
                <span>Add Dish</span>
                <span>●●●</span>
              </div>

              <div className="h-[420px] rounded-[1.75rem] bg-gradient-to-br from-[#42E8C6]/30 to-transparent p-5">
                <div className="h-full rounded-[1.4rem] bg-[url('/hero-food.jpg')] bg-cover bg-center" />
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-[#42E8C6]">
                  AI suggestion
                </p>
                <p className="mt-1 text-3xl font-black">Ahi tuna salad</p>
                <p className="mt-1 text-white/60">Looks like a match.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <h2 className="max-w-3xl text-5xl font-black leading-none tracking-[-0.05em] md:text-6xl">
            Everything starts with the dish.
          </h2>

          <p className="mt-5 max-w-2xl text-xl leading-8 text-white/65">
            Restaurant apps tell you where to go. FoodieLog helps you decide
            what to eat, save what matters, and build a personal record of your
            taste.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-7"
              >
                <h3 className="text-2xl font-black tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-3 text-lg leading-7 text-white/65">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid items-center gap-12 py-20 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-[#42E8C6]/10 p-10">
            <h2 className="text-5xl font-black leading-none tracking-[-0.05em]">
              Discover what to eat — anywhere.
            </h2>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#42E8C6]">
              Top dishes
            </p>

            <h2 className="text-5xl font-black leading-none tracking-[-0.05em]">
              Search by city, country, or nearby.
            </h2>

            <p className="mt-5 text-xl leading-8 text-white/65">
              FoodieLog is built around the question every food lover asks:
              what should I eat here?
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/75"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="grid items-center gap-12 py-20 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#42E8C6]">
              Real recommendations
            </p>

            <h2 className="text-5xl font-black leading-none tracking-[-0.05em]">
              See what food lovers actually love.
            </h2>

            <p className="mt-5 text-xl leading-8 text-white/65">
              Follow people whose taste you trust and discover memorable dishes
              through real experiences — not generic ratings.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-10">
            <h2 className="text-5xl font-black leading-none tracking-[-0.05em]">
              Real dishes. Real people. Real recommendations.
            </h2>
          </div>
        </section>

        <section id="passport" className="grid items-center gap-12 py-20 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-[#42E8C6]/10 p-10">
            <h2 className="text-5xl font-black leading-none tracking-[-0.05em]">
              Your personal food passport.
            </h2>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#42E8C6]">
              Taste identity
            </p>

            <h2 className="text-5xl font-black leading-none tracking-[-0.05em]">
              Build a journey through dishes.
            </h2>

            <p className="mt-5 text-xl leading-8 text-white/65">
              Track dishes, restaurants, cuisines, cities, and countries. Earn
              culinary ranks as your taste journey grows.
            </p>
          </div>
        </section>

        <section className="py-24 text-center">
          <h2 className="mx-auto max-w-3xl text-6xl font-black leading-none tracking-[-0.06em]">
            Never forget a great dish again.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-white/65">
            Discover, save, and share the dishes worth remembering with
            FoodieLog.
          </p>

          <a
            href="#"
            className="mt-9 inline-flex rounded-full bg-[#42E8C6] px-7 py-4 font-bold text-[#07110F]"
          >
            Download on the App Store
          </a>
        </section>

        <footer className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 FoodieLog. All rights reserved.</p>

          <div className="flex gap-5">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/support">Support</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
