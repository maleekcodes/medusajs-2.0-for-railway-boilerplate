export type ShapeType =
  | "circle"
  | "square"
  | "triangle"
  | "rhombus"
  | "trapezoid"
  | "pentagon"
  | "hexagon"
  | "octagon"
  | "ellipse"
  | "curve"

export interface JournalEntry {
  id: string
  slug: string
  title: string
  category: string
  date: string
  shape?: ShapeType
  excerpt?: string
  body?: unknown[]
  featuredImage?: string
  featuredImageAspect?: number
  isFeatured?: boolean
}

export type DigitalExternalLinks = {
  opensea?: string | null
  rarible?: string | null
  foundation?: string | null
  custom?: string | null
}

/** Raw `digitalProducts[]` item from GROQ (before Medusa enrichment). */
export type DigitalFormProductSanity = {
  _key?: string
  /** Echo of `_key` for client link fallback (optional in GROQ). */
  sanityKey?: string | null
  /** URL segment for `/digital/[slug]` when set in Sanity. */
  slug?: string | null
  name?: string
  line?: string
  category?: string
  description?: string
  shape?: ShapeType
  statusLabel?: string
  price?: number | null
  currency?: string | null
  previewImage?: string | null
  galleryImages?: string[] | null
  platforms?: string[] | null
  medusaHandle?: string | null
  externalLinks?: DigitalExternalLinks | null
  isFeatured?: boolean | null
  isComingSoon?: boolean | null
}

/** Full digital product for PDP (Sanity). */
export type DigitalProductDetailSanity = DigitalFormProductSanity & {
  slug: string
}

/** Product row used by Digital Form UI (xyz-london-v2 parity). */
export type DigitalFormProductDisplay = {
  id: string
  /** Sanity array item key; used as PDP URL fallback when `slug` is empty and there is no Medusa handle. */
  sanityKey?: string | null
  name: string
  /** When set, links to `/digital/[slug]` for try-on / Stripe purchase. */
  slug?: string | null
  productType: string
  category: string
  shape?: ShapeType
  description?: string
  previewImage?: string | null
  platforms?: string[]
  price?: number | null
  currency?: string | null
  medusaHandle?: string | null
  externalLinks?: DigitalExternalLinks | null
  isFeatured?: boolean
  isComingSoon?: boolean
  statusLabel?: string
  /** When linked to Medusa, cheapest variant formatted price. */
  medusaFromPrice?: string | null
}

export type DigitalFormPageSanity = {
  collectionLabel?: string | null
  title?: string | null
  description?: string | null
  seoTitle?: string | null
  seoDescription?: string | null
  digitalProducts?: DigitalFormProductSanity[] | null
}
