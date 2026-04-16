"use client"

import { Button } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"

const xyzPrimaryClass =
  "w-full rounded-none bg-deepBlack py-4 text-sm font-mono uppercase tracking-widest text-white hover:bg-neutral-800"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
  uiVariant,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  /** Match storefront XYZ primary CTAs (cart / checkout). */
  uiVariant?: "default" | "xyz"
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  const merged =
    [uiVariant === "xyz" ? xyzPrimaryClass : "", className].filter(Boolean).join(" ") ||
    undefined

  return (
    <Button
      size="large"
      className={merged}
      type="submit"
      isLoading={pending}
      variant={variant || "primary"}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  )
}
