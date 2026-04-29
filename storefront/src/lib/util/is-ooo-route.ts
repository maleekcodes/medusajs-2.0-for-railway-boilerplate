/** Matches `/[countryCode]/private-expressions` and nested paths */
export function isOOORoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  return /^\/[^/]+\/private-expressions(?:\/|$)/.test(pathname)
}
