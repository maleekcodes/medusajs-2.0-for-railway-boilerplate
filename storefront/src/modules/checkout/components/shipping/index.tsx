"use client"

import { RadioGroup } from "@headlessui/react"
import { CheckCircleSolid } from "@medusajs/icons"
import { Button, Text, clx } from "@medusajs/ui"

import {
  checkoutEditLink,
  checkoutPrimaryButton,
  checkoutRadioCard,
  checkoutRadioCardSelected,
  checkoutSectionTitle,
  checkoutStepDivider,
} from "@modules/checkout/components/checkout-ui"
import Radio from "@modules/common/components/radio"
import ErrorMessage from "@modules/checkout/components/error-message"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { startTransition, useCallback, useEffect, useState } from "react"
import { setShippingMethod } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const cartShippingOptionId =
    cart.shipping_methods?.at(-1)?.shipping_option_id ?? ""

  /** Always a string so RadioGroup stays controlled (never `undefined`). */
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    cartShippingOptionId
  )

  useEffect(() => {
    setSelectedOptionId(cartShippingOptionId)
  }, [cartShippingOptionId, cart.id])

  const selectedShippingMethod = availableShippingMethods?.find(
    (method) => method.id === selectedOptionId
  )

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const applyShippingMethod = useCallback(
    async (id: string) => {
      const previousId = selectedOptionId
      setSelectedOptionId(id)
      setError(null)
      setIsLoading(true)
      try {
        await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
        startTransition(() => {
          router.refresh()
        })
      } catch (err: unknown) {
        setSelectedOptionId(previousId)
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setIsLoading(false)
      }
    },
    [cart.id, router, selectedOptionId]
  )

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white">
      <div className="mb-6 flex flex-row items-center justify-between gap-4">
        <h2
          className={clx(
            `flex items-baseline gap-2 ${checkoutSectionTitle}`,
            {
              "pointer-events-none select-none opacity-50":
                !isOpen && cart.shipping_methods?.length === 0,
            }
          )}
        >
          Delivery
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 ? (
            <span className="text-emerald-600" aria-hidden>
              <CheckCircleSolid />
            </span>
          ) : null}
        </h2>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Text>
              <button
                onClick={handleEdit}
                className={checkoutEditLink}
                data-testid="edit-delivery-button"
                type="button"
              >
                Edit
              </button>
            </Text>
          )}
      </div>
      {isOpen ? (
        <div data-testid="delivery-options-container">
          <div className="pb-8">
            <RadioGroup
              value={selectedOptionId}
              onChange={applyShippingMethod}
            >
              {availableShippingMethods?.map((option) => {
                return (
                  <RadioGroup.Option
                    key={option.id}
                    value={option.id}
                    data-testid="delivery-option-radio"
                    className={clx(
                      checkoutRadioCard,
                      "items-center justify-between",
                      {
                        [checkoutRadioCardSelected]:
                          option.id === selectedOptionId,
                      }
                    )}
                  >
                    <div className="flex items-center gap-x-4">
                      <Radio checked={option.id === selectedOptionId} />
                      <span className="text-sm text-deepBlack">{option.name}</span>
                    </div>
                    <span className="justify-self-end text-sm tabular-nums text-deepBlack">
                      {convertToLocale({
                        amount: option.amount!,
                        currency_code: cart?.currency_code,
                      })}
                    </span>
                  </RadioGroup.Option>
                )
              })}
            </RadioGroup>
          </div>

          <ErrorMessage
            error={error}
            data-testid="delivery-option-error-message"
          />

          <Button
            size="large"
            className={clx(checkoutPrimaryButton, "mt-6")}
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={!cart.shipping_methods?.[0]}
            data-testid="submit-delivery-option-button"
          >
            Continue to payment
          </Button>
        </div>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex w-full max-w-md flex-col">
                <Text className="mb-1 text-sm font-bold text-deepBlack">
                  Method
                </Text>
                <Text className="text-sm text-neutral-500">
                  {selectedShippingMethod?.name}{" "}
                  {convertToLocale({
                    amount: selectedShippingMethod?.amount!,
                    currency_code: cart?.currency_code,
                  })}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
      <div className={checkoutStepDivider} />
    </div>
  )
}

export default Shipping
