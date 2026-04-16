"use server"

import { sdk } from "@lib/config"
import { transferCartToSessionCustomer } from "@lib/data/cart"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { cache } from "react"
import { getAuthHeaders, removeAuthToken, setAuthToken } from "./cookies"

function countryCodeFromForm(formData: FormData): string {
  const raw = formData.get("country_code")
  if (typeof raw !== "string" || !/^[a-z]{2}$/i.test(raw)) {
    return "us"
  }
  return raw.toLowerCase()
}

/** Same-region path only; blocks open redirects. */
function safeReturnPath(
  value: unknown,
  countryCode: string
): string | null {
  if (typeof value !== "string" || value.length === 0) return null
  const cc = countryCode.toLowerCase()
  if (value.includes("..") || value.includes("//")) return null
  const re = new RegExp(`^/${cc}/[a-zA-Z0-9][a-zA-Z0-9/_-]*$`)
  if (!re.test(value)) return null
  return value
}

export const getCustomer = cache(async function () {
  const headers = await getAuthHeaders()
  return await sdk.store.customer
    .retrieve(
      {},
      {
        cache: "no-store",
        next: { tags: ["customer"] },
        ...headers,
      }
    )
    .then(({ customer }) => customer)
    .catch(() => null)
})

export const updateCustomer = cache(async function (
  body: HttpTypes.StoreUpdateCustomer
) {
  const updateRes = await sdk.store.customer
    .update(body, {}, await getAuthHeaders())
    .then(({ customer }) => customer)
    .catch(medusaError)

  revalidateTag("customer")
  return updateRes
})

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const countryCode = countryCodeFromForm(formData)
  const customerForm = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
  }

  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    })

    const customHeaders = { authorization: `Bearer ${token}` }

    await sdk.store.customer.create(customerForm, {}, customHeaders)

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password,
    })

    if (typeof loginToken !== "string") {
      throw new Error("Unexpected auth response during signup")
    }
    await setAuthToken(loginToken)

    revalidateTag("customer")
    await transferCartToSessionCustomer()
  } catch (error: any) {
    return error.toString()
  }
  const returnTo =
    safeReturnPath(formData.get("return_to"), countryCode) ??
    `/${countryCode}/account`
  redirect(returnTo)
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const countryCode = countryCodeFromForm(formData)

  try {
    const token = await sdk.auth.login("customer", "emailpass", {
      email,
      password,
    })
    if (typeof token !== "string") {
      throw new Error("Unexpected auth response during login")
    }
    await setAuthToken(token)
    revalidateTag("customer")
    await transferCartToSessionCustomer()
  } catch (error: any) {
    return error.toString()
  }
  const returnTo =
    safeReturnPath(formData.get("return_to"), countryCode) ??
    `/${countryCode}/account`
  redirect(returnTo)
}

export async function signout(countryCode: string) {
  await sdk.auth.logout()
  await removeAuthToken()
  revalidateTag("auth")
  revalidateTag("customer")
  redirect(`/${countryCode}/account`)
}

export const addCustomerAddress = async (
  _currentState: unknown,
  formData: FormData
): Promise<any> => {
  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
  }

  return sdk.store.customer
    .createAddress(address, {}, await getAuthHeaders())
    .then(({ customer }) => {
      revalidateTag("customer")
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  await sdk.store.customer
    .deleteAddress(addressId, await getAuthHeaders())
    .then(() => {
      revalidateTag("customer")
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const addressId = currentState.addressId as string

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
  }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, await getAuthHeaders())
    .then(() => {
      revalidateTag("customer")
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}
