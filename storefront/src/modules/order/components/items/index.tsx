import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"

import Item from "@modules/order/components/item"

type ItemsProps = {
  items: HttpTypes.StoreCartLineItem[] | HttpTypes.StoreOrderLineItem[] | null
}

const Items = ({ items }: ItemsProps) => {
  return (
    <div className="flex flex-col gap-4 md:gap-5" data-testid="products-table">
      {items?.length
        ? [...items]
            .sort((a, b) => {
              return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
            })
            .map((item) => {
              return <Item key={item.id} item={item} />
            })
        : repeat(3).map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse border border-neutral-200 bg-white md:h-32"
            />
          ))}
    </div>
  )
}

export default Items
