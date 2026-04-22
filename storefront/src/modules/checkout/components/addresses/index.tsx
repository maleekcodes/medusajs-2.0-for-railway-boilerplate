"use client"

import { CheckCircleSolid } from "@medusajs/icons"
import { Text, useToggleState } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
  checkoutEditLink,
  checkoutSectionTitle,
  checkoutStepDivider,
} from "@modules/checkout/components/checkout-ui"
import Spinner from "@modules/common/icons/spinner"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white">
      <div className="mb-6 flex flex-row items-center justify-between gap-4">
        <h2
          className={`flex items-baseline gap-2 ${checkoutSectionTitle} ${
            !isOpen && !cart?.shipping_address
              ? "opacity-50"
              : ""
          }`}
        >
          Shipping address
          {!isOpen && cart?.shipping_address ? (
            <span className="text-emerald-600" aria-hidden>
              <CheckCircleSolid />
            </span>
          ) : null}
        </h2>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className={checkoutEditLink}
              data-testid="edit-address-button"
              type="button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <h2
                  className={`${checkoutSectionTitle} gap-x-4 pb-6 pt-8`}
                >
                  Billing address
                </h2>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton
              uiVariant="xyz"
              className="mt-6"
              data-testid="submit-address-button"
            >
              Continue to delivery
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex items-start gap-x-1 w-full">
                  <div
                    className="flex flex-col w-1/3"
                    data-testid="shipping-address-summary"
                  >
                    <Text className="mb-1 text-sm font-bold text-deepBlack">
                      Shipping address
                    </Text>
                    <Text className="text-sm text-neutral-500">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="text-sm text-neutral-500">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text className="text-sm text-neutral-500">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                    <Text className="text-sm text-neutral-500">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>

                  <div
                    className="flex flex-col w-1/3 "
                    data-testid="shipping-contact-summary"
                  >
                    <Text className="mb-1 text-sm font-bold text-deepBlack">
                      Contact
                    </Text>
                    <Text className="text-sm text-neutral-500">
                      {cart.shipping_address.phone}
                    </Text>
                    <Text className="text-sm text-neutral-500">
                      {cart.email}
                    </Text>
                  </div>

                  <div
                    className="flex flex-col w-1/3"
                    data-testid="billing-address-summary"
                  >
                    <Text className="mb-1 text-sm font-bold text-deepBlack">
                      Billing address
                    </Text>

                    {sameAsBilling ? (
                      <Text className="text-sm text-neutral-500">
                        Billing- and delivery address are the same.
                      </Text>
                    ) : (
                      <>
                        <Text className="text-sm text-neutral-500">
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </Text>
                        <Text className="text-sm text-neutral-500">
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </Text>
                        <Text className="text-sm text-neutral-500">
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </Text>
                        <Text className="text-sm text-neutral-500">
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <div className={checkoutStepDivider} />
    </div>
  )
}

export default Addresses
