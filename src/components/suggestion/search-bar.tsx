import React, {ChangeEvent, FormEventHandler, RefObject} from 'react';
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";


interface SearchBarProps {
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    inputRef: RefObject<HTMLInputElement>;
    showSearchBar: boolean;
    setShowSearchBar: (show: boolean) => void;
}
const SearchBar = ({handleSearch, inputRef, showSearchBar, setShowSearchBar}: SearchBarProps) => {
    return (
        <div
            className={"flex items-baseline justify-between gap-4"}
            style={{display: showSearchBar ? "flex" : "none"}}
        >
            <div className="relative mb-4 h-12 w-full">
                <input
                    onChange={handleSearch}
                    ref={inputRef}
                    type="text"
                    placeholder="Enter a song..."
                    data-cy="search-suggestion-input"
                    className="w-full rounded-lg px-4 py-2 pr-10 outline outline-2 outline-gray-300 hover:outline-moon-300 focus:outline-moon-300"
                ></input>
                <MagnifyingGlassIcon className="absolute right-0 top-0 mr-3 mt-3 h-5 w-5 cursor-pointer text-gray-500"/>
            </div>
            <div className={"flex"}>
          <span className={"cursor-pointer text-moon-300"} onClick={() => setShowSearchBar(false)}>
            Cancel
          </span>
            </div>
        </div>
    );
};

export default SearchBar;