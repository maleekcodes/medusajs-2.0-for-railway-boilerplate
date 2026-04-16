import { SITE_DESCRIPTION, SITE_TITLE_DEFAULT } from "@lib/seo/site"
import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import { Hero } from "@modules/home/components/xyz/Hero"
import { Introduction } from "@modules/home/components/xyz/Introduction"
import { Collection } from "@modules/home/components/xyz/Collection"
import { Philosophy } from "@modules/home/components/xyz/Philosophy"
import { ARFitSection } from "@modules/home/components/xyz/ARFitSection"
import { PrivateGate } from "@modules/home/components/xyz/PrivateGate"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: SITE_TITLE_DEFAULT,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
  },
}

export default async function Home({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  const collectionsWithProducts = collections
    .filter((c) => Array.isArray(c.products) && c.products.length > 0)
    .filter((c) => {
      const title = (c.title ?? "").trim().toLowerCase()
      const handle = (c.handle ?? "").toLowerCase()
      if (title === "x line") return false
      if (handle === "x-line" || handle === "x_line") return false
      return true
    })
  const hasFeaturedProducts = collectionsWithProducts.length > 0

  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      <div id="intro">
        <Introduction />
      </div>
      <div id="physical">
        <Collection />
      </div>

      {hasFeaturedProducts && (
        <div className="py-12 bg-white">
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts
              collections={collectionsWithProducts}
              region={region}
            />
          </ul>
        </div>
      )}

      <div id="digital">
        <Philosophy />
      </div>
      <div id="fit">
        <ARFitSection />
      </div>
      <div id="private">
        <PrivateGate />
      </div>
    </>
  )
}
