"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

import { Container } from "@modules/common/components/xyz/Container"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type {
  CollectionShape,
  HomeCollectionItem,
} from "@modules/home/lib/map-categories-to-collection"

function CollectionShapeGraphic({ shape }: { shape: CollectionShape }) {
  if (shape === "x") {
    return (
      <div className="w-40 h-20 bg-neutral-200 rounded-t-full opacity-60 group-hover:scale-110 transition-transform duration-700 ease-out" />
    )
  }

  if (shape === "y") {
    return (
      <div className="flex gap-8 h-40 group-hover:gap-12 transition-all duration-700 ease-out">
        <div className="w-px h-full bg-neutral-300" />
        <div className="w-px h-full bg-neutral-300" />
      </div>
    )
  }

  return (
    <div className="relative w-40 h-32 border border-neutral-200 transform -skew-x-12 group-hover:-skew-x-6 transition-transform duration-700 ease-out flex items-center justify-center">
      <div className="w-3 h-3 bg-deepBlack rounded-full" />
    </div>
  )
}

export function Collection({
  items = [],
}: {
  items?: HomeCollectionItem[]
}) {
  if (!items.length) {
    return null
  }

  const cards = items

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
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
            The Collection
          </h2>
          <span className="font-mono text-xs text-neutral-400">
            Latest releases
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {cards.map((item) => (
            <motion.div
              key={item.id}
              initial="initial"
              whileHover="hover"
              variants={cardVariants}
              className="group relative bg-concrete h-[500px] flex flex-col justify-between p-8 md:p-10 cursor-pointer overflow-hidden col-span-1 md:col-span-4"
            >
              <LocalizedClientLink
                href={item.href}
                className="absolute inset-0 z-10"
              />

              <div className="flex justify-between items-start w-full relative z-10">
                <span
                  className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-mono tracking-wide ${
                    item.isLatest
                      ? "border border-deepBlack bg-deepBlack text-white"
                      : "border border-deepBlack bg-transparent"
                  }`}
                >
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

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {item.imageUrl ? (
                  <div className="relative h-[58%] w-[70%] overflow-hidden bg-white shadow-sm outline outline-1 outline-black/10 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                    <Image
                      src={item.imageUrl}
                      alt={item.description || item.title}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 768px) 28vw, 90vw"
                      quality={75}
                    />
                  </div>
                ) : (
                  <CollectionShapeGraphic shape={item.shape} />
                )}
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold tracking-tight mb-2 text-balance">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 font-medium text-pretty">
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
