import { Instrument, Instruments } from "@/constants/instruments"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import React, { useState } from "react"
import InstrumentDropdownItem from "../dropdown/instrument/instrument-dropdown-item"

const InstrumentSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Instrument[]>([])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    const instruments = Object.values(Instruments)

    const searchResults = instruments.filter((instrument) =>
      instrument.instrumentName.toLowerCase().includes(value.toLowerCase())
    )

    setSearchResults(searchResults)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }
  const onSelected = (instrument: Instrument) => {
    console.log(instrument)
    setSearchTerm("")
    return true
  }

  const boldenText = (str: string, find: string) => {
    var re = new RegExp(find, "g")
    return str.replace(re, "<b>" + find + "</b>")
  }

  return (
    <div className="relative">
      <div className="h-12 ">
        <input
          type="text"
          placeholder="Enter an instrument..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex w-full rounded-lg  px-4 py-2 pr-10 outline outline-1 outline-gray-300  focus:outline-moon-300"
        />
        <button>
          <MagnifyingGlassIcon className="absolute right-0 top-0 mr-3 mt-3 h-5 w-5 text-gray-400" />
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full rounded-md bg-white shadow-md outline outline-1 outline-gray-300">
          <ul>
            {searchResults.map((instrumentItem: Instrument) => {
              return (
                <InstrumentDropdownItem
                  onClick={(instrument) => onSelected(instrument)}
                  instrument={instrumentItem}
                  textNode={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: boldenText(instrumentItem.instrumentName, searchTerm),
                      }}
                    ></div>
                  }
                  key={instrumentItem.instrumentName}
                />
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default InstrumentSearch
