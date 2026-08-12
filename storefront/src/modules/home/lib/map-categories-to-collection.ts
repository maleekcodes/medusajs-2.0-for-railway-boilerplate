import { HttpTypes } from "@medusajs/types"

export type CollectionShape = "x" | "y" | "z"

export type HomeCollectionItem = {
  id: string
  title: string
  description: string
  line: string
  href: string
  shape: CollectionShape
}

const SHAPES: CollectionShape[] = ["x", "y", "z"]

/** Static fallback when Medusa has no top-level categories yet. */
export const FALLBACK_COLLECTION_ITEMS: HomeCollectionItem[] = [
  {
    id: "01",
    title: "Structure I",
    description: "Truckers, Snapbacks, Beanies",
    line: "X Line",
    href: "/store",
    shape: "x",
  },
  {
    id: "02",
    title: "The Torso",
    description: "Tees, Sweat Wears, Jackets",
    line: "Y Line",
    href: "/store",
    shape: "y",
  },
  {
    id: "03",
    title: "Kinetic",
    description: "Activewear, Sneakers",
    line: "Z Line",
    href: "/store",
    shape: "z",
  },
]

function parentCategoryId(
  c: HttpTypes.StoreProductCategory
): string | null | undefined {
  const ext = c as HttpTypes.StoreProductCategory & {
    parent_category_id?: string | null
  }
  return ext.parent_category_id ?? c.parent_category?.id ?? null
}

function metadataString(
  metadata: Record<string, unknown> | null | undefined,
  key: string
): string | undefined {
  const value = metadata?.[key]
  return typeof value === "string" && value.trim() ? value.trim() : undefined
}

function resolveShape(
  metadata: Record<string, unknown> | null | undefined,
  index: number
): CollectionShape {
  const raw = metadataString(metadata, "shape")?.toLowerCase()
  if (raw === "x" || raw === "y" || raw === "z") return raw
  return SHAPES[index % SHAPES.length]
}

function resolveLine(
  category: HttpTypes.StoreProductCategory,
  index: number
): string {
  const fromMeta = metadataString(category.metadata, "line")
  if (fromMeta) return fromMeta

  const name = (category.name ?? "").trim()
  if (/^[xyz]\b/i.test(name) || /\bline\b/i.test(name)) return name

  return `${["X", "Y", "Z"][index % 3]} Line`
}

function isTruthyMetadata(
  metadata: Record<string, unknown> | null | undefined,
  key: string
): boolean {
  const value = metadata?.[key]
  if (value === true || value === 1) return true
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase()
    return normalized === "true" || normalized === "1" || normalized === "yes"
  }
  return false
}

/**
 * Top-level active Medusa categories → homepage collection cards.
 *
 * By default every top-level active category becomes a card (3 per row;
 * extras wrap to the next row). To curate a subset, set metadata
 * `show_on_home: true` on the ones that should appear — once any category
 * uses that flag, only flagged categories are shown.
 *
 * Optional metadata keys (Admin → Products → Categories → Metadata):
 * - `show_on_home` — "true" to include when curating a subset
 * - `line`         — pill label (e.g. "X Line")
 * - `shape`        — abstract graphic: "x" | "y" | "z"
 * - `subtitle`     — overrides Description for the card line under the title
 *
 * Description is used as the card subtitle when `subtitle` is unset.
 */
export function mapCategoriesToCollectionItems(
  categories: HttpTypes.StoreProductCategory[] | null | undefined
): HomeCollectionItem[] {
  if (!categories?.length) return []

  const topLevel = categories
    .filter((c) => !parentCategoryId(c))
    .filter((c) => c.is_active !== false)
    .sort((a, b) => {
      const ra = (a as { rank?: number }).rank ?? 0
      const rb = (b as { rank?: number }).rank ?? 0
      if (ra !== rb) return ra - rb
      return (a.name ?? "").localeCompare(b.name ?? "")
    })

  const curated = topLevel.filter((c) =>
    isTruthyMetadata(c.metadata, "show_on_home")
  )
  const selected = curated.length > 0 ? curated : topLevel

  return selected
    .filter((c) => Boolean(c.handle) && Boolean(c.name))
    .map((c, index) => {
      const subtitle =
        metadataString(c.metadata, "subtitle") ??
        (c.description?.trim() || "View products")

      return {
        id: c.id as string,
        title: c.name as string,
        description: subtitle,
        line: resolveLine(c, index),
        href: `/categories/${c.handle}`,
        shape: resolveShape(c.metadata, index),
      }
    })
}
