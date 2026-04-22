"use client"

import { motion } from "framer-motion"

export function PhysicalFormStoreHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-24"
    >
      <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
        Collection 01
      </span>
      <h1
        className="text-5xl md:text-8xl font-bold tracking-tighter mt-4 mb-8"
        data-testid="store-page-title"
      >
        PHYSICAL FORM
      </h1>
      <p className="max-w-2xl text-xl font-light text-neutral-600">
        Tangible expressions of identity. Architectural fluidity tailored for the
        human form.
      </p>
    </motion.div>
  )
}
