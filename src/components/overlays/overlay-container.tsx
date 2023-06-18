import React from "react"

interface OverlayContainerProps {
  animationActive: boolean
  children: React.ReactNode
}

const OverlayContainer = ({ animationActive, children }: OverlayContainerProps) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4 transition-all duration-300 
      ${animationActive ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`max-h-full min-h-fit rounded-lg bg-white p-4 shadow-md transition-all duration-300 sm:max-md:w-full 
        ${animationActive ? "translate-y-0" : "translate-y-[-24px]"}`}
      >
        {children}
      </div>
    </div>
  )
}

export default OverlayContainer
