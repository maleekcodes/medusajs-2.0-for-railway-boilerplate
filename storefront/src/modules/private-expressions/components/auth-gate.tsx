"use client"

import LoginTemplate from "@modules/account/templates/login-template"
import { Container } from "@modules/common/components/xyz/Container"

type Props = {
  countryCode: string
}

export default function PrivateExpressionsAuthGate({ countryCode }: Props) {
  const returnTo = `/${countryCode}/private-expressions`

  return (
    <div className="pb-16 small:pb-24">
      <Container className="py-12 small:py-16">
        <div className="max-w-xl mx-auto text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-deepBlack mb-3">
            Private Expressions
          </p>
          <h1 className="text-2xl small:text-3xl font-bold tracking-tight text-deepBlack mb-4">
            Secure entry
          </h1>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Sign in or create an account to access Private Expressions. This area
            is limited and reviewed over time.
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <LoginTemplate returnTo={returnTo} />
        </div>
      </Container>
    </div>
  )
}
