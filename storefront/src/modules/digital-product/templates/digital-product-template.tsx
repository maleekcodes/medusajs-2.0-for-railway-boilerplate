import { Container } from "@modules/common/components/xyz/Container"
import { formatDigitalPrice } from "@lib/util/format-digital-price"
import type { DigitalProductDetailSanity } from "@/types/xyz"

import { DigitalProductPdpClient } from "../components/digital-product-pdp-client"

type Props = {
  countryCode: string
  product: DigitalProductDetailSanity
  collectionLabel?: string | null
  pageTitle?: string | null
  fetchError?: boolean
}

export default function DigitalProductTemplate({
  countryCode,
  product,
  collectionLabel,
  pageTitle,
  fetchError,
}: Props) {
  const gallery = (product.galleryImages ?? []).filter(
    (u): u is string => typeof u === "string" && u.length > 0
  )
  const images =
    gallery.length > 0
      ? gallery
      : product.previewImage
        ? [product.previewImage]
        : []

  const priceLabel = formatDigitalPrice(
    product.price ?? null,
    product.currency ?? null
  )

  return (
    <div className="bg-deepBlack text-white min-h-screen pt-28 pb-24">
      <Container className="py-8 lg:py-12">
        <DigitalProductPdpClient
          product={product}
          images={images}
          priceLabel={priceLabel}
          countryCode={countryCode}
          collectionLabel={collectionLabel}
          pageTitle={pageTitle}
          fetchError={fetchError}
        />
      </Container>
    </div>
  )
}
