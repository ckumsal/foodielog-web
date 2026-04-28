export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0F0F10] text-white px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <p className="text-white/50 mb-8">Last updated: April 27, 2026</p>

        <p className="text-white/70 mb-6">
          FoodieLog helps users remember, save, and discover memorable dishes.
          This Privacy Policy explains what information we collect, how we use
          it, and how you can contact us.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">Information We Collect</h2>
        <p className="text-white/70 mb-4">
          When you use FoodieLog, we may collect:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-6">
          <li>Account information, such as your Apple Sign In identifier and profile details.</li>
          <li>Dish posts you create, including dish names, restaurant information, photos, and notes.</li>
          <li>Location information when you allow location access, used to suggest nearby restaurants and dishes.</li>
          <li>Photos you choose to upload or select, used to help create dish memories.</li>
          <li>App usage information, such as saved dishes, follows, and interactions inside the app.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-3">How We Use Information</h2>
        <p className="text-white/70 mb-4">
          We use your information to:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-6">
          <li>Provide and improve FoodieLog features.</li>
          <li>Help you save and discover dishes.</li>
          <li>Suggest nearby restaurants and dishes.</li>
          <li>Show your public dish posts and profile information when you choose to share them.</li>
          <li>Maintain app security, reliability, and support.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-3">AI Dish Recognition</h2>
        <p className="text-white/70 mb-6">
          FoodieLog may use AI services to suggest dish names from photos you
          choose to upload or select. Photos are used only to provide the dish
          recognition feature and improve the dish-saving experience.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">Location Data</h2>
        <p className="text-white/70 mb-6">
          Location access is optional. If you allow it, FoodieLog uses your
          location to suggest nearby restaurants and help you discover dishes
          around you. You can change location permissions at any time in your
          device settings.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">Photos</h2>
        <p className="text-white/70 mb-6">
          FoodieLog accesses photos only when you choose to take or upload a
          dish photo. You control which photos are shared with the app.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">Sharing and Public Content</h2>
        <p className="text-white/70 mb-6">
          Dish posts, profile information, and activity may be visible to other
          users depending on app features and your use of FoodieLog. Do not post
          information you do not want others to see.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">Data Storage</h2>
        <p className="text-white/70 mb-6">
          FoodieLog stores app data using secure backend services. We take
          reasonable measures to protect your information, but no online service
          can guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">Account Deletion</h2>
        <p className="text-white/70 mb-6">
          You can request account deletion or data removal by contacting us at{" "}
          <a
            href="mailto:support@foodielog.app"
            className="text-[#42E8C6] underline"
          >
            support@foodielog.app
          </a>
          . Please contact us from your registered email address.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">Children</h2>
        <p className="text-white/70 mb-6">
          FoodieLog is not intended for children under 13. We do not knowingly
          collect personal information from children under 13.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">Changes to This Policy</h2>
        <p className="text-white/70 mb-6">
          We may update this Privacy Policy from time to time. Updates will be
          posted on this page with a revised date.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">Contact</h2>
        <p className="text-white/70">
          If you have questions about this Privacy Policy, contact us at{" "}
          <a
            href="mailto:support@foodielog.app"
            className="text-[#42E8C6] underline"
          >
            support@foodielog.app
          </a>
          .
        </p>
      </div>
    </main>
  );
}
