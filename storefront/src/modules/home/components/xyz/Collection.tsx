"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Container } from "@modules/common/components/xyz/Container"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface CollectionItem {
  id: string
  title: string
  category: string
  line: "X Line" | "Y Line" | "Z Line"
  description: string
  gridArea: string
}

const collectionData: CollectionItem[] = [
  {
    id: "01",
    title: "Structure I",
    category: "Headwear",
    line: "X Line",
    description: "Truckers, Snapbacks, Beanies",
    gridArea: "col-span-1 md:col-span-4",
  },
  {
    id: "02",
    title: "The Torso",
    category: "Body",
    line: "Y Line",
    description: "Tees, Sweat Wears, Jackets",
    gridArea: "col-span-1 md:col-span-4",
  },
  {
    id: "03",
    title: "Kinetic",
    category: "Movement",
    line: "Z Line",
    description: "Activewear, Sneakers",
    gridArea: "col-span-1 md:col-span-4",
  },
]

export function Collection() {
  const cardVariants: Variants = {
    hover: {
      y: -8,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const ctaVariants: Variants = {
    initial: { x: 0, opacity: 0 },
    hover: { x: 5, opacity: 1, transition: { duration: 0.3 } },
  }

  return (
    <section className="py-32 bg-white" id="collection">
      <Container>
        <div className="flex justify-between items-end mb-20 border-b border-neutral-100 pb-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            The Collection
          </h2>
          <span className="font-mono text-xs text-neutral-400">
            FW 2026 PREVIEW
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {collectionData.map((item) => (
            <motion.div
              key={item.id}
              initial="initial"
              whileHover="hover"
              variants={cardVariants}
              className={`group relative bg-concrete h-[500px] flex flex-col justify-between p-8 md:p-10 cursor-pointer overflow-hidden ${item.gridArea}`}
            >
              <LocalizedClientLink href="/store" className="absolute inset-0 z-10" />

              {/* Top: Tag & CTA */}
              <div className="flex justify-between items-start w-full relative z-10">
                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-deepBlack bg-transparent text-xs font-mono tracking-wide">
                  {item.line}
                </span>

                <motion.div
                  variants={ctaVariants}
                  className="flex items-center gap-2 text-deepBlack"
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest hidden md:inline-block">
                    View
                  </span>
                  <ArrowRight size={18} />
                </motion.div>
              </div>

              {/* Center: Abstract Graphics */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {item.line === "X Line" && (
                  <div className="w-40 h-20 bg-neutral-200 rounded-t-full opacity-60 group-hover:scale-110 transition-transform duration-700 ease-out" />
                )}

                {item.line === "Y Line" && (
                  <div className="flex gap-8 h-40 group-hover:gap-12 transition-all duration-700 ease-out">
                    <div className="w-px h-full bg-neutral-300" />
                    <div className="w-px h-full bg-neutral-300" />
                  </div>
                )}

                {item.line === "Z Line" && (
                  <div className="relative w-40 h-32 border border-neutral-200 transform -skew-x-12 group-hover:-skew-x-6 transition-transform duration-700 ease-out flex items-center justify-center">
                    <div className="w-3 h-3 bg-deepBlack rounded-full" />
                  </div>
                )}
              </div>

              {/* Bottom: Info */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 font-medium">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
