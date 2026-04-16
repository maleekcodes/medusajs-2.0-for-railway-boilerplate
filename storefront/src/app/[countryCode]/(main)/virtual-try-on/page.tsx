import type { Metadata } from "next"

import VirtualTryOnTemplate from "@modules/virtual-try-on/templates/virtual-try-on-template"

export const metadata: Metadata = {
  title: "Try-on | XYZ London",
  description:
    "How XYZ try-on works: upload a photo on supported physical or digital pieces, get a composite preview, and shop with more context than flat photos alone.",
}

export default function VirtualTryOnPage() {
  return <VirtualTryOnTemplate />
}
