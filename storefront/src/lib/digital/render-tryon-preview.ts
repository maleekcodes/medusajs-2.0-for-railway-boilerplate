import "server-only"

import sharp from "sharp"

const MAX_EDGE = 1024
const JPEG_QUALITY = 74

function previewWatermarkSvg(width: number, height: number): Buffer {
  const w = Math.max(1, Math.round(width))
  const h = Math.max(1, Math.round(height))
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="wm" width="180" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
      <text x="0" y="72" font-family="system-ui,sans-serif" font-size="36" font-weight="800" fill="rgba(255,255,255,0.22)" letter-spacing="0.35em">PREVIEW</text>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#wm)"/>
</svg>`
  return Buffer.from(svg)
}

/** Downscale + baked-in watermark; output JPEG (not full-resolution PNG). */
export async function renderTryonPreviewJpeg(input: Buffer): Promise<Buffer> {
  const resized = await sharp(input)
    .rotate()
    .resize(MAX_EDGE, MAX_EDGE, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .toBuffer({ resolveWithObject: false })

  const meta = await sharp(resized).metadata()
  const width = meta.width ?? MAX_EDGE
  const height = meta.height ?? MAX_EDGE

  return sharp(resized)
    .composite([
      {
        input: previewWatermarkSvg(width, height),
        blend: "over",
      },
    ])
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer()
}
