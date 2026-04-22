"use client"

import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Table, clx } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  items?: HttpTypes.StoreCartLineItem[]
  /** Checkout sidebar: spacious cards instead of compact table rows. */
  variant?: "default" | "xyz"
}

const ItemsPreviewTemplate = ({
  items,
  variant = "default",
}: ItemsTemplateProps) => {
  const hasOverflow = items && items.length > 4

  const sortItems = (list: HttpTypes.StoreCartLineItem[]) =>
    [...list].sort((a, b) =>
      (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
    )

  if (variant === "xyz") {
    const rows = items?.length
      ? sortItems(items).map((item) => (
          <Item
            key={item.id}
            item={item}
            type="preview"
            previewLayout="card"
          />
        ))
      : repeat(5).map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse border border-neutral-200 bg-white md:h-32"
          />
        ))

    return (
      <div
        className={clx("flex flex-col gap-4 md:gap-5", {
          "max-h-[420px] overflow-y-auto overflow-x-hidden pr-1 no-scrollbar":
            hasOverflow,
        })}
        data-testid="items-table"
      >
        {rows}
      </div>
    )
  }

  return (
    <div
      className={clx({
        "pl-[1px] overflow-y-scroll overflow-x-hidden no-scrollbar max-h-[420px]":
          hasOverflow,
      })}
    >
      <Table>
        <Table.Body data-testid="items-table">
          {items
            ? sortItems(items).map((item) => {
                return <Item key={item.id} item={item} type="preview" />
              })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsPreviewTemplate
