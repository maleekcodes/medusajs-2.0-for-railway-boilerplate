/** Matches `/[countryCode]/digital` and `/[countryCode]/digital/...` */
export function isDigitalRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  return /^\/[^/]+\/digital(?:\/|$)/.test(pathname)
}
