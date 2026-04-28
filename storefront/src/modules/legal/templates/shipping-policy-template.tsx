import LegalDocumentShell from "./legal-document-shell"

export default function ShippingPolicyTemplate() {
  return (
    <LegalDocumentShell title="Shipping Policy" effectiveDate="20 June 2026">
      <p className="text-sm leading-relaxed">
        This Shipping Policy applies to all orders placed with XYZ London, including items under OOO.
      </p>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          1. Order Processing
        </h2>
        <p className="space-y-4 text-sm leading-relaxed [&>+*]:mt-6">
          <span className="block">
            All orders are processed within 2–5 business days, unless otherwise stated.
          </span>
          <span className="block">
            For limited or made-to-order pieces (including OOO), processing times may vary. Specific
            timelines will be indicated at the point of purchase.
          </span>
          <span className="block">Orders are not processed on weekends or public holidays.</span>
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          2. Delivery Timeframes
        </h2>
        <p className="mb-4 text-sm leading-relaxed">Estimated delivery times:</p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>United Kingdom: 1–3 business days</li>
          <li>Europe: 3–7 business days</li>
          <li>International: 5–10 business days</li>
        </ul>
        <p className="text-sm leading-relaxed">
          Delivery times are estimates and may vary depending on location, customs, and external factors.
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          3. Shipping Methods
        </h2>
        <p className="space-y-4 text-sm leading-relaxed [&>+*]:mt-4">
          <span className="block">We work with trusted carriers to ensure secure and reliable delivery.</span>
          <span className="block">Shipping options and costs are calculated at checkout.</span>
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          4. Tracking
        </h2>
        <p className="text-sm leading-relaxed">
          Once your order has been dispatched, you will receive a confirmation email with tracking
          information (where available).
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          5. Duties &amp; Taxes
        </h2>
        <p className="mb-4 text-sm leading-relaxed">International orders may be subject to:</p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>Import duties</li>
          <li>Customs taxes</li>
        </ul>
        <p className="text-sm leading-relaxed">These charges are the responsibility of the customer.</p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          6. Delivery Responsibility
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          Once an order has been dispatched, XYZ London is not responsible for:
        </p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>Delays caused by shipping carriers</li>
          <li>Customs processing delays</li>
          <li>Incorrect shipping information provided by the customer</li>
        </ul>
        <p className="text-sm leading-relaxed">Please ensure all delivery details are accurate at checkout.</p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          7. Lost or Delayed Shipments
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          If your order is significantly delayed or appears lost, please contact:{" "}
          <a
            href="mailto:contact@wearxyz.co"
            className="font-medium text-deepBlack underline decoration-neutral-300 underline-offset-4 hover:decoration-deepBlack"
          >
            contact@wearxyz.co
          </a>
        </p>
        <p className="text-sm leading-relaxed">
          We will assist in resolving the issue with the carrier where possible.
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          8. Refused or Undelivered Packages
        </h2>
        <p className="mb-4 text-sm leading-relaxed">If a package is:</p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>Refused</li>
          <li>Unclaimed</li>
          <li>Returned due to incorrect address</li>
        </ul>
        <p className="text-sm leading-relaxed">
          We reserve the right to deduct return shipping costs before issuing any refund (if applicable).
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          9. OOO Orders (Important)
        </h2>
        <p className="space-y-4 text-sm leading-relaxed [&>+*]:mt-4">
          <span className="block">
            OOO pieces are produced in limited quantities and handled with additional care.
          </span>
        </p>
        <ul className="my-6 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
          <li>Dispatch timelines may differ from standard items</li>
          <li>Some pieces may be made-to-order</li>
          <li>Delivery windows will be communicated clearly at purchase</li>
        </ul>
        <p className="text-sm leading-relaxed">
          Due to their nature, delays may occur to maintain quality and precision.
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
          10. Contact
        </h2>
        <div className="space-y-2 text-sm leading-relaxed text-neutral-700">
          <p>For shipping-related enquiries:</p>
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
      </section>
    </LegalDocumentShell>
  )
}
