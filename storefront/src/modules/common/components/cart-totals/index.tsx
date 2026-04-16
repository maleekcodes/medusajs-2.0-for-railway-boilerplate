"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    shipping_total?: number | null
    discount_total?: number | null
    gift_card_total?: number | null
    currency_code: string
  }
  /** Align typography with XYZ London storefront (cart summary panel). */
  variant?: "default" | "xyz"
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals, variant = "default" }) => {
  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    shipping_total,
    discount_total,
    gift_card_total,
  } = totals

  const labelClass =
    variant === "xyz"
      ? "text-sm text-neutral-500"
      : "txt-medium text-ui-fg-subtle"
  const valueClass = variant === "xyz" ? "text-sm text-deepBlack tabular-nums" : ""

  return (
    <div>
      <div className={`flex flex-col gap-y-2 ${labelClass}`}>
        <div className="flex items-center justify-between">
          <span className="flex gap-x-1 items-center">
            {variant === "xyz"
              ? "Subtotal"
              : "Subtotal (excl. shipping and taxes)"}
          </span>
          <span
            className={valueClass}
            data-testid="cart-subtotal"
            data-value={subtotal || 0}
          >
            {convertToLocale({ amount: subtotal ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span
              className={
                variant === "xyz"
                  ? "text-sm text-emerald-700 tabular-nums"
                  : "text-ui-fg-interactive"
              }
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span
            className={valueClass}
            data-testid="cart-shipping"
            data-value={shipping_total || 0}
          >
            {variant === "xyz" && (shipping_total ?? 0) === 0
              ? "Calculated at checkout"
              : convertToLocale({ amount: shipping_total ?? 0, currency_code })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex gap-x-1 items-center ">Taxes</span>
          <span
            className={valueClass}
            data-testid="cart-taxes"
            data-value={tax_total || 0}
          >
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Gift card</span>
            <span
              className={
                variant === "xyz"
                  ? "text-sm text-emerald-700 tabular-nums"
                  : "text-ui-fg-interactive"
              }
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: gift_card_total ?? 0, currency_code })}
            </span>
          </div>
        )}
      </div>
      <div
        className={`h-px w-full border-b my-4 ${
          variant === "xyz" ? "border-neutral-200" : "border-gray-200"
        }`}
      />
      <div
        className={`flex items-center justify-between mb-2 ${
          variant === "xyz"
            ? "text-lg font-bold text-deepBlack"
            : "text-ui-fg-base txt-medium"
        }`}
      >
        <span>Total</span>
        <span
          className={variant === "xyz" ? "tabular-nums" : "txt-xlarge-plus"}
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
      {variant === "xyz" ? (
        <p className="text-xs text-neutral-400 mt-1">
          Taxes calculated at checkout where applicable.
        </p>
      ) : null}
      <div
        className={`h-px w-full border-b mt-4 ${
          variant === "xyz" ? "border-neutral-200" : "border-gray-200"
        }`}
      />
    </div>
  )
}

export default CartTotals
