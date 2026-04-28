import LegalPage, { LegalSection } from "../components/LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="April 27, 2026"
      intro="FoodieLog helps users remember, save, and discover memorable dishes. This policy explains what information we collect and how we use it."
    >
      <LegalSection title="Information We Collect">
        <ul className="list-disc space-y-2 pl-6">
          <li>Account information, such as your Apple Sign In identifier and profile details.</li>
          <li>Dish posts you create, including dish names, restaurant information, photos, and notes.</li>
          <li>Location information when you allow location access.</li>
          <li>Photos you choose to upload or select.</li>
          <li>App usage information, such as saved dishes, follows, and interactions.</li>
        </ul>
      </LegalSection>

      <LegalSection title="How We Use Information">
        <p>
          We use information to provide FoodieLog features, help you save and
          discover dishes, suggest nearby restaurants, maintain security, and
          improve reliability.
        </p>
      </LegalSection>

      <LegalSection title="AI Dish Recognition">
        <p>
          FoodieLog may use AI services to suggest dish names from photos you
          choose to upload or select.
        </p>
      </LegalSection>

      <LegalSection title="Location and Photos">
        <p>
          Location access is optional and helps suggest nearby restaurants and
          dishes. Photos are accessed only when you choose to take or upload a
          dish photo.
        </p>
      </LegalSection>

      <LegalSection title="Account Deletion">
        <p>
          You can request account deletion or data removal by contacting{" "}
          <a href="mailto:support@foodielog.app" className="text-[#42E8C6] underline">
            support@foodielog.app
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions? Email{" "}
          <a href="mailto:support@foodielog.app" className="text-[#42E8C6] underline">
            support@foodielog.app
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
