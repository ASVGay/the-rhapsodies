import React, { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { Instrument, Instruments } from "@/constants/instruments"
import InstrumentDropdownItem from "./instrument-dropdown-item"

interface InstrumentDropdownProps {
  onInstrumentSelected(instrument: Instrument): boolean
}

const InstrumentDropdown = ({ onInstrumentSelected }: InstrumentDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const onSelected = (instrument: Instrument) => {
    return onInstrumentSelected(instrument)
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
            {Object.keys(Instruments).map((key: string) => {
              return (
                <InstrumentDropdownItem
                  onClick={(instrument) => onSelected(instrument)}
                  instrument={Instruments[key]}
                  key={key}
                />
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default InstrumentDropdown
