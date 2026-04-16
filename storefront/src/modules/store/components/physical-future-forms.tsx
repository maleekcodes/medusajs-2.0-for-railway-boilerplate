"use client"

import { motion } from "framer-motion"

const TEASERS = [
  { id: "f1", name: "Hoodies", category: "Coming Soon" },
  { id: "f2", name: "Sweat Shirts", category: "Coming Soon" },
  { id: "f3", name: "Sweat Pants", category: "Coming Soon" },
  { id: "f4", name: "Shorts", category: "Coming Soon" },
  { id: "f5", name: "Jackets", category: "Coming Soon" },
  { id: "f6", name: "Activewear", category: "Coming Soon" },
  { id: "f7", name: "Sneakers", category: "Coming Soon" },
]

export function PhysicalFutureForms() {
  return (
    <section className="py-24 border-t border-neutral-100">
      <div className="text-center mb-16">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest border border-neutral-300 px-3 py-1 rounded-full">
          Coming Soon
        </span>
        <h2 className="text-4xl font-bold tracking-tighter mt-6">Future Forms</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {TEASERS.map((teaser) => (
          <motion.div
            key={teaser.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center group cursor-default p-8 bg-concrete hover:bg-neutral-200 transition-colors duration-500"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-neutral-100 mb-6 flex items-center justify-center shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-deepBlack">
              {teaser.name}
            </span>
            <span className="text-[10px] text-neutral-400 mt-2 font-mono">
              {teaser.category}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
