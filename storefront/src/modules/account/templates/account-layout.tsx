import React from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Container } from "@modules/common/components/xyz/Container"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 pb-16 small:pb-24 small:pt-8" data-testid="account-page">
      <Container className="flex flex-col">
        {customer ? (
          <div className="grid grid-cols-1 small:grid-cols-[minmax(0,220px)_1fr] gap-12 small:gap-16 py-8 small:py-12">
            <div>
              <AccountNav customer={customer} />
            </div>
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        ) : (
          <div className="flex w-full justify-center py-8 small:py-12">
            <div className="w-full max-w-md">{children}</div>
          </div>
        )}
        <div className="flex flex-col small:flex-row small:items-end justify-between gap-6 border-t border-neutral-100 pt-10 pb-4">
          <div className="space-y-2 max-w-md">
            <h3 className="text-xs font-bold uppercase tracking-widest text-deepBlack">
              Help
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Questions about your order or account? Reach out — we’re happy to
              help.
            </p>
          </div>
          <LocalizedClientLink
            href="/contact"
            className="text-sm font-medium text-deepBlack border-b border-deepBlack pb-0.5 hover:opacity-60 transition-opacity inline-block shrink-0"
          >
            Contact
          </LocalizedClientLink>
        </div>
      </Container>
    </div>
  )
}

export default AccountLayout
