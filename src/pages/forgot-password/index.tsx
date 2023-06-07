import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { ForgotPasswordConfirmation } from "@/components/forgot-password/forgot-password-confirmation"
import {
  ForgotPasswordForm,
  ForgotPasswordInputs,
} from "@/components/forgot-password/forgot-password-form"

const Index = () => {
  const [emailIsSent, setEmailIsSent] = useState<boolean>(false)

  const methods = useForm<ForgotPasswordInputs>()

  return (
    <div className={"full-bg-moon-50"}>
      <FormProvider {...methods}>
        {emailIsSent && <ForgotPasswordConfirmation />}
        {!emailIsSent && <ForgotPasswordForm setEmailIsSent={setEmailIsSent} />}
      </FormProvider>
    </div>
  )
}

export default Index
