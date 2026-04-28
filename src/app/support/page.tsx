export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#0F0F10] text-white px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">FoodieLog Support</h1>

        <p className="text-white/70 mb-6">
          Need help with FoodieLog? We’re here to help with any questions,
          feedback, or issues you may have.
        </p>

        <h2 className="text-xl font-semibold mb-2">Contact</h2>
        <p className="text-white/70 mb-6">
          Email us at{" "}
          <a
            href="mailto:support@foodielog.app"
            className="text-[#42E8C6] underline"
          >
            support@foodielog.app
          </a>
        </p>
<p className="text-white/70 mt-6">
  Read our{" "}
  <a href="/privacy" className="text-[#42E8C6] underline">
    Privacy Policy
  </a>
  .
</p>
        <h2 className="text-xl font-semibold mb-2">Account & Data</h2>
        <p className="text-white/70 mb-6">
          To request account deletion or data removal, please contact us from
          your registered email address.
        </p>

        <p className="text-white/50 text-sm">
          We typically respond within 24 hours.
        </p>
      </div>
    </main>
  );
}
