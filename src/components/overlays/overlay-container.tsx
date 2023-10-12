import React from "react"

interface OverlayContainerProps {
  animationActive: boolean
  children: React.ReactNode
  padding?: boolean
}

const OverlayContainer = ({ animationActive, children, padding = true }: OverlayContainerProps) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4 transition-all duration-300 
      ${animationActive ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`max-h-full min-h-fit rounded-lg bg-white ${
          padding ? "p-4" : "p-0"
        } shadow-md transition-all duration-300 sm:max 
        ${animationActive ? "translate-y-0" : "translate-y-[-24px]"}`}
      >
        {children}
      </div>
    </div>
  )
}

export default OverlayContainer
