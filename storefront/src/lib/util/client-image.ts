"use client"

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result)
      } else {
        reject(new Error("Could not read file"))
      }
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export async function compressImageDataUrl(
  dataUrl: string,
  maxDim = 1280,
  quality = 0.85
): Promise<string> {
  if (typeof document === "undefined") {
    return dataUrl
  }
  const img = new Image()
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = () => reject(new Error("Image load failed"))
    img.src = dataUrl
  })
  let { width, height } = img
  if (width <= maxDim && height <= maxDim) {
    return dataUrl
  }
  const scale = maxDim / Math.max(width, height)
  width = Math.round(width * scale)
  height = Math.round(height * scale)
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    return dataUrl
  }
  ctx.drawImage(img, 0, 0, width, height)
  return canvas.toDataURL("image/jpeg", quality)
}
