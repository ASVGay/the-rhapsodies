import { Instrument, Instruments } from "@/constants/instruments"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import React, { useState } from "react"

const InstrumentSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Instrument[]>([])
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    const instruments = Object.values(Instruments)

    const searchResults = instruments.filter((instrument) =>
      instrument.instrumentName.toLowerCase().includes(value.toLowerCase())
    )

    setSearchResults(searchResults)
  }

  return (
    <div className="flex items-center">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Enter an instrument..."
          value={searchTerm}
          onFocus={(a) => {
            setIsFocused(true)
          }}
          onBlur={() => {
            setIsFocused(false)
          }}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex w-full rounded-lg border px-4 py-2 pr-10 focus:outline-moon-300"
        />
        <button>
          <MagnifyingGlassIcon className="absolute right-0 top-0 mr-3 mt-3 h-5 w-5 text-gray-400" />
        </button>
      </div>
      {isFocused && searchResults.length > 0 && (
        <div className="absolute z-10 mt-2 rounded-lg border border-gray-300 bg-white py-2 shadow-lg">
          {searchResults.map((result, index) => (
            <div key={index} className="flex items-center p-2">
              <span className="mr-2">{result.instrumentName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InstrumentSearch
