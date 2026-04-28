import LegalPage, { LegalSection } from "../components/LegalPage";

export default function TermsPage() {
  return (
    <LegalPage
      title="FoodieLog Terms of Service"
      updated="April 2026"
      intro="FoodieLog is designed to help you discover and remember great dishes. By using the app, you agree to keep things respectful, authentic, and enjoyable for everyone."
    >
      <LegalSection title="Using FoodieLog">
        <p>
          You can use FoodieLog to share dishes, explore recommendations, and save
          your culinary experiences. Please do not misuse the app, including posting
          misleading content, spam, or anything harmful to others.
        </p>
      </LegalSection>

      <LegalSection title="Your Content">
        <p>
          You own the content you post, including photos and dish entries. By
          sharing it on FoodieLog, you allow us to display it within the app and
          improve the experience for other users.
        </p>
      </LegalSection>

      <LegalSection title="Responsibility">
        <p>
          FoodieLog helps you discover dishes, but we do not guarantee the quality,
          safety, or availability of food or restaurants. Always use your own
          judgment when choosing where to eat.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms? Contact us at{" "}
          <a href="mailto:support@foodielog.app" className="text-[#42E8C6] underline">
            support@foodielog.app
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}          .
        </p>

        <div className="border-t border-white/10 pt-6 text-sm text-white/50">
          <a href="/privacy" className="transition hover:text-white">
            Privacy Policy
          </a>
          <span className="mx-3">·</span>
          <a href="/support" className="transition hover:text-white">
            Support
          </a>
        </div>
      </div>
    </main>
  );
}
