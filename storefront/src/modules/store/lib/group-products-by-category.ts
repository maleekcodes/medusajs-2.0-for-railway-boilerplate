import { HttpTypes } from "@medusajs/types"

export type PhysicalCategorySection = {
  id: string
  name: string
  products: HttpTypes.StoreProduct[]
}

function parentCategoryId(
  c: HttpTypes.StoreProductCategory
): string | null | undefined {
  const ext = c as HttpTypes.StoreProductCategory & {
    parent_category_id?: string | null
  }
  return ext.parent_category_id ?? c.parent_category?.id ?? null
}

function resolveRootCategory(
  cat: HttpTypes.StoreProductCategory,
  byId: Map<string, HttpTypes.StoreProductCategory>
): HttpTypes.StoreProductCategory {
  let current: HttpTypes.StoreProductCategory | undefined = cat
  let guard = 0
  while (current && parentCategoryId(current) && guard < 32) {
    const next = byId.get(parentCategoryId(current)!)
    if (!next) break
    current = next
    guard += 1
  }
  return current ?? cat
}

/**
 * Buckets products under their top-level (root) product category for section headings.
 * Products without categories are listed under "Other".
 */
export function groupProductsByTopLevelCategory(
  products: HttpTypes.StoreProduct[],
  allCategories: HttpTypes.StoreProductCategory[] | null | undefined
): PhysicalCategorySection[] {
  if (!allCategories?.length) {
    return products.length
      ? [{ id: "all", name: "Products", products }]
      : []
  }

  const byId = new Map(
    allCategories.map((c) => [c.id as string, c])
  )

  const topLevel = allCategories
    .filter((c) => !parentCategoryId(c))
    .sort((a, b) => {
      const ra = (a as { rank?: number }).rank ?? 0
      const rb = (b as { rank?: number }).rank ?? 0
      if (ra !== rb) return ra - rb
      return (a.name ?? "").localeCompare(b.name ?? "")
    })

  const buckets = new Map<string, HttpTypes.StoreProduct[]>()

  for (const p of products) {
    const cats = p.categories ?? []
    if (cats.length === 0) {
      const key = "__other__"
      if (!buckets.has(key)) buckets.set(key, [])
      buckets.get(key)!.push(p)
      continue
    }
    const root = resolveRootCategory(cats[0], byId)
    const key = root.id as string
    if (!buckets.has(key)) buckets.set(key, [])
    buckets.get(key)!.push(p)
  }

  const out: PhysicalCategorySection[] = []

  for (const tl of topLevel) {
    const id = tl.id as string
    const list = buckets.get(id)
    if (list?.length) {
      out.push({
        id,
        name: tl.name ?? "Category",
        products: list,
      })
    }
  }

  for (const [id, list] of buckets) {
    if (id === "__other__" || out.some((s) => s.id === id)) continue
    if (!list.length) continue
    const cat = byId.get(id)
    if (cat) {
      out.push({
        id,
        name: cat.name ?? "Category",
        products: list,
      })
    }
  }

  const other = buckets.get("__other__")
  if (other?.length) {
    out.push({ id: "__other__", name: "Other", products: other })
  }

  return out
}
