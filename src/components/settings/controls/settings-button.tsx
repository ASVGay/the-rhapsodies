import { ChevronRightIcon } from "@heroicons/react/24/outline"
import React from "react"

interface NotificationButtonProps {
  dataCy?: string
  disabled: boolean
  onClick: () => void
  text: string
}

const SettingsButton = ({ dataCy, disabled, onClick, text }: NotificationButtonProps) => (
  <button
    type={"button"}
    className={`group flex w-full items-center justify-between hover:cursor-pointer disabled:cursor-not-allowed 
    ${disabled && "pointer-events-none select-none opacity-20"}`}
    data-cy={dataCy}
    disabled={disabled}
    onClick={onClick}
  >
    <p>{text}</p>
    <ChevronRightIcon height={16} width={16} className={"group-hover:text-moon-600"} />
  </button>
)

export default SettingsButton
