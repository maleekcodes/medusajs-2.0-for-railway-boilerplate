import LegalDocumentShell from "./legal-document-shell"

export default function TermsOfServiceTemplate() {
  return (
    <LegalDocumentShell title="Terms of Service" effectiveDate="20 June 2026">
      <p className="text-sm leading-relaxed">
        These Terms govern your use of the XYZ London website and services. They apply to all products
        and services, including OOO.
      </p>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          1. General
        </h2>
        <p className="space-y-4 text-sm leading-relaxed [&>+*]:mt-4">
          <span className="block">
            By accessing this website, you agree to these Terms. If you do not agree, please do not use
            the site.
          </span>
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          2. Products &amp; Availability
        </h2>
        <p className="mb-4 text-sm leading-relaxed">All products are:</p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>Subject to availability</li>
          <li>Produced in limited quantities</li>
          <li>Described as accurately as possible</li>
        </ul>
        <p className="text-sm leading-relaxed">
          We reserve the right to modify or discontinue products without notice.
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          3. Pricing
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>All prices are listed in GBP / USD depending on your region selection at checkout</li>
          <li>Prices may change without notice</li>
          <li>Taxes and shipping are calculated at checkout (if applicable)</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          4. Orders
        </h2>
        <p className="mb-4 text-sm leading-relaxed">We reserve the right to:</p>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>Refuse or cancel any order</li>
          <li>Limit quantities per customer</li>
          <li>Verify information before processing</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          5. Payments
        </h2>
        <p className="space-y-4 text-sm leading-relaxed [&>+*]:mt-4">
          <span className="block">Payments must be completed before order processing.</span>
          <span className="block">We use secure third-party payment providers.</span>
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          6. Shipping
        </h2>
        <p className="space-y-4 text-sm leading-relaxed [&>+*]:mt-4">
          <span className="block">Delivery times are estimates.</span>
          <span className="block">
            We are not responsible for delays outside our control.
          </span>
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          7. Returns &amp; Exchanges
        </h2>
        <p className="space-y-4 text-sm leading-relaxed [&>+*]:mt-4">
          <span className="block">Due to the nature of our products, returns may be limited.</span>
          <span className="block font-medium text-deepBlack">All sales are final unless the item is faulty.</span>
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          8. Intellectual Property
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          All content (designs, images, text, logos) belongs to XYZ London.
        </p>
        <p className="mb-4 text-sm leading-relaxed">You may not copy, reproduce, or distribute anything without permission.</p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          9. Use of Website
        </h2>
        <p className="mb-4 text-sm leading-relaxed">You agree not to:</p>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>Misuse the website</li>
          <li>Attempt to gain unauthorized access</li>
          <li>Interfere with functionality</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          10. Limitation of Liability
        </h2>
        <p className="mb-4 text-sm leading-relaxed">We are not liable for:</p>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>Indirect or incidental damages</li>
          <li>Losses arising from use of the website</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          11. Governing Law
        </h2>
        <p className="text-sm leading-relaxed">
          These Terms are governed by the laws of the United Kingdom.
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          12. Contact
        </h2>
        <div className="space-y-2 text-sm leading-relaxed text-neutral-700">
          <p>For enquiries:</p>
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
          <p>Company Registration Number: 14542951</p>
        </div>
        <p className="mt-8 text-sm leading-relaxed text-neutral-600">
          XYZ London operates with restraint, precision, and respect for user data.
        </p>
      </section>
    </LegalDocumentShell>
  )
}
