import { buildPageMetadata } from "@lib/seo/metadata"
import { getGlobalSeoSettings } from "@lib/seo/sanity"
import { SITE_DESCRIPTION, SITE_TITLE_DEFAULT } from "@lib/seo/site"
import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import { Hero } from "@modules/home/components/xyz/Hero"
import { Introduction } from "@modules/home/components/xyz/Introduction"
import { Collection } from "@modules/home/components/xyz/Collection"
import { Philosophy } from "@modules/home/components/xyz/Philosophy"
import { VirtualTryOnSection } from "@modules/home/components/xyz/VirtualTryOnSection"
import { PrivateGate } from "@modules/home/components/xyz/PrivateGate"
import { listCategories } from "@lib/data/categories"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import {
  getHomePage,
  getPrivateExpressionsPage,
} from "@lib/sanity/queries"
import {
  FALLBACK_COLLECTION_ITEMS,
  mapCategoriesToCollectionItems,
} from "@modules/home/lib/map-categories-to-collection"

export async function generateMetadata(): Promise<Metadata> {
  const [global, homePageResult] = await Promise.all([
    getGlobalSeoSettings(),
    getHomePage(),
  ])
  const page = homePageResult.page

  return buildPageMetadata(
    {
      title: page?.seoTitle?.trim() || SITE_TITLE_DEFAULT,
      description: page?.seoDescription?.trim() || SITE_DESCRIPTION,
      path: "/",
    },
    global
  )
}

export default async function Home({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  const [collections, region, homePageResult, peeResult, categories] =
    await Promise.all([
      getCollectionsWithProducts(countryCode),
      getRegion(countryCode),
      getHomePage(),
      getPrivateExpressionsPage(),
      listCategories(),
    ])

  if (!collections || !region) {
    return null
  }

  const page = homePageResult.page
  const pee = peeResult.page
  const collectionItems = mapCategoriesToCollectionItems(categories)
  const homeCollectionItems =
    collectionItems.length > 0 ? collectionItems : FALLBACK_COLLECTION_ITEMS

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
        <Hero
          headline={page?.heroHeadline ?? undefined}
          subheadline={page?.heroSubheadline ?? undefined}
          cta={page?.heroCta ?? undefined}
          figureLabels={
            page?.heroFigureLabels
              ? {
                  physical: page.heroFigureLabels.physical ?? undefined,
                  digital: page.heroFigureLabels.digital ?? undefined,
                }
              : undefined
          }
        />
      </div>
      <div id="intro">
        <Introduction text={page?.introText ?? undefined} />
      </div>
      <div id="physical">
        <Collection items={homeCollectionItems} />
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
        <Philosophy
          lines={page?.manifestoLines ?? undefined}
          ctaLabel={page?.philosophyCtaLabel ?? undefined}
        />
      </div>
      <div id="virtual-try-on">
        <VirtualTryOnSection
          label={page?.arFitLabel ?? undefined}
          title={page?.arFitTitle ?? undefined}
          paragraph={page?.arFitParagraph ?? undefined}
          ctaLabel={page?.arFitCtaLabel ?? undefined}
        />
      </div>
      <div id="private">
        <PrivateGate
          title={pee?.homeTeaserTitle ?? undefined}
          teaserLine1={pee?.homeTeaserLine1 ?? undefined}
          teaserLine2={pee?.homeTeaserLine2 ?? undefined}
          buttonLabel={pee?.homeTeaserButtonLabel ?? undefined}
        />
      </div>
    </>
  )
}
