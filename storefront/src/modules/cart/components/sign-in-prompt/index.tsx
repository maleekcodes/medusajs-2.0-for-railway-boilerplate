import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="flex flex-col gap-6 border border-neutral-200 bg-concrete/50 p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold text-deepBlack">
          Already have an account?
        </h2>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-500">
          Sign in for a faster checkout and order history.
        </p>
      </div>
      <LocalizedClientLink
        href="/account"
        data-testid="sign-in-button"
        className="w-full shrink-0 border border-deepBlack bg-white px-6 py-2.5 text-center text-sm font-mono uppercase tracking-widest text-deepBlack transition-colors hover:bg-neutral-100 sm:mt-0.5 sm:w-auto sm:self-center"
      >
        Sign in
      </LocalizedClientLink>
    </div>
  )
}

export default SignInPrompt
