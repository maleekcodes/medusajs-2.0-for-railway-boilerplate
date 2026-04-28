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
    <section className="bg-deepBlack text-white min-h-[55vh]">
      <Container className="py-24 small:py-32 flex flex-col items-center text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">
          OOO
        </p>
        <div className="max-w-xl space-y-6 mb-14">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-snug">
            OOO is the highest expression of XYZ London.
          </h1>
          <p className="text-xl md:text-2xl font-semibold tracking-tight text-white">
            The Few.
          </p>
          <p className="text-neutral-300 font-light leading-relaxed">
            OOO exists beyond season and trend. Each piece is formed with deliberate
            craftsmanship—guided by precision, restraint, and uncompromising
            standards, released in rare quantity.
          </p>
          <p className="text-neutral-300 font-light leading-relaxed">
            Reserved for those who recognise intention and value substance without
            the need for acknowledgement.
          </p>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
            Quiet. Personal. Defined.
          </p>
        </div>
        <div className="w-full max-w-lg">
          <iframe
            src={formUrl}
            title="OOO inquiry"
            className="w-full min-h-[520px] rounded-sm border border-neutral-800 bg-deepBlack"
          />
        </div>
        <LocalizedClientLink
          href="/"
          className="mt-14 text-xs uppercase tracking-[0.2em] font-medium text-neutral-500 border-b border-neutral-600 pb-0.5 hover:text-white hover:border-white transition-colors"
        >
          Back to home
        </LocalizedClientLink>
      </Container>
    </section>
  )
}
