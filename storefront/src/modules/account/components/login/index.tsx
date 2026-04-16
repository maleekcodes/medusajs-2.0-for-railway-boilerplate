import { useActionState } from "react"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { login } from "@lib/data/customer"

type Props = {
  countryCode: string
  setCurrentView: (view: LOGIN_VIEW) => void
  /** After sign-in, redirect here (must match current region path). */
  returnTo?: string
}

const Login = ({ countryCode, setCurrentView, returnTo }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="mx-auto w-full max-w-sm flex flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-xs font-bold uppercase tracking-widest text-deepBlack mb-4 text-center">
        Welcome back
      </h1>
      <p className="text-center text-sm text-neutral-500 leading-relaxed mb-10">
        Sign in to your XYZ London account.
      </p>
      <form className="w-full" action={formAction}>
        <input type="hidden" name="country_code" value={countryCode} />
        {returnTo ? (
          <input type="hidden" name="return_to" value={returnTo} />
        ) : null}
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton
          data-testid="sign-in-button"
          className="w-full mt-6"
          uiVariant="xyz"
        >
          Sign in
        </SubmitButton>
      </form>
      <span className="text-center text-small-regular text-neutral-500 mt-8">
        Not a member?{" "}
        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="font-medium text-deepBlack border-b border-deepBlack pb-0.5 hover:opacity-60 transition-opacity"
          data-testid="register-button"
        >
          Join us
        </button>
      </span>
    </div>
  )
}

export default Login
