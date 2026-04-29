"use client"

import type { PrivateExpressionsPageSanity } from "@/types/xyz"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Container } from "@modules/common/components/xyz/Container"

/** Hard fallback when Sanity is empty or unpublished (offline dev only). */
const STATIC_FALLBACK = {
  eyebrowLabel: "OOO",
  headline: "OOO is the highest expression of XYZ London.",
  focalLine: "The Few.",
  narrativeParagraph1:
    "OOO exists beyond season and trend. Each piece is formed with deliberate craftsmanship—guided by precision, restraint, and uncompromising standards, released in rare quantity.",
  narrativeParagraph2:
    "Reserved for those who recognise intention and value substance without the need for acknowledgement.",
  closingLine: "Quiet. Personal. Defined.",
  formIntro: "Complete the form to express interest",
  hubspotFormUrl:
    "https://2fu564.share-eu1.hsforms.com/2QJmK62N_R1miIbA3scmoaw",
  contactEmail: "contact@wearxyz.co",
  backToHomeLabel: "Back to home",
} satisfies Partial<PrivateExpressionsPageSanity>

function merged(
  content: PrivateExpressionsPageSanity | null
): Required<
  Pick<
    PrivateExpressionsPageSanity,
    | "eyebrowLabel"
    | "headline"
    | "focalLine"
    | "narrativeParagraph1"
    | "narrativeParagraph2"
    | "closingLine"
    | "formIntro"
    | "contactEmail"
    | "backToHomeLabel"
  >
> & { hubspotFormUrl?: string | null } {
  const fb = STATIC_FALLBACK
  return {
    eyebrowLabel: content?.eyebrowLabel?.trim() || fb.eyebrowLabel,
    headline: content?.headline?.trim() || fb.headline,
    focalLine: content?.focalLine?.trim() || fb.focalLine,
    narrativeParagraph1:
      content?.narrativeParagraph1?.trim() || fb.narrativeParagraph1,
    narrativeParagraph2:
      content?.narrativeParagraph2?.trim() || fb.narrativeParagraph2,
    closingLine: content?.closingLine?.trim() || fb.closingLine,
    formIntro: content?.formIntro?.trim() || fb.formIntro,
    hubspotFormUrl:
      content?.hubspotFormUrl?.trim() || fb.hubspotFormUrl || null,
    contactEmail: content?.contactEmail?.trim() || fb.contactEmail,
    backToHomeLabel: content?.backToHomeLabel?.trim() || fb.backToHomeLabel,
  }
}

type Props = {
  content: PrivateExpressionsPageSanity | null
  sanityConfigured: boolean
  fetchError?: boolean
}

export default function PrivateExpressionsLanding({
  content,
  sanityConfigured,
  fetchError,
}: Props) {
  const text = merged(content)
  const envOverride =
    process.env.NEXT_PUBLIC_PRIVATE_EXPRESSIONS_TYPEFORM_URL?.trim() ?? ""
  const formUrl = envOverride || text.hubspotFormUrl?.trim() || ""

  return (
    <section className="min-h-[55vh] bg-oooBg text-oooText">
      <Container className="flex flex-col items-center py-24 text-center small:py-32">
        {(fetchError || (!content && sanityConfigured)) && (
          <p className="mb-6 max-w-lg text-xs text-amber-200/90" role="status">
            {fetchError
              ? "Content could not be loaded from CMS. Showing cached fallback copy."
              : "Publish the “Private Expressions (OOO)” document in Sanity to edit this page."}
          </p>
        )}
        {!sanityConfigured ? (
          <p className="mb-6 max-w-lg text-xs text-amber-200/90" role="status">
            SANITY_PROJECT_ID is not set — using static fallback copy until the CMS is configured.
          </p>
        ) : null}
        <p className="mb-8 text-xs font-bold uppercase tracking-widest text-oooText/70">
          {text.eyebrowLabel}
        </p>
        <div className="mb-14 max-w-xl space-y-6">
          <h1 className="text-2xl font-bold tracking-tighter leading-snug md:text-3xl lg:text-4xl">
            {text.headline}
          </h1>
          <p className="text-xl font-semibold tracking-tight text-oooText md:text-2xl">
            {text.focalLine}
          </p>
          <p className="font-light leading-relaxed text-oooText/90">
            {text.narrativeParagraph1}
          </p>
          <p className="font-light leading-relaxed text-oooText/90">
            {text.narrativeParagraph2}
          </p>
          <p className="text-sm uppercase tracking-[0.2em] text-oooText/75">
            {text.closingLine}
          </p>
        </div>
        <p className="mb-4 w-full max-w-lg text-center text-sm font-medium text-oooText/85">
          {text.formIntro}
        </p>
        {formUrl ? (
          <div className="w-full max-w-lg">
            <iframe
              src={formUrl}
              title="OOO inquiry"
              className="min-h-[520px] w-full rounded-sm border border-oooBorder bg-oooButton/10"
            />
          </div>
        ) : (
          <p className="max-w-lg text-xs text-amber-200/90">
            Set the form URL in Sanity (hubspotFormUrl), or temporarily use
            NEXT_PUBLIC_PRIVATE_EXPRESSIONS_TYPEFORM_URL in your environment file.
          </p>
        )}
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
          href={`mailto:${text.contactEmail}`}
          className="mt-4 text-[11px] text-oooText/70 transition-colors hover:text-oooText"
        >
          {text.contactEmail}
        </a>
        <LocalizedClientLink
          href="/"
          className="mt-10 border-b border-oooBorder pb-0.5 text-xs font-medium uppercase tracking-[0.2em] text-oooText/80 transition-colors hover:border-oooText hover:text-oooText"
        >
          {text.backToHomeLabel}
        </LocalizedClientLink>
      </Container>
    </section>
  )
}
