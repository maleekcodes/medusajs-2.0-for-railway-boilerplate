import type { Metadata } from "next"

import AboutTemplate from "@modules/about/templates/about-template"

export const metadata: Metadata = {
  title: "About | XYZ London",
  description:
    "Learn about XYZ London - a fashion house exploring identity through physical and digital expression.",
}

export default function AboutPage() {
  return <AboutTemplate />
}
