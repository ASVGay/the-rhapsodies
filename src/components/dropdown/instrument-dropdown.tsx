import React, { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { Instruments } from "@/constants/instruments"

interface InstrumentDropdownProps {}

const InstrumentDropdown = ({}: InstrumentDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex w-full items-center justify-between rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Select a instrument
        {isOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-md">
          <ul>
            <li className="flex items-center p-4 hover:bg-gray-100">
              <svg className="mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                {/* Replace this with your desired icon */}
                <path
                  fillRule="evenodd"
                  d="M10 3.414l5.293 5.293a1 1 0 01-1.414 1.414L10 6.414 5.707 10.707a1 1 0 11-1.414-1.414L10 3.414z"
                  clipRule="evenodd"
                />
              </svg>
              Option 1
            </li>
            <li className="flex items-center p-4 hover:bg-gray-100">
              <svg className="mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                {/* Replace this with your desired icon */}
                <path
                  fillRule="evenodd"
                  d="M10 3.414l5.293 5.293a1 1 0 01-1.414 1.414L10 6.414 5.707 10.707a1 1 0 11-1.414-1.414L10 3.414z"
                  clipRule="evenodd"
                />
              </svg>
              Option 2
            </li>
            <li className="flex items-center p-4 hover:bg-gray-100">
              <svg className="mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                {/* Replace this with your desired icon */}
                <path
                  fillRule="evenodd"
                  d="M10 3.414l5.293 5.293a1 1 0 01-1.414 1.414L10 6.414 5.707 10.707a1 1 0 11-1.414-1.414L10 3.414z"
                  clipRule="evenodd"
                />
              </svg>
              Option 3
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default InstrumentDropdown
