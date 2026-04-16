import type { Metadata } from "next"
import Link from "next/link"

import { normalizeDigitalPdpSlug } from "@lib/digital/normalize-digital-slug"
import { Container } from "@modules/common/components/xyz/Container"
import { DigitalPurchaseSuccessClient } from "@modules/digital-product/components/digital-purchase-success-client"

type Params = {
  params: Promise<{ countryCode: string; slug: string }>
  searchParams: Promise<{ session_id?: string }>
}

export const metadata: Metadata = {
  title: "Purchase complete | XYZ London",
  description: "Your XYZ London digital purchase is complete.",
  robots: { index: false, follow: false },
}

export default async function DigitalPurchaseSuccessPage({
  params,
  searchParams,
}: Params) {
  const { countryCode, slug: rawSlug } = await params
  const { session_id: sessionId } = await searchParams
  const slug = normalizeDigitalPdpSlug(rawSlug) || rawSlug

  return (
    <div className="min-h-screen bg-deepBlack pt-32 pb-24 text-white">
      <Container className="max-w-lg">
        <h1 className="text-2xl font-bold tracking-tight">Thank you</h1>
        <p className="mt-3 text-sm text-neutral-400">
          Your payment was successful. Download your full-resolution try-on
          image below.
        </p>
        <div className="mt-10 space-y-4">
          <DigitalPurchaseSuccessClient sessionId={sessionId} />
          <Link
            href={`/${countryCode}/digital/${encodeURIComponent(slug)}`}
            className="inline-block text-xs font-mono uppercase tracking-widest text-blue-400 hover:text-blue-300"
          >
            Back to product
          </Link>
        </div>
      </Container>
    </div>
  )
}
