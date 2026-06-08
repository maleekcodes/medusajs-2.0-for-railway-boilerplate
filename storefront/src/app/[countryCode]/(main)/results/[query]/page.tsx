import { Metadata } from "next"

import { buildPageMetadata } from "@lib/seo/metadata"
import { getGlobalSeoSettings, getStaticPageSeoFields } from "@lib/seo/sanity"
import SearchResultsTemplate from "@modules/search/templates/search-results-template"

import { search } from "@modules/search/actions"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ query: string; countryCode: string }>
}): Promise<Metadata> {
  const { query, countryCode } = await params
  const [global, seo] = await Promise.all([
    getGlobalSeoSettings(),
    getStaticPageSeoFields("search"),
  ])

  return buildPageMetadata(
    {
      title: seo?.seoTitle ?? `Search: ${query} | XYZ London`,
      description:
        seo?.seoDescription ?? "Explore premium luxury streetwear and refined headwear from XYZ London.",
      path: `/${countryCode}/results/${encodeURIComponent(query)}`,
      noIndex: true,
    },
    global
  )
}

type Params = {
  params: Promise<{ query: string; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export default async function SearchResults({ params, searchParams }: Params) {
  const [{ query, countryCode }, { sortBy, page }] = await Promise.all([
    params,
    searchParams,
  ])

  const hits = await search(query).then((data) => data)

  const ids = hits
    .map((h) => h.objectID || h.id)
    .filter((id): id is string => {
      return typeof id === "string"
    })

  return (
    <SearchResultsTemplate
      query={query}
      ids={ids}
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
    />
  )
}
