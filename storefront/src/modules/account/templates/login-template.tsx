"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

type LoginTemplateProps = {
  returnTo?: string
}

const LoginTemplate = ({ returnTo }: LoginTemplateProps) => {
  const [currentView, setCurrentView] = useState("sign-in")
  const { countryCode } = useParams() as { countryCode: string }

  return (
    <div className="w-full">
      {currentView === "sign-in" ? (
        <Login
          countryCode={countryCode}
          setCurrentView={setCurrentView}
          returnTo={returnTo}
        />
      ) : (
        <Register
          countryCode={countryCode}
          setCurrentView={setCurrentView}
          returnTo={returnTo}
        />
      )}
    </div>
  )
}

export default LoginTemplate
