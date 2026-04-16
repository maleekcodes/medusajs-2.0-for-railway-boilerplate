"use client"

import { motion } from "framer-motion"
import { Container } from "@modules/common/components/xyz/Container"

interface IntroductionProps {
  text?: string
}

const defaultText =
  "XYZ London is a fashion house built on intent. In a world of noise, speed, and constant repetition, we choose restraint. We focus on form, premium material, and proportion — the quiet elements that shape how identity is expressed."

export function Introduction({ text }: IntroductionProps) {
  return (
    <section className="py-32 bg-white">
      <Container className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-center"
        >
          <p className="text-xl md:text-2xl font-light leading-relaxed text-deepBlack">
            {text || defaultText}
          </p>
          <div className="w-px h-16 bg-neutral-200 mx-auto mt-12" />
        </motion.div>
      </Container>
    </section>
  )
}
