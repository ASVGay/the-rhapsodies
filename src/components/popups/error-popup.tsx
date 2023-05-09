import React from "react"
import Image from "next/image"

interface ErrorPopupProps {
  text: string
  closePopup: () => void
}
const ErrorPopup = (props: ErrorPopupProps) => {
  return (
    <div
      className="relative flex justify-between rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
    >
      <strong className="font-bold">{props.text}</strong>
      <Image
        onClick={props.closePopup}
        width={16}
        height={16}
        alt={"close icon"}
        src={"/icons/close_icon.svg"}
      />
    </div>
  )
}

export default ErrorPopup
