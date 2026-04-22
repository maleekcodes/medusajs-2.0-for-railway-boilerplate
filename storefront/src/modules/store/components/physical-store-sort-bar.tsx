"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import {
  sortOptions,
  type SortOptions,
} from "@modules/store/components/refinement-list/sort-products"

type PhysicalStoreSortBarProps = {
  sortBy: SortOptions
  "data-testid"?: string
}

export function PhysicalStoreSortBar({
  sortBy,
  "data-testid": dataTestId,
}: PhysicalStoreSortBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setSort = (value: SortOptions) => {
    const query = createQueryString("sortBy", value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div
      className="w-full"
      data-testid={dataTestId}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="flex items-baseline gap-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
            Sort
          </span>
          <span className="hidden sm:block h-px flex-1 max-w-[120px] bg-neutral-200" aria-hidden />
        </div>

        <div
          className="flex flex-wrap items-center gap-2 sm:justify-end"
          role="tablist"
          aria-label="Sort products"
        >
          <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-neutral-200 bg-concrete p-1.5 sm:p-1">
            {sortOptions.map((opt) => {
              const active = sortBy === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  data-testid="sort-by-link"
                  data-active={active ? "true" : "false"}
                  onClick={() => setSort(opt.value)}
                  className={[
                    "rounded-full px-4 py-2.5 text-left text-xs font-medium tracking-wide transition-all duration-200 sm:px-5 sm:py-2",
                    active
                      ? "bg-deepBlack text-white shadow-sm"
                      : "bg-transparent text-neutral-600 hover:bg-white hover:text-deepBlack",
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
