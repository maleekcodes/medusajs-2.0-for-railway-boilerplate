"use server"

import { sdk } from "@lib/config"
import { revalidateTag } from "next/cache"

import { getAuthHeaders } from "./cookies"

import type { HttpTypes } from "@medusajs/types"

type AddressPayload = {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  postal_code: string
  province: string
  country_code: string
  phone: string
}

function fromOrderAddress(
  addr:
    | HttpTypes.StoreOrderAddress
    | HttpTypes.StoreCartAddress
    | null
    | undefined
): AddressPayload | null {
  if (!addr?.address_1?.trim() || !addr.country_code?.trim()) {
    return null
  }
  return {
    first_name: addr.first_name ?? "",
    last_name: addr.last_name ?? "",
    company: addr.company ?? "",
    address_1: addr.address_1 ?? "",
    address_2: addr.address_2 ?? "",
    city: addr.city ?? "",
    postal_code: addr.postal_code ?? "",
    province: addr.province ?? "",
    country_code: addr.country_code.toLowerCase(),
    phone: addr.phone ?? "",
  }
}

function fingerprint(p: AddressPayload): string {
  return [
    p.address_1,
    p.postal_code,
    p.city,
    p.country_code,
    p.province,
  ]
    .map((s) => s.trim().toLowerCase())
    .join("|")
}

function customerAddressFingerprint(
  a: HttpTypes.StoreCustomerAddress
): string {
  return fingerprint({
    first_name: a.first_name ?? "",
    last_name: a.last_name ?? "",
    company: a.company ?? "",
    address_1: a.address_1 ?? "",
    address_2: a.address_2 ?? "",
    city: a.city ?? "",
    postal_code: a.postal_code ?? "",
    province: a.province ?? "",
    country_code: (a.country_code ?? "").toLowerCase(),
    phone: a.phone ?? "",
  })
}

function payloadEqual(a: AddressPayload, b: AddressPayload): boolean {
  return fingerprint(a) === fingerprint(b)
}

/**
 * Copies shipping (and distinct billing) addresses from a completed order onto the
 * logged-in customer's saved addresses, skipping duplicates already on file.
 */
export async function saveOrderAddressesToCustomer(
  order: HttpTypes.StoreOrder
) {
  const headers = await getAuthHeaders()
  if (!("authorization" in headers) || !headers.authorization) {
    return
  }

  let customer: HttpTypes.StoreCustomer | null = null
  try {
    const { customer: c } = await sdk.store.customer.retrieve(
      {},
      { cache: "no-store", ...headers }
    )
    customer = c
  } catch {
    return
  }

  if (!customer) {
    return
  }

  const existingFingerprints = new Set(
    (customer.addresses ?? []).map((a) => customerAddressFingerprint(a))
  )

  const shipping = fromOrderAddress(order.shipping_address)
  const billing = fromOrderAddress(order.billing_address)

  const candidates: AddressPayload[] = []
  if (shipping) {
    candidates.push(shipping)
  }
  if (billing && (!shipping || !payloadEqual(shipping, billing))) {
    candidates.push(billing)
  }

  const pendingFingerprints = new Set<string>()
  const hadNoSavedAddresses = (customer.addresses?.length ?? 0) === 0

  for (let i = 0; i < candidates.length; i++) {
    const payload = candidates[i]
    const fp = fingerprint(payload)
    if (existingFingerprints.has(fp) || pendingFingerprints.has(fp)) {
      continue
    }

    let defaults: {
      is_default_shipping?: boolean
      is_default_billing?: boolean
    } = {}
    if (hadNoSavedAddresses) {
      if (candidates.length === 1) {
        defaults = { is_default_shipping: true, is_default_billing: true }
      } else {
        if (i === 0) {
          defaults = { is_default_shipping: true }
        }
        if (i === 1) {
          defaults = { is_default_billing: true }
        }
      }
    }

    try {
      await sdk.store.customer.createAddress(
        { ...payload, ...defaults },
        {},
        headers
      )
      pendingFingerprints.add(fp)
      existingFingerprints.add(fp)
    } catch {
      try {
        await sdk.store.customer.createAddress(payload, {}, headers)
        pendingFingerprints.add(fp)
        existingFingerprints.add(fp)
      } catch {
        // Non-fatal: order still succeeded
      }
    }
  }

  if (pendingFingerprints.size > 0) {
    revalidateTag("customer")
  }
}
