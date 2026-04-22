"use client"

import { useActionState } from "react"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  countryCode: string
  setCurrentView: (view: LOGIN_VIEW) => void
  /** After registration, redirect here (must match current region path). */
  returnTo?: string
}

const Register = ({ countryCode, setCurrentView, returnTo }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="mx-auto w-full max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-xs font-bold uppercase tracking-widest text-deepBlack mb-4 text-center">
        Create an account
      </h1>
      <p className="text-center text-sm text-neutral-500 leading-relaxed mb-6">
        Join XYZ London to save addresses, track orders, and move faster at
        checkout.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <input type="hidden" name="country_code" value={countryCode} />
        {returnTo ? (
          <input type="hidden" name="return_to" value={returnTo} />
        ) : null}
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-small-regular text-neutral-500 mt-6">
          By creating an account, you agree to our{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="font-medium text-deepBlack border-b border-deepBlack pb-0.5 hover:opacity-60 transition-opacity"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="font-medium text-deepBlack border-b border-deepBlack pb-0.5 hover:opacity-60 transition-opacity"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton
          className="w-full mt-6"
          data-testid="register-button"
          uiVariant="xyz"
        >
          Join
        </SubmitButton>
      </form>
      <span className="text-center text-small-regular text-neutral-500 mt-8">
        Already a member?{" "}
        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="font-medium text-deepBlack border-b border-deepBlack pb-0.5 hover:opacity-60 transition-opacity"
        >
          Sign in
        </button>
      </span>
    </div>
  )
}

export default Register
