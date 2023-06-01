import { useEffect, useState } from 'react';
import {getSuggestions} from "@/services/suggestion.service";
import {Suggestion} from "@/types/database-types";
import {SupabaseClient} from "@supabase/supabase-js";

const useSuggestions = (supabaseClient: SupabaseClient) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSpinner, setShowSpinner] = useState(true);
    const [showLoadingError, setShowLoadingError] = useState(false);
    const [noSuggestionsText, setNoSuggestionsText] = useState("");

    useEffect(() => {
        setShowSpinner(true);
        getSuggestions(supabaseClient)
            .then((response) => {
                if (response.error) {
                    setShowLoadingError(true);
                    return;
                }

                if (response.data?.length > 0) {
                    setSuggestions(response.data as Suggestion[]);
                    setNoSuggestionsText("");
                } else {
                    setNoSuggestionsText(
                        "Looks like there are no suggestions made yet! Feel free to start adding them."
                    );
                }
            })
            .catch(() => {
                setShowLoadingError(true);
            })
            .finally(() => {
                setShowSpinner(false);
            });
    }, [supabaseClient]);

    return {
        suggestions,
        showSpinner,
        showLoadingError,
        noSuggestionsText,
        setNoSuggestionsText,
        setShowLoadingError
    };
};

export default useSuggestions;