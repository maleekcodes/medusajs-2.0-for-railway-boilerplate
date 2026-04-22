import type { MetadataRoute } from "next"

import { getBaseURL } from "@lib/util/env"
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE_DEFAULT } from "@lib/seo/site"

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

export default function manifest(): MetadataRoute.Manifest {
  const origin = getBaseURL().replace(/\/$/, "")

  return {
    name: SITE_TITLE_DEFAULT,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: `${origin}/${DEFAULT_REGION}/`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    orientation: "portrait-primary",
  }
}
