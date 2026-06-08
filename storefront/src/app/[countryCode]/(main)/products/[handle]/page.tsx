import { Metadata } from "next"
import { notFound } from "next/navigation"

import { buildPageMetadata } from "@lib/seo/metadata"
import { buildProductSchema } from "@lib/seo/schema"
import { getGlobalSeoSettings } from "@lib/seo/sanity"
import { SITE_NAME } from "@lib/seo/site"
import ProductTemplate from "@modules/products/templates"
import JsonLd from "@modules/seo/components/json-ld"
import { getRegion, listRegions } from "@lib/data/regions"
import { getProductByHandle, getProductsList } from "@lib/data/products"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  if (!countryCodes) {
    return null
  }

  const products = await Promise.all(
    countryCodes.map((countryCode) => {
      return getProductsList({ countryCode })
    })
  ).then((responses) =>
    responses.map(({ response }) => response.products).flat()
  )

  const staticParams = countryCodes
    ?.map((countryCode) =>
      products.map((product) => ({
        countryCode,
        handle: product.handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { countryCode, handle } = await params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  const product = await getProductByHandle(handle, region.id)

  if (!product) {
    notFound()
  }

  const global = await getGlobalSeoSettings()
  const title = `${product.title} | ${SITE_NAME}`
  const description =
    product.description?.replace(/<[^>]*>/g, "").trim().slice(0, 160) ||
    `${product.title} — ${SITE_NAME}.`

  return buildPageMetadata(
    {
      title,
      description,
      path: `/${countryCode}/products/${handle}`,
      image: product.thumbnail,
    },
    global
  )
}

export default async function ProductPage({ params }: Props) {
  const { countryCode, handle } = await params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await getProductByHandle(handle, region.id)
  if (!pricedProduct) {
    notFound()
  }

  const productSchema = buildProductSchema({
    product: pricedProduct,
    countryCode,
  })

  return (
    <>
      <JsonLd data={productSchema} />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={countryCode}
      />
    </>
  )
}
