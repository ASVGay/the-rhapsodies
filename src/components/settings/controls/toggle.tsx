import React from "react"

interface ToggleProps {
  text: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
  disabled: boolean
  dataCy: string
}

const Toggle = ({ text, handleChange, checked, disabled, dataCy }: ToggleProps) => {
  return (
    <div
      data-cy={dataCy}
      className={`inline-flex w-full items-center justify-between 
      ${disabled && "pointer-events-none select-none opacity-20"}`}
    >
      <p>{text}</p>
      <label className="relative h-8 w-14 cursor-pointer">
        <input
          disabled={disabled}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={handleChange}
        />
        <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>
        <span className="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
      </label>
    </div>
  )
}

export default Toggle
