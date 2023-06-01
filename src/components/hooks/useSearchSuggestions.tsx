import {ChangeEvent, useState} from 'react';
import {Suggestion} from "@/types/database-types";

export const useSearchSuggestions = (suggestions: Suggestion[]) => {
    const [searchedSuggestions, setSearchedSuggestions] = useState<Suggestion[]>([]);
    const [noSearchResultText, setNoSearchResultText] = useState('');

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toLowerCase();
        const filteredSuggestions = suggestions.filter(({ title, motivation, artist }) => {
            return (
                title.toLowerCase().includes(input) ||
                motivation.toLowerCase().includes(input) ||
                artist.some((artist) => artist.toLowerCase().includes(input))
            );
        });

        if (filteredSuggestions.length === 0) {
            setNoSearchResultText(
                "It looks like the song you are looking for has not been suggested yet. Feel free to suggest the song!"
            );
        } else {
            setNoSearchResultText('');
        }

        setSearchedSuggestions(filteredSuggestions);
    };

    return { searchedSuggestions, noSearchResultText, handleSearch };
};