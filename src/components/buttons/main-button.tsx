import React from "react"

interface MainButtonProps {
  onClick: () => void
  text: string
  dataCy?: string
}

const MainButton = (props: MainButtonProps) => {
  return (
    <button
      className="rounded bg-moon-500 px-4 py-2 font-bold text-white hover:bg-moon-300"
      onClick={props.onClick}
      data-cy={props.dataCy}
    >
      {props.text}
    </button>
  )
}

export default MainButton
