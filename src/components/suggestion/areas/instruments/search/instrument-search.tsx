import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import React, { useEffect, useRef, useState } from "react"
import InstrumentSearchItem from "./instrument-search-item"
import { Instrument } from "@/types/database-types"
import { boldSpecificTextSections } from "@/helpers/text.helper"

interface InstrumentSearchProps {
  instruments: Instrument[]
  onInstrumentSelected(instrument: Instrument): void
}

const InstrumentSearch = ({ instruments, onInstrumentSelected }: InstrumentSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Instrument[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const searchRef = useRef(null)

  const handleSearch = (value: string) => {
    setSearchTerm(value)

    const searchResults = instruments.filter((instruments) =>
      instruments.instrument_name.toLowerCase().includes(value.toLowerCase()),
    )

    setSearchResults(searchResults)
  }

  /**
   * Checks if anything other than the search or list items are selected
   * */
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (searchRef.current) return
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsSearchFocused(false)
    }
  }

  /**
   * Add click events to register for both Desktop and Mobile devices.
   */
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearchBlur = () => {
    // Use setTimeout to allow time for a click event on the list item to be registered
    setTimeout(() => {
      setIsSearchFocused(false)
    }, 300)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
  }

  const onSelected = (instrument: Instrument) => {
    onInstrumentSelected(instrument)
    clearSearch()
    return true
  }

  return (
    <div className="relative">
      <div className="h-12 ">
        <input
          type="text"
          placeholder="Enter an instrument..."
          value={searchTerm}
          data-cy="search-instrument-input"
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={handleSearchBlur}
          ref={searchRef}
          className="flex w-full rounded-lg px-4 py-2 pr-10 outline-solid outline-2 outline-gray-300 hover:outline-moon-300 focus:outline-moon-300"
        />
        {searchTerm ? (
          <XMarkIcon
            onClick={() => clearSearch()}
            data-cy={"instrument-search-close-button"}
            className="absolute right-0 top-0 mr-3 mt-3 h-5 w-5 cursor-pointer text-gray-500"
          />
        ) : (
          <MagnifyingGlassIcon className="absolute right-0 top-0 mr-3 mt-3 h-5 w-5 text-gray-500" />
        )}
      </div>
      {isSearchFocused && searchTerm.length !== 0 && searchResults.length > 0 && (
        <div className="absolute z-10 w-full rounded-md bg-white shadow-md outline-solid outline-1 outline-gray-300">
          <ul ref={listRef} data-cy="instrument-search-list">
            {searchResults.map((instrumentItem: Instrument) => {
              return (
                <InstrumentSearchItem
                  onClick={(instrument) => onSelected(instrument)}
                  instrument={instrumentItem}
                  textNode={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: boldSpecificTextSections(
                          instrumentItem.instrument_name,
                          searchTerm,
                        ),
                      }}
                    ></div>
                  }
                  key={instrumentItem.instrument_name}
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
