import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Container } from "@modules/common/components/xyz/Container"

const HUBSPOT_OOO_FORM_URL =
  "https://2fu564.share-eu1.hsforms.com/2QJmK62N_R1miIbA3scmoaw"

function oooFormEmbedUrl(): string {
  return (
    process.env.NEXT_PUBLIC_PRIVATE_EXPRESSIONS_TYPEFORM_URL?.trim() ??
    HUBSPOT_OOO_FORM_URL
  )
}

export default function PrivateExpressionsLanding() {
  const formUrl = oooFormEmbedUrl()

  return (
    <section className="min-h-[55vh] bg-oooBg text-oooText">
      <Container className="flex flex-col items-center py-24 text-center small:py-32">
        <p className="mb-8 text-xs font-bold uppercase tracking-widest text-oooText/70">
          OOO
        </p>
        <div className="mb-14 max-w-xl space-y-6">
          <h1 className="text-2xl font-bold tracking-tighter leading-snug md:text-3xl lg:text-4xl">
            OOO is the highest expression of XYZ London.
          </h1>
          <p className="text-xl font-semibold tracking-tight text-oooText md:text-2xl">
            The Few.
          </p>
          <p className="font-light leading-relaxed text-oooText/90">
            OOO exists beyond season and trend. Each piece is formed with deliberate
            craftsmanship—guided by precision, restraint, and uncompromising standards,
            released in rare quantity.
          </p>
          <p className="font-light leading-relaxed text-oooText/90">
            Reserved for those who recognise intention and value substance without the need for
            acknowledgement.
          </p>
          <p className="text-sm uppercase tracking-[0.2em] text-oooText/75">
            Quiet. Personal. Defined.
          </p>
        </div>
        <p className="mb-4 w-full max-w-lg text-center text-sm font-medium text-oooText/85">
          Complete the form to express interest
        </p>
        <div className="w-full max-w-lg">
          <iframe
            src={formUrl}
            title="OOO inquiry"
            className="min-h-[520px] w-full rounded-sm border border-oooBorder bg-oooButton/10"
          />
        </div>
        <nav
          aria-label="Legal and policies"
          className="mt-12 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-oooText/65"
        >
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="transition-colors hover:text-oooText"
          >
            Terms of Service
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="transition-colors hover:text-oooText"
          >
            Privacy Policy
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/content/shipping-policy"
            className="transition-colors hover:text-oooText"
          >
            Shipping Policy
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/content/privacy-policy#cookies"
            className="transition-colors hover:text-oooText"
          >
            Cookie Settings
          </LocalizedClientLink>
        </nav>
        <a
          href="mailto:contact@wearxyz.co"
          className="mt-4 text-[11px] text-oooText/70 transition-colors hover:text-oooText"
        >
          contact@wearxyz.co
        </a>
        <LocalizedClientLink
          href="/"
          className="mt-10 border-b border-oooBorder pb-0.5 text-xs font-medium uppercase tracking-[0.2em] text-oooText/80 transition-colors hover:border-oooText hover:text-oooText"
        >
          Back to home
        </LocalizedClientLink>
      </Container>
    </section>
  )
}
