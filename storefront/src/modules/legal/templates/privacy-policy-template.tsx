import LegalDocumentShell from "./legal-document-shell"

export default function PrivacyPolicyTemplate() {
  return (
    <LegalDocumentShell title="Privacy Policy" effectiveDate="20 June 2026">
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          XYZ London (“we”, “our”, “us”) respects your privacy and is committed to protecting
          your personal data. This policy explains how we collect, use, and safeguard your
          information when you interact with our website and services.
        </p>
        <p>This policy applies to all services, products, and expressions under XYZ London, including OOO.</p>
      </div>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          1. Information We Collect
        </h2>
        <p className="mb-6 text-sm leading-relaxed">We may collect the following:</p>
        <dl className="space-y-6 text-sm leading-relaxed">
          <div>
            <dt className="font-semibold text-deepBlack">Personal Information</dt>
            <dd>
              <ul className="mt-2 list-inside list-disc space-y-1 text-neutral-700">
                <li>Name</li>
                <li>Email address</li>
                <li>City/location</li>
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-deepBlack">Technical Data</dt>
            <dd>
              <ul className="mt-2 list-inside list-disc space-y-1 text-neutral-700">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Website usage data (via cookies)</li>
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-deepBlack">Submission Data</dt>
            <dd>
              <ul className="mt-2 list-inside list-disc space-y-1 text-neutral-700">
                <li>Information provided through forms</li>
              </ul>
            </dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          2. How We Use Your Information
        </h2>
        <p className="mb-4 text-sm leading-relaxed">We use your data to:</p>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>Respond to enquiries and requests</li>
          <li>Provide access to services or features</li>
          <li>Improve our website and user experience</li>
          <li>Communicate updates (only where appropriate)</li>
          <li>Maintain security and prevent misuse</li>
        </ul>
        <p className="mt-6 text-sm font-medium text-deepBlack">We do not sell your personal data.</p>
      </section>

      <section id="cookies">
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          3. Cookies
        </h2>
        <p className="mb-4 text-sm leading-relaxed">We use cookies to:</p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>Understand site usage</li>
          <li>Improve performance</li>
          <li>Enhance user experience</li>
        </ul>
        <p className="text-sm leading-relaxed">You can disable cookies through your browser settings.</p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          4. Data Sharing
        </h2>
        <p className="mb-4 text-sm leading-relaxed">We may share data with:</p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>Trusted service providers (e.g. hosting, analytics)</li>
          <li>Legal authorities where required</li>
        </ul>
        <p className="text-sm leading-relaxed">All third parties are required to handle your data securely.</p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          5. Data Retention
        </h2>
        <p className="text-sm leading-relaxed">
          We retain personal data only as long as necessary for its intended purpose, or as required by law.
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          6. Your Rights (UK / GDPR)
        </h2>
        <p className="mb-4 text-sm leading-relaxed">You have the right to:</p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>Access your data</li>
          <li>Request correction</li>
          <li>Request deletion</li>
          <li>Object to processing</li>
        </ul>
        <p className="text-sm leading-relaxed">
          To exercise these rights, contact:{" "}
          <a
            href="mailto:contact@wearxyz.co"
            className="font-medium text-deepBlack underline decoration-neutral-300 underline-offset-4 hover:decoration-deepBlack"
          >
            contact@wearxyz.co
          </a>
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          7. Security
        </h2>
        <p className="space-y-4 text-sm leading-relaxed [&>+*]:mt-4">
          <span className="block">We implement appropriate measures to protect your data.</span>
          <span className="block">However, no system is completely secure.</span>
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          8. Updates
        </h2>
        <p className="space-y-4 text-sm leading-relaxed [&>+*]:mt-4">
          <span className="block">We may update this policy periodically.</span>
          <span className="block">Changes will be reflected on this page.</span>
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          9. Contact
        </h2>
        <div className="space-y-2 text-sm leading-relaxed text-neutral-700">
          <p>For privacy-related enquiries:</p>
          <p className="font-semibold text-deepBlack">XYZ London</p>
          <p>
            Email:{" "}
            <a
              href="mailto:contact@wearxyz.co"
              className="font-medium text-deepBlack underline decoration-neutral-300 underline-offset-4 hover:decoration-deepBlack"
            >
              contact@wearxyz.co
            </a>
          </p>
          <p>Company Registration Number: 14542954</p>
        </div>
        <p className="mt-8 text-sm leading-relaxed text-neutral-600">
          XYZ London operates with restraint, precision, and respect for user data.
        </p>
      </section>
    </LegalDocumentShell>
  )
}
