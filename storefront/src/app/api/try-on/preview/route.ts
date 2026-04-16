import { NextResponse } from "next/server"

import { assertProductImageForTryon } from "@lib/digital/load-product-for-api"
import { normalizeDigitalPdpSlug } from "@lib/digital/normalize-digital-slug"
import {
  digitalTryonObjectKey,
  getTryonObjectBuffer,
  isMinioConfigured,
} from "@lib/digital/minio-server"
import { verifyPreviewSignature } from "@lib/digital/preview-token"
import { renderTryonPreviewJpeg } from "@lib/digital/render-tryon-preview"

export const runtime = "nodejs"

export async function GET(request: Request) {
  if (!isMinioConfigured()) {
    return new NextResponse("Storage not configured", { status: 503 })
  }

  const url = new URL(request.url)
  const slugRaw = url.searchParams.get("slug")?.trim() ?? ""
  const id = url.searchParams.get("id")?.trim() ?? ""
  const expRaw = url.searchParams.get("exp")?.trim() ?? ""
  const sig = url.searchParams.get("sig")?.trim() ?? ""
  const exp = parseInt(expRaw, 10)

  const slug = normalizeDigitalPdpSlug(slugRaw)
  if (!slug || !id || !sig || !Number.isFinite(exp)) {
    return new NextResponse("Bad request", { status: 400 })
  }

  try {
    if (!verifyPreviewSignature(slugRaw, id, exp, sig)) {
      return new NextResponse("Forbidden", { status: 403 })
    }
  } catch {
    return new NextResponse("Preview signing not configured", { status: 503 })
  }

  try {
    await assertProductImageForTryon(slug)
  } catch {
    return new NextResponse("Not found", { status: 404 })
  }

  const key = digitalTryonObjectKey(slug, id)
  const raw = await getTryonObjectBuffer(key)
  if (!raw?.length) {
    return new NextResponse("Not found", { status: 404 })
  }

  let jpeg: Buffer
  try {
    jpeg = await renderTryonPreviewJpeg(raw)
  } catch (e) {
    console.error("try-on preview render failed:", e)
    return new NextResponse("Image processing failed", { status: 500 })
  }

  return new NextResponse(new Uint8Array(jpeg), {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "private, no-store, max-age=0",
    },
  })
}
