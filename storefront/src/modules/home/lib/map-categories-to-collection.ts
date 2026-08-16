import { HttpTypes } from "@medusajs/types"

import {
  groupProductsByAssignedCategory,
  productCreatedAtMs,
} from "@modules/store/lib/group-products-by-category"

export type CollectionShape = "x" | "y" | "z"

export type HomeCollectionItem = {
  id: string
  title: string
  description: string
  line: string
  href: string
  shape: CollectionShape
  imageUrl?: string | null
  isLatest?: boolean
}

const SHAPES: CollectionShape[] = ["x", "y", "z"]

type StoreCategory = HttpTypes.StoreProductCategory & {
  parent_category_id?: string | null
  rank?: number
  is_active?: boolean
}

function parentCategoryId(c: StoreCategory): string | null | undefined {
  return c.parent_category_id ?? c.parent_category?.id ?? null
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

  const topLevel = (categories as StoreCategory[])
    .filter((c) => !parentCategoryId(c))
    .filter((c) => c.is_active !== false)
    .sort((a, b) => {
      const ra = a.rank ?? 0
      const rb = b.rank ?? 0
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

function productImageUrl(product: HttpTypes.StoreProduct): string | null {
  const thumbnail = product.thumbnail?.trim()
  if (thumbnail) return thumbnail
  const first = product.images?.[0] as { url?: string } | undefined
  const url = first?.url?.trim()
  return url || null
}

/**
 * One homepage card per Medusa category that has products, featuring
 * that category's newest release. Category names stay dynamic.
 */
export function mapLatestProductsToCollectionItems(
  products: HttpTypes.StoreProduct[] | null | undefined,
  categories: HttpTypes.StoreProductCategory[] | null | undefined
): HomeCollectionItem[] {
  if (!products?.length || !categories?.length) return []

  const byId = new Map(
    (categories as StoreCategory[]).map((c) => [c.id as string, c])
  )
  const sections = groupProductsByAssignedCategory(products, categories)

  return sections
    .filter((section) => section.id !== "__other__" && section.products.length > 0)
    .map((section, index) => {
      const newest = [...section.products].sort(
        (a, b) => productCreatedAtMs(b) - productCreatedAtMs(a)
      )[0]
      const category = byId.get(section.id)
      const productHandle = newest?.handle
      const href = section.handle
        ? `/categories/${section.handle}${
            productHandle ? `?featured=${encodeURIComponent(productHandle)}` : ""
          }`
        : "/store"

      return {
        id: section.id,
        title: section.name,
        description: newest?.title?.trim() || "New release",
        line: "Latest",
        href,
        shape: resolveShape(category?.metadata, index),
        imageUrl: newest ? productImageUrl(newest) : null,
        isLatest: true,
      }
    })
}
