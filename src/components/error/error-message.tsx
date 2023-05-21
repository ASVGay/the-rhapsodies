import React from "react"

interface ErrorMessageProps {
  message?: string
  dataCy: string
}
const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <span data-cy={props.dataCy} className={"text-xs text-red-600"}>
      ⚠ {props.message}
    </span>
  )
}

export default ErrorMessage
