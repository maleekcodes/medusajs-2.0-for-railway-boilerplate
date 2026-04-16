import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Help = () => {
  return (
    <div className="mt-12 border-t border-neutral-200 pt-10 md:mt-14 md:pt-12">
      <h3 className="text-sm font-bold text-deepBlack">Need help?</h3>
      <ul className="mt-4 flex flex-col gap-3 text-sm text-neutral-500">
        <li>
          <LocalizedClientLink
            href="/contact"
            className="transition-colors hover:text-deepBlack"
          >
            Contact
          </LocalizedClientLink>
        </li>
        <li>
          <LocalizedClientLink
            href="/contact#returns"
            className="transition-colors hover:text-deepBlack"
          >
            Returns &amp; exchanges
          </LocalizedClientLink>
        </li>
      </ul>
    </div>
  )
}

export default Help
