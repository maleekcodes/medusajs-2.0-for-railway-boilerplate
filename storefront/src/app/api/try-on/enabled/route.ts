import { NextResponse } from "next/server"

import { getVirtualTryOnApiKey } from "@lib/digital/virtual-tryon-config"

/**
 * Public feature flag: virtual try-on is available when the provider API key is set.
 */
export async function GET() {
  return NextResponse.json({ enabled: !!getVirtualTryOnApiKey() })
}
