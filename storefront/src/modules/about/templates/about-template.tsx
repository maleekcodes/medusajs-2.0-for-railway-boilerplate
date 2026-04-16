"use client"

import { motion } from "framer-motion"

import { Container } from "@modules/common/components/xyz/Container"

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function AboutTemplate() {
  return (
    <section className="min-h-screen pt-32 pb-24 bg-white text-deepBlack">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-16">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-4">
              Identity & Form
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12">
              ABOUT US
            </h1>
            <div className="w-full h-px bg-neutral-200" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-20 pl-0 md:pl-8 border-l-0 md:border-l-4 border-deepBlack"
          >
            <p className="text-2xl md:text-4xl font-light leading-tight">
              XYZ London is a fashion house built on intent.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 text-lg text-neutral-600 font-light leading-relaxed">
            <div className="space-y-12">
              <motion.p variants={itemVariants}>
                In a world of noise, speed, and constant repetition, we choose
                restraint. We do not chase trends or mass attention. Instead, we
                focus on form, premium material, and proportion — the quiet
                elements that shape how identity is expressed.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-deepBlack font-medium text-xl"
              >
                XYZ London exists to uncover identity, not define it.
              </motion.p>
              <motion.p variants={itemVariants}>
                We believe expression emerges through form, movement, and
                proportion — not labels, not gender, not rules imposed from the
                outside.
              </motion.p>
            </div>

            <div className="space-y-12">
              <motion.p variants={itemVariants}>
                Our garments are designed beyond gender, created to move
                naturally across different body forms. Each piece is considered
                for comfort, durability, and longevity — made to be lived in,{" "}
                <span className="inline-block font-mono text-xs text-deepBlack bg-neutral-100 px-2 py-1 rounded mx-1 transform -translate-y-0.5">
                  (not replaced)*
                </span>
                .
              </motion.p>
              <motion.p variants={itemVariants}>
                Alongside physical garments, XYZ London explores digital
                expression. Our virtual designs extend identity beyond physical
                constraints, allowing form and presence to exist in new spaces
                without limitation. Physical and digital are not opposites to us
                — they are parallel expressions of the same philosophy.
              </motion.p>
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-16 md:mt-24 p-8 md:p-12 bg-concrete border border-neutral-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <div className="w-24 h-24 border border-deepBlack rounded-full" />
            </div>
            <p className="text-base md:text-lg text-neutral-700 relative z-10">
              We work with premium sustainable materials and{" "}
              <span className="inline-block font-mono text-xs text-deepBlack bg-white border border-neutral-300 px-2 py-1 rounded mx-1 align-middle">
                (responsible construction)*
              </span>
              , prioritising quality over volume and intention over excess.
              Every decision is guided by clarity, discipline, and respect for
              the individual.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-32 text-center flex flex-col items-center"
          >
            <p className="text-xl md:text-2xl text-deepBlack uppercase tracking-[0.2em] font-medium mb-4">
              XYZ London is not about fitting in.
            </p>
            <p className="text-xl md:text-2xl uppercase tracking-[0.2em] font-medium text-neutral-400">
              It is about standing as your original self.
            </p>

            <div className="h-24 w-px bg-gradient-to-b from-deepBlack to-transparent my-12" />

            <p className="font-mono text-xs text-neutral-400">
              From the unknown to the known.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
