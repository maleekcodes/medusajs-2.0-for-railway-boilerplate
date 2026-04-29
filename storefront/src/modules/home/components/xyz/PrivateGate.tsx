"use client"

import { motion } from "framer-motion"
import { Lock } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Container } from "@modules/common/components/xyz/Container"

interface PrivateGateProps {
  title?: string
  paragraph?: string
  buttonLabel?: string
}

export function PrivateGate({ title, paragraph, buttonLabel }: PrivateGateProps) {
  return (
    <section className="relative bg-oooBg py-32 text-oooText">
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
            {paragraph ? (
              <p>{paragraph}</p>
            ) : (
              <>
                <p>Our expressions are not publicly offered.</p>
                <p>Access is limited and reviewed over time.</p>
              </>
            )}
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
