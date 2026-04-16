import type { Metadata } from "next"

import ARFitTemplate from "@modules/ar-fit/templates/ar-fit-template"

export const metadata: Metadata = {
  title: "AR Fit | XYZ London",
  description:
    "Experience our collection in augmented reality. Try before you buy.",
}

export default function ARFitPage() {
  return <ARFitTemplate />
}
