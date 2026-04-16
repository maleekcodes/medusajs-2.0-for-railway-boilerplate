"use client"

import { HttpTypes } from "@medusajs/types"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { useMemo, useState } from "react"

const INITIAL_VISIBLE = 2

type ProductImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  thumbnail?: string | null
  productTitle: string
}

function normalizeImages(
  images: HttpTypes.StoreProductImage[],
  thumbnail?: string | null
): { id: string; url: string }[] {
  const fromImages = images
    .filter((img) => !!img.url)
    .map((img) => ({ id: img.id ?? img.url!, url: img.url! }))
  if (fromImages.length > 0) return fromImages
  if (thumbnail) return [{ id: "thumb", url: thumbnail }]
  return []
}

export default function ProductImageGallery({
  images,
  thumbnail,
  productTitle,
}: ProductImageGalleryProps) {
  const [expanded, setExpanded] = useState(false)
  const all = useMemo(
    () => normalizeImages(images, thumbnail),
    [images, thumbnail]
  )

  if (all.length === 0) {
    return (
      <div className="aspect-[3/4] w-full bg-concrete border border-neutral-100" />
    )
  }

  const visible = expanded ? all : all.slice(0, INITIAL_VISIBLE)
  const hasMore = all.length > INITIAL_VISIBLE

  const gridCols =
    visible.length === 1 ? "grid-cols-1" : "grid-cols-2"

  return (
    <div className="flex flex-col gap-6">
      <div className={`grid ${gridCols} gap-px bg-neutral-200`}>
        {visible.map((img, index) => (
          <div
            key={img.id}
            className="relative aspect-[3/4] w-full overflow-hidden bg-white"
          >
            <Image
              src={img.url}
              alt={`${productTitle} — ${index + 1}`}
              fill
              priority={index < 2}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 50vw, 40vw"
              quality={85}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mx-auto flex items-center gap-2 border border-deepBlack bg-white px-8 py-3 text-[10px] font-mono uppercase tracking-[0.2em] text-deepBlack transition-colors hover:bg-deepBlack hover:text-white"
        >
          {expanded ? "Show less" : "Show more"}
          <ChevronDown
            size={16}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  )
}
