import { redirect } from "next/navigation"

type Props = {
  params: Promise<{ countryCode: string }>
}

/** @deprecated Use `/virtual-try-on` — kept for bookmarks and external links. */
export default async function ARFitLegacyRedirect({ params }: Props) {
  const { countryCode } = await params
  redirect(`/${countryCode}/virtual-try-on`)
}
