import React, { useEffect, useState } from "react"

interface TermsAndConditionsProps {
  onClose: () => void
}

const TermsAndConditions = ({ onClose }: TermsAndConditionsProps) => {
  const [animationActive, setAnimationActive] = useState<boolean>(false)
  useEffect(() => {
    setAnimationActive(true)
  }, [])

  const waitForTransition = () => {
    setAnimationActive(false)
    setTimeout(() => {
      console.log("call")
      onClose()
    }, 300)
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 transition-all duration-300  ${
        animationActive ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`min-h-fit w-80 rounded-lg bg-white p-4 shadow-md transition-all duration-300 
        ${animationActive ? "translate-y-0 opacity-100" : "translate-y-[-24px] opacity-0"}`}
      >
        <h2 className="mb-4 text-xl font-bold">Terms and Conditions</h2>
        <div className="mb-2 max-h-[500px] overflow-scroll overflow-x-hidden">
          <p className="mb-2">{`These Terms and Conditions ("Agreement") govern your access to and use of the 
        The Rhapsodies mobile application ("App") provided by ASVGay ("Company"). By using the App, you agree to be bound by this Agreement. 
        If you do not agree with any part of this Agreement, you must not use the App.`}</p>
          <h2 className="text-l mb-2 font-bold">Privacy</h2>
          <p className="mb-2">{`These Terms and Conditions ("Agreement") govern your access to and use of the 
        The Rhapsodies mobile application ("App") provided by ASVGay ("Company"). By using the App, you agree to be bound by this Agreement. 
        If you do not agree with any part of this Agreement, you must not use the App.`}</p>
          <p className="mb-2">{`These Terms and Conditions ("Agreement") govern your access to and use of the 
        The Rhapsodies mobile application ("App") provided by ASVGay ("Company"). By using the App, you agree to be bound by this Agreement. 
        If you do not agree with any part of this Agreement, you must not use the App.`}</p>
        </div>
        <p className="mb-2">By accepting, you agree to our terms and conditions.</p>

        <div className="flex justify-end">
          <button className="btn" onClick={waitForTransition}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditions
