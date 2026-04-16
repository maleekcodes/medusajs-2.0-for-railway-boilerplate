import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
  /** When true, omit long description (shown in PDP accordions instead). */
  compact?: boolean
}

function Breadcrumb({ product }: { product: HttpTypes.StoreProduct }) {
  const categories = product.categories?.filter(Boolean) ?? []
  if (categories.length > 0) {
    return (
      <p className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-400">
        {categories.map((c, i) => (
          <span key={c.id}>
            {i > 0 && <span className="text-neutral-300"> • </span>}
            <LocalizedClientLink
              href={`/categories/${c.handle}`}
              className="hover:text-deepBlack transition-colors"
            >
              {c.name}
            </LocalizedClientLink>
          </span>
        ))}
      </p>
    )
  }

  if (product.collection) {
    return (
      <p className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-400">
        <LocalizedClientLink
          href={`/collections/${product.collection.handle}`}
          className="hover:text-deepBlack transition-colors"
        >
          {product.collection.title}
        </LocalizedClientLink>
      </p>
    )
  }

  return null
}

const ProductInfo = ({ product, compact }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className={compact ? "flex flex-col gap-y-4" : "mx-auto flex max-w-[500px] flex-col gap-y-4 lg:max-w-[500px]"}>
        <Breadcrumb product={product} />
        <h2
          className={`font-bold tracking-tighter text-deepBlack ${
            compact
              ? "text-2xl leading-tight md:text-3xl"
              : "text-3xl leading-10"
          }`}
          data-testid="product-title"
        >
          {product.title}
        </h2>

        {!compact && product.description && (
          <p
            className="text-medium whitespace-pre-line text-ui-fg-subtle"
            data-testid="product-description"
          >
            {product.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
