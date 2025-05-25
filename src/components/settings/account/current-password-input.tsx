import { FieldErrors, UseFormRegisterReturn } from "react-hook-form"
import ErrorMessage from "@/components/error/error-message"
import { LockClosedIcon } from "@heroicons/react/24/outline"

interface CurrentPasswordInputProps {
  errors: FieldErrors
  register: UseFormRegisterReturn<string>
  disabled: boolean
}

const CurrentPasswordInput = ({ errors, register, disabled }: CurrentPasswordInputProps) => (
  <div className={"input-container"}>
    <label htmlFor="currentPassword" className="sr-only">
      Enter your current password
    </label>
    {errors.currentPassword && (
      <ErrorMessage
        dataCy={"input-current-password-error"}
        // @ts-ignore
        message={errors.currentPassword.message}
      />
    )}
    <div className="input">
      <input
        className={`p-2.5! pe-12! ${errors.currentPassword && "error"}`}
        data-cy={"input-current-password"}
        type="password"
        placeholder="Current password"
        {...register}
        disabled={disabled}
      />
      <span>
        <LockClosedIcon />
      </span>
    </div>
  </div>
)

export default CurrentPasswordInput
