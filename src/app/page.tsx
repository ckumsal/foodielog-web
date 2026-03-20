export default function FoodieLogLandingPage() {
  const features = [
    {
      title: "Dish Passport",
      body: "A personal record of dishes, cities, countries, and cuisines worth remembering.",
      stat: "44 dishes",
    },
    {
      title: "Signature Dishes",
      body: "Save the meals that define your taste, not just everything you eat.",
      stat: "12 cities",
    },
    {
      title: "Culinary Rank",
      body: "Grow from Food Enthusiast to World Gourmet through real exploration.",
      stat: "5 countries",
    },
  ];

  const dishes = [
    {
      name: "Duck Breast",
      place: "Oberammergau, Germany",
      note: "A dish worth remembering.",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Pizza Margherita",
      place: "Naples, Italy",
      note: "Simple, iconic, unforgettable.",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Sushi",
      place: "Tokyo, Japan",
      note: "Precision, calm, and flavor.",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const ranks = [
    "Food Enthusiast",
    "Curious Eater",
    "City Taster",
    "Culinary Wanderer",
    "Taste Curator",
    "World Gourmet",
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-neutral-50/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10">
              <img
                src="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=300&q=80"
                alt="FoodieLog"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight">FoodieLog</div>
              <div className="text-xs text-neutral-500">Your culinary passport</div>
            </div>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#passport" className="text-sm text-neutral-600 hover:text-neutral-950">Passport</a>
            <a href="#dishes" className="text-sm text-neutral-600 hover:text-neutral-950">Signature Dishes</a>
            <a href="#journey" className="text-sm text-neutral-600 hover:text-neutral-950">Journey</a>
            <a href="#download" className="text-sm text-neutral-600 hover:text-neutral-950">Download</a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80"
              alt="Food table"
              className="h-full w-full scale-105 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/40 to-neutral-50" />
            <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
          </div>

          <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-end gap-10 px-6 pb-12 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-20 lg:pt-28">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                Dishes, places, and stories worth remembering.
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                Track the dishes worth remembering.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                FoodieLog turns memorable meals into a personal culinary passport — across cities,
                cuisines, countries, and the people you shared them with.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  id="download"
                  href="#"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-base font-semibold text-neutral-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
                >
                  Download on the App Store
                </a>
                <a
                  href="#passport"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-base font-medium text-white backdrop-blur-md transition hover:bg-white/15"
                >
                  Explore the passport
                </a>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="relative mx-auto max-w-md rounded-[32px] border border-white/20 bg-white/12 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <div className="overflow-hidden rounded-[28px] bg-[#f7f4ec] shadow-inner">
                  <div className="border-b border-black/5 px-5 py-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
                      Dish Passport
                    </div>
                    <div className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
                      Cem’s culinary journey
                    </div>
                    <div className="mt-2 text-sm text-neutral-500">
                      A record of memorable dishes and places.
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-5">
                    {[
                      ["44", "Dishes"],
                      ["27", "Restaurants"],
                      ["13", "Cuisines"],
                      ["8", "Countries"],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-black/5">
                        <div className="text-3xl font-semibold tracking-tight">{value}</div>
                        <div className="mt-1 text-sm text-neutral-500">{label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-black/5 p-5">
                    <div className="mb-3 text-sm font-medium text-neutral-500">Current rank</div>
                    <div className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-5 py-4 text-white shadow-lg shadow-cyan-500/20">
                      <div>
                        <div className="text-2xl font-semibold tracking-tight">Taste Curator</div>
                        <div className="mt-1 text-sm text-white/80">Next: World Gourmet</div>
                      </div>
                      <div className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                        3 more cities
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-5 -top-6 rounded-3xl border border-white/25 bg-white/15 px-4 py-3 text-sm text-white shadow-xl backdrop-blur-xl">
                  Worth remembering
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="passport" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                More than meals
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                A collection of moments, not just dishes.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
                Every saved dish becomes part of your taste story — where you found it, what city it
                belongs to, and how your culinary world keeps expanding.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    {feature.stat}
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight">{feature.title}</h3>
                  <p className="mt-3 text-base leading-7 text-neutral-600">{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="dishes" className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Signature dishes
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Not everything you eat is worth remembering.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
                FoodieLog is for the dishes you come back to in your mind — the ones that shaped a city,
                a trip, or your taste.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {dishes.map((dish) => (
              <article
                key={dish.name}
                className="group overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-3xl font-semibold tracking-tight">{dish.name}</div>
                    <div className="mt-2 text-sm font-medium text-white/80">{dish.place}</div>
                    <div className="mt-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/90 backdrop-blur-md">
                      {dish.note}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="rounded-[36px] bg-neutral-950 p-8 text-white shadow-2xl shadow-neutral-950/10 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
                  Culinary rank
                </div>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  Your taste evolves. So does your rank.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
                  Grow from Food Enthusiast to World Gourmet through real exploration — dishes, cities,
                  cuisines, and countries that define your journey.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {ranks.map((rank, index) => (
                  <div
                    key={rank}
                    className={`rounded-3xl border px-5 py-4 ${
                      index === ranks.length - 1
                        ? "border-cyan-400/30 bg-cyan-400/10 text-white"
                        : "border-white/10 bg-white/5 text-white/85"
                    }`}
                  >
                    <div className="text-xs uppercase tracking-[0.18em] text-white/40">
                      Rank {index + 1}
                    </div>
                    <div className="mt-2 text-lg font-semibold tracking-tight">{rank}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-black/5">
              <div className="border-b border-black/5 px-6 py-5">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  Journey map
                </div>
                <div className="mt-2 text-3xl font-semibold tracking-tight">See where your taste has taken you.</div>
              </div>
              <div className="relative h-[360px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&w=1600&q=80"
                  alt="World map"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-black/5" />
                <div className="absolute left-[22%] top-[36%] h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_0_10px_rgba(34,211,238,0.15)]" />
                <div className="absolute left-[46%] top-[32%] h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_0_10px_rgba(34,211,238,0.15)]" />
                <div className="absolute left-[62%] top-[48%] h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_0_10px_rgba(34,211,238,0.15)]" />
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Why FoodieLog
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Keep the dishes that actually mattered.
              </h2>
              <div className="mt-8 space-y-5 text-lg leading-8 text-neutral-600">
                <p>Save unforgettable meals with their place, story, and context.</p>
                <p>Build a passport across countries, cuisines, and standout restaurants.</p>
                <p>Share your taste with a profile that feels personal, not performative.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="overflow-hidden rounded-[40px] bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-600 px-8 py-14 text-white shadow-2xl shadow-cyan-500/20 md:px-12 md:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
                Start your culinary passport
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                The next unforgettable dish should have a place to live.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/80">
                Download FoodieLog and turn memorable meals into a collection of taste, place, and story.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-base font-semibold text-neutral-950 shadow-lg shadow-black/10 transition hover:-translate-y-0.5"
                >
                  Download on the App Store
                </a>
                <a
                  href="#passport"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-base font-medium text-white backdrop-blur-md transition hover:bg-white/15"
                >
                  Explore the concept
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
