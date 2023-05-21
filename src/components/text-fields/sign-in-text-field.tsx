import React from "react"
import {FieldValues, RegisterOptions, UseFormRegister} from "react-hook-form";

interface SignInTextFieldProps {
  placeholder: string
  dataCy: string
  type: string
  tag: string,
  validationOptions: RegisterOptions,
  register: UseFormRegister<FieldValues>
}

const SignInTextField = (props: SignInTextFieldProps) => {
  return (
    <input
      className="w-full rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-moon-500 focus:bg-white focus:outline-none"
      data-cy={props.dataCy}
      {...props.register(props.tag, props.validationOptions)}
      type={props.type}
      placeholder={props.placeholder}
    />
  )
}

export default SignInTextField
