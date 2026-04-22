import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PhysicalFormStoreTemplate from "./physical-form-store"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  return (
    <PhysicalFormStoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
    />
  )
}

export default StoreTemplate
