type LegalPageProps = {
  title: string;
  updated?: string;
  intro?: string;
  children: React.ReactNode;
};

export default function LegalPage({
  title,
  updated,
  intro,
  children,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#0F0F10] px-6 py-20 text-white">
      <article className="mx-auto max-w-3xl">
        <a href="/" className="mb-12 inline-block text-sm font-semibold text-[#42E8C6]">
          ← FoodieLog
        </a>

        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>

        {updated ? (
          <p className="mb-8 text-sm text-white/45">Last updated: {updated}</p>
        ) : null}

        {intro ? (
          <p className="mb-12 max-w-2xl text-xl leading-8 text-white/65">
            {intro}
          </p>
        ) : null}

        <div className="space-y-10">{children}</div>

        <footer className="mt-14 border-t border-white/10 pt-6 text-sm text-white/45">
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            <a href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="transition hover:text-white">
              Terms of Service
            </a>
            <a href="/support" className="transition hover:text-white">
              Support
            </a>
          </div>
          <p className="mt-5">© 2026 FoodieLog</p>
        </footer>
      </article>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-4 text-lg leading-8 text-white/65">{children}</div>
    </section>
  );
}
