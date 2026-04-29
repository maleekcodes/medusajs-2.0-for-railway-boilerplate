"use client"

import { motion } from "framer-motion"
import { Lock } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Container } from "@modules/common/components/xyz/Container"

interface PrivateGateProps {
  title?: string
  teaserLine1?: string
  teaserLine2?: string
  /** Fallback when teaser lines omitted (supports two paragraphs separated by blank line). */
  paragraph?: string
  buttonLabel?: string
}

const DEFAULT_LINES = ["Our expressions are not publicly offered.", "Access is limited and reviewed over time."]

function resolveLines(props: PrivateGateProps): string[] {
  const a = props.teaserLine1?.trim()
  const b = props.teaserLine2?.trim()
  if (a || b) {
    return [a, b].filter((x): x is string => Boolean(x?.length))
  }
  const p = props.paragraph?.trim()
  if (p) {
    const chunks = p.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean)
    return chunks.length > 0 ? chunks : [p]
  }
  return DEFAULT_LINES
}

export function PrivateGate({
  title,
  teaserLine1,
  teaserLine2,
  paragraph,
  buttonLabel,
}: PrivateGateProps) {
  const lines = resolveLines({
    teaserLine1,
    teaserLine2,
    paragraph,
  })

  return (
    <section className="relative bg-ooo-rise py-32 text-oooText antialiased">
      <Container className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Lock className="mx-auto mb-8 h-12 w-12 stroke-1 text-oooText/55" />
          <h2 className="mb-6 text-3xl font-bold tracking-tighter md:text-5xl">
            {title || "Highest Expression"}
          </h2>
          <div className="mb-10 space-y-2 font-light text-oooText/85">
            {lines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>

          <LocalizedClientLink
            href="/private-expressions"
            className="inline-block bg-oooButton px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-oooBg transition-opacity hover:opacity-90"
          >
            {buttonLabel || "Secure Entry"}
          </LocalizedClientLink>
        </motion.div>
      </Container>
    </section>
  )
}
