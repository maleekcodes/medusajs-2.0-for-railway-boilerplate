import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Container } from "@modules/common/components/xyz/Container"

function typeformUrl(): string {
  return process.env.NEXT_PUBLIC_PRIVATE_EXPRESSIONS_TYPEFORM_URL?.trim() ?? ""
}

export default function PrivateExpressionsLanding() {
  const formUrl = typeformUrl()

  return (
    <section className="bg-deepBlack text-white min-h-[55vh]">
      <Container className="py-24 small:py-32 flex flex-col items-center text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
          OOO
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
          Private Expressions
        </h1>
        <p className="text-neutral-400 font-light max-w-md mb-10 leading-relaxed">
          A limited space for member-only releases and expression. Request access
          to hear from us when the next window opens.
        </p>
        {formUrl ? (
          <a
            href={formUrl}
            className="inline-flex items-center justify-center bg-white text-deepBlack px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-200 transition-colors"
          >
            Request access
          </a>
        ) : (
          <p className="text-xs text-amber-400/90 font-mono max-w-md">
            Set{" "}
            <span className="text-amber-300">
              NEXT_PUBLIC_PRIVATE_EXPRESSIONS_TYPEFORM_URL
            </span>{" "}
            to your Typeform URL.
          </p>
        )}
        <LocalizedClientLink
          href="/"
          className="mt-12 text-xs uppercase tracking-[0.2em] font-medium text-neutral-500 border-b border-neutral-600 pb-0.5 hover:text-white hover:border-white transition-colors"
        >
          Back to home
        </LocalizedClientLink>
      </Container>
    </section>
  )
}
