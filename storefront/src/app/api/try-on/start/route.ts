import { NextResponse } from "next/server"

import { assertProductImageForTryon } from "@lib/digital/load-product-for-api"
import { normalizeDigitalPdpSlug } from "@lib/digital/normalize-digital-slug"
import {
  getVirtualTryOnApiKey,
  getVirtualTryOnProviderBaseUrl,
} from "@lib/digital/virtual-tryon-config"

export const runtime = "nodejs"
export const maxDuration = 60

type Body = {
  slug?: string
  modelImage?: string
}

export async function POST(request: Request) {
  const apiKey = getVirtualTryOnApiKey()
  if (!apiKey) {
    return NextResponse.json(
      { error: "Virtual try-on is not configured" },
      { status: 503 }
    )
  }

  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const slug = normalizeDigitalPdpSlug(body.slug?.trim() || "")
  const modelImage = body.modelImage?.trim()
  if (!slug || !modelImage) {
    return NextResponse.json(
      { error: "slug and modelImage are required" },
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
  try {
    const res = await assertProductImageForTryon(slug)
    productImageUrl = res.productImageUrl
  } catch {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
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
        product_image: productImageUrl,
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

  if (!payload.id || typeof payload.error === "string") {
    return NextResponse.json(
      { error: payload.error || "No prediction id returned" },
      { status: 502 }
    )
  }

  return NextResponse.json({ predictionId: payload.id })
}
