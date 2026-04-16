/**
 * Sanity digital products store `price` in major units (e.g. 45 = £45).
 * ETH is shown without Intl currency style.
 */
export function formatDigitalPrice(
  amount: number | null | undefined,
  currency: string | null | undefined
): string | null {
  if (amount == null || Number.isNaN(Number(amount))) {
    return null
  }
  const c = (currency || "GBP").toUpperCase()
  if (c === "ETH") {
    return `${Number(amount)} ETH`
  }
  const locale =
    c === "EUR" ? "de-DE" : c === "USD" ? "en-US" : "en-GB"
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: c,
    }).format(Number(amount))
  } catch {
    return `${c} ${amount}`
  }
}
