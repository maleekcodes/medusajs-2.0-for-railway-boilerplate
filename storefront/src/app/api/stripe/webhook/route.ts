import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"

/**
 * Verifies Stripe webhook signatures. Fulfillment is on-demand via
 * `/api/digital/download` using the Checkout Session id.
 */
export async function POST(request: Request) {
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  const stripeKey = process.env.STRIPE_SECRET_KEY?.trim()
  if (!whSecret || !stripeKey) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured" },
      { status: 503 }
    )
  }

  const body = await request.text()
  const sig = (await headers()).get("stripe-signature")
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 })
  }

  const stripe = new Stripe(stripeKey, { typescript: true })
  try {
    stripe.webhooks.constructEvent(body, sig, whSecret)
  } catch (e) {
    console.error("Stripe webhook verification failed:", e)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  return NextResponse.json({ received: true })
}
