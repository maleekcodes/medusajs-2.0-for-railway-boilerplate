import { Container } from "@modules/common/components/xyz/Container"

type Props = {
  title: string
  effectiveDate: string
  children: React.ReactNode
}

/** Shared layout for static legal/policy pages (matches contact page rhythm). */
export default function LegalDocumentShell({ title, effectiveDate, children }: Props) {
  return (
    <section className="min-h-screen bg-white pb-24 pt-28 text-deepBlack md:pt-32">
      <Container>
        <article className="mx-auto max-w-3xl">
          <header className="mb-12 md:mb-16">
            <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-neutral-400">
              Legal
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">{title}</h1>
            <p className="font-mono text-sm text-neutral-500">Effective Date: {effectiveDate}</p>
            <div className="mt-8 h-px w-full bg-neutral-200" />
          </header>
          <div className="legal-body space-y-8 text-neutral-700">
            {children}
          </div>
        </article>
      </Container>
    </section>
  )
}
