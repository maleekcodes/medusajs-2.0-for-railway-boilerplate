import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  enrichLineItems,
  retrieveCart,
  transferCartToSessionCustomer,
} from "@lib/data/cart"
import Wrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Container } from "@modules/common/components/xyz/Container"
import { HttpTypes } from "@medusajs/types"
import { getCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Checkout | XYZ London",
  description:
    "Complete your XYZ London order — shipping and secure payment.",
  robots: { index: false, follow: false },
}

async function prepareCheckout() {
  const customer = await getCustomer()
  let cart = await retrieveCart()
  if (!cart) {
    notFound()
  }

  if (customer) {
    await transferCartToSessionCustomer()
    cart = (await retrieveCart()) ?? cart
  }

  if (cart.items?.length) {
    const enrichedItems = await enrichLineItems(cart.items, cart.region_id!)
    cart.items = enrichedItems as HttpTypes.StoreCartLineItem[]
  }

  return { cart, customer }
}

export default async function Checkout() {
  const { cart, customer } = await prepareCheckout()

  return (
    <Container className="pb-24 pt-12 md:pt-16">
      <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-[1fr_min(100%,380px)] lg:gap-x-16 xl:gap-x-20">
        <Wrapper cart={cart}>
          <CheckoutForm cart={cart} customer={customer} />
        </Wrapper>
        <CheckoutSummary cart={cart} />
      </div>
    </Container>
  )
}
