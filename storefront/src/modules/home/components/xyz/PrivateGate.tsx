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
    <section className="py-32 bg-deepBlack text-white relative">
      <Container className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Lock className="w-12 h-12 mb-8 mx-auto stroke-1 text-neutral-500" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
            {title || "Private Expressions"}
          </h2>
          <div className="space-y-2 text-neutral-400 font-light mb-10">
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
            className="inline-block bg-white text-deepBlack px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-200 transition-colors"
          >
            {buttonLabel || "Secure Entry"}
          </LocalizedClientLink>
        </motion.div>
      </Container>
    </section>
  )
}
