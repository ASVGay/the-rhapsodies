import { Instrument, Instruments } from "@/constants/instruments"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import React, { useState } from "react"
import InstrumentSearchItem from "./instrument-search-item"

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
    setSearchResults([])
  }

  const onSelected = (instrument: Instrument) => {
    console.log(instrument)
    clearSearch()
    return true
  }

  const boldSpecificTextSections = (str: string, find: string) => {
    var re = new RegExp(find, "g")

    const newString = str.replace(re, "<b>" + find + "</b>")

    //if the first occurrence is the bold tag, Capitalize the letter inside that bold tag.
    if (newString.charAt(0) === "<")
      return newString.replace(
        `<b>${newString.charAt(3)}`,
        `<b>${newString.charAt(3).toUpperCase()}`
      )

    return newString
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
                <InstrumentSearchItem
                  onClick={(instrument) => onSelected(instrument)}
                  instrument={instrumentItem}
                  textNode={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: boldSpecificTextSections(instrumentItem.instrumentName, searchTerm),
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
