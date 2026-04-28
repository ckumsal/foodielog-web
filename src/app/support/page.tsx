import LegalPage, { LegalSection } from "../components/LegalPage";

export default function SupportPage() {
  return (
    <LegalPage
      title="FoodieLog Support"
      intro="Need help with FoodieLog? We’re here for questions, feedback, or anything that’s not working as expected."
    >
      <LegalSection title="Contact">
        <p>
          Email us at{" "}
          <a href="mailto:support@foodielog.app" className="text-[#42E8C6] underline">
            support@foodielog.app
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Account & Data">
        <p>
          To request account deletion or data removal, contact us from your
          registered email address.
        </p>
      </LegalSection>

      <LegalSection title="Response Time">
        <p>We typically respond within 24 hours.</p>
      </LegalSection>
    </LegalPage>
  );
}
