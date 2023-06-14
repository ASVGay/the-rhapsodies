import React from "react"
import Image from "next/image"

interface TermsAndConditionsProps {
  onClose: () => void
}

const TermsAndConditions = ({ onClose }: TermsAndConditionsProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold">Terms and Conditions</h2>
        <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p className="mb-4">By accepting, you agree to our terms and conditions.</p>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={onClose}
        >
          Accept
        </button>
      </div>
    </div>
  )
}

export default TermsAndConditions
