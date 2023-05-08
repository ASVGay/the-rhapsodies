import React from "react"

interface SignInTextFieldProps {
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: string
}

const SignInTextField = (props: SignInTextFieldProps) => {
  return (
    <input
      className="w-full rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-moon-500 focus:bg-white focus:outline-none"
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}

export default SignInTextField
