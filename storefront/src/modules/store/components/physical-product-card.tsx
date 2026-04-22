"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Plus } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

export type PhysicalProductCardProps = {
  handle: string
  title: string
  subtitle: string
  lineLabel: string
  imageUrl: string | null
  priceFormatted: string | null
  originalPriceFormatted?: string | null
  priceIsSale?: boolean
  swatchLabels?: string[]
}

export function PhysicalProductCard({
  handle,
  title,
  subtitle,
  lineLabel,
  imageUrl,
  priceFormatted,
  originalPriceFormatted,
  priceIsSale,
  swatchLabels,
}: PhysicalProductCardProps) {
  const swatches = swatchLabels?.slice(0, 4) ?? []

  return (
    <LocalizedClientLink
      href={`/products/${handle}`}
      className="block h-full min-h-[400px]"
      data-testid="product-wrapper"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.4 }}
        className="group bg-concrete p-6 md:p-8 flex flex-col justify-between min-h-[400px] h-full border border-transparent hover:border-neutral-200 transition-colors"
      >
        <div className="flex justify-between items-start">
          <span className="text-[10px] uppercase tracking-widest font-mono border border-neutral-300 rounded-full px-2 py-0.5 bg-white/50">
            {lineLabel}
          </span>
          <span
            className="text-neutral-400 group-hover:text-deepBlack transition-colors pointer-events-none"
            aria-hidden
          >
            <Plus size={18} />
          </span>
        </div>

        <div className="flex-grow flex items-center justify-center py-8">
          <div className="relative w-40 max-w-full aspect-square bg-white shadow-sm border border-neutral-100 overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover object-center"
                sizes="160px"
                quality={60}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                <PlaceholderImage size={24} />
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end gap-3 mb-4">
            <div className="min-w-0">
              <h3
                className="text-lg font-bold tracking-tight truncate"
                data-testid="product-title"
              >
                {title}
              </h3>
              <span className="text-xs text-neutral-500 block mt-1 line-clamp-2">
                {subtitle}
              </span>
            </div>
            {swatches.length > 0 && (
              <div className="flex gap-1 shrink-0">
                {swatches.map((c, i) => (
                  <div
                    key={`${c}-${i}`}
                    className={`w-2 h-2 rounded-full border border-neutral-300 ${
                      i === 0 ? "bg-neutral-800" : "bg-white"
                    }`}
                    title={c}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-200/60 flex justify-between items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400">
            <span>Regular Fit</span>
            <span className="text-right tabular-nums normal-case tracking-normal">
              {priceIsSale && originalPriceFormatted && (
                <span
                  className="line-through text-neutral-400 mr-2"
                  data-testid="original-price"
                >
                  {originalPriceFormatted}
                </span>
              )}
              {priceFormatted ? (
                <span
                  className={
                    priceIsSale ? "text-deepBlack font-medium" : "text-neutral-500"
                  }
                  data-testid="price"
                >
                  {priceFormatted}
                </span>
              ) : (
                <span>Pre-Order</span>
              )}
            </span>
          </div>
        </div>
      </motion.div>
    </LocalizedClientLink>
  )
}
