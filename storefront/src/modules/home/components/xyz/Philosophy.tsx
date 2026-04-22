"use client"

import { motion } from "framer-motion"
import { Container } from "@modules/common/components/xyz/Container"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface PhilosophyProps {
  lines?: string[]
  ctaLabel?: string
}

const defaultManifestoLines = [
  "XYZ London exists to uncover identity, not define it.",
  "We believe expression emerges through form, movement, and proportion.",
  "Physical and digital are not opposites — they are parallel expressions.",
  "The greatest discoveries are always found in the unknown.",
]

export function Philosophy({ lines, ctaLabel }: PhilosophyProps) {
  const manifestoLines =
    lines && lines.length > 0 ? lines : defaultManifestoLines

  return (
    <section className="py-48 bg-white overflow-hidden" id="philosophy">
      <Container>
        <div className="flex justify-end mb-16">
          <LocalizedClientLink
            href="/digital"
            className="font-mono text-xs text-neutral-400 hover:text-deepBlack transition-colors uppercase tracking-widest"
          >
            {ctaLabel || "DIGITAL FORM PREVIEW"}
          </LocalizedClientLink>
        </div>
        <div className="space-y-24">
          {manifestoLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <h3 className="text-3xl md:text-5xl font-light tracking-tight text-deepBlack leading-tight">
                {line}
              </h3>
              <div className="mt-6 w-12 h-[1px] bg-neutral-300" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
