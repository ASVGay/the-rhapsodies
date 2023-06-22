import React from "react"
import { CheckCircleIcon } from "@heroicons/react/24/outline"

interface ProgressBarCheckBoxProps {
  positioning: string
}

const ProgressBarCheckBox = ({ positioning }: ProgressBarCheckBoxProps) => {
  return (
    <CheckCircleIcon
      viewBox={"2.25 2.25 19.5 19.5"}
      className={`absolute -bottom-10 ${positioning} h-6 w-6 bg-white group-hover:text-moon-500`}
    />
  )
}

export default ProgressBarCheckBox
