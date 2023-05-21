import React from "react"

interface ButtonProps {
  text: string
  onClick: () => void
  disabled: () => boolean
}

const Button = ({ text, onClick, disabled }: ButtonProps) => {

  const styling = () => disabled() ? "bg-moon-100 cursor-not-allowed" : "bg-moon-500 cursor-pointer"

  const clickEvent = () => {
    if (!disabled()) {
      onClick()
    }
  }

  return (
    <div
      className={`text-white p-2 rounded-md w-[280px] ${styling()}`}
      onClick={() => clickEvent()}
    >
      {text}
    </div>
  )
}

export default Button