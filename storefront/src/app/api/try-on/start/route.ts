import { NextResponse } from "next/server"

import {
  assertMedusaProductImageForTryon,
  assertProductImageForTryon,
} from "@lib/digital/load-product-for-api"
import { normalizeDigitalPdpSlug } from "@lib/digital/normalize-digital-slug"
import { imageUrlForTryOnProvider } from "@lib/digital/try-on-image-for-provider"
import {
  getVirtualTryOnApiKey,
  getVirtualTryOnProviderBaseUrl,
} from "@lib/digital/virtual-tryon-config"

export const runtime = "nodejs"
export const maxDuration = 60

type Body = {
  slug?: string
  productHandle?: string
  countryCode?: string
  modelImage?: string
}

export async function POST(request: Request) {
  const apiKey = getVirtualTryOnApiKey()
  if (!apiKey) {
    return NextResponse.json(
      { error: "Try-on is not configured" },
      { status: 503 }
    )
  }

  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const modelImage = body.modelImage?.trim()
  const slugRaw = body.slug?.trim() || ""
  const productHandle = body.productHandle?.trim()
  const countryCode = body.countryCode?.trim()

  const hasDigital = !!normalizeDigitalPdpSlug(slugRaw)
  const hasPhysical = !!(productHandle && countryCode)

  if (!modelImage || (!hasDigital && !hasPhysical) || (hasDigital && hasPhysical)) {
    return NextResponse.json(
      {
        error:
          "Provide exactly one of: (slug + modelImage) for digital, or (productHandle + countryCode + modelImage) for physical",
      },
      { status: 400 }
    )
  }

  if (
    !modelImage.startsWith("data:image/") &&
    !/^https?:\/\//i.test(modelImage)
  ) {
    return NextResponse.json(
      {
        error:
          "modelImage must be a data URL (data:image/...) or an https URL",
      },
      { status: 400 }
    )
  }

  let productImageUrl: string
  let tryonSlug: string | undefined

  try {
    if (hasPhysical) {
      const res = await assertMedusaProductImageForTryon(
        productHandle!,
        countryCode!
      )
      productImageUrl = res.productImageUrl
      tryonSlug = res.slugKey
    } else {
      const slug = normalizeDigitalPdpSlug(slugRaw)
      const res = await assertProductImageForTryon(slug)
      productImageUrl = res.productImageUrl
      tryonSlug = slug
    }
  } catch {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  let productImageForProvider: string
  try {
    productImageForProvider = await imageUrlForTryOnProvider(productImageUrl)
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Could not prepare product image for try-on"
    return NextResponse.json({ error: message }, { status: 502 })
  }

  const runRes = await fetch(`${getVirtualTryOnProviderBaseUrl()}/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model_name: "tryon-max",
      inputs: {
        product_image: productImageForProvider,
        model_image: modelImage,
      },
    }),
  })

  const payload = (await runRes.json().catch(() => ({}))) as {
    id?: string
    error?: string | null
  }

  if (!runRes.ok) {
    return NextResponse.json(
      {
        error:
          typeof payload.error === "string"
            ? payload.error
            : "Try-on service request failed",
      },
      { status: 502 }
    )
  }

  if (!payload.id) {
    const err =
      typeof payload.error === "string" && payload.error.trim()
        ? payload.error.trim()
        : "No prediction id returned"
    return NextResponse.json({ error: err }, { status: 502 })
  }

  return NextResponse.json({
    predictionId: payload.id,
    ...(tryonSlug ? { tryonSlug } : {}),
  })
}
