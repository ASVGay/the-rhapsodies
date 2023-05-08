import { FC, useEffect, useState } from "react"
import { PlusIcon } from "@heroicons/react/24/solid"
import SuggestionCard from "@/components/cards/SuggestionCard"
import { getSuggestions } from "@/services/suggestions.service"
import { ISuggestion } from "@/interfaces/Suggestion"
import WithProtectedRoute from "@/components/protected-route/ProtectedRoute"

const Suggestions: FC = () => {
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([])

  useEffect(() => {
    getSuggestions()
      .then((suggestions) => setSuggestions(suggestions))
      .catch((error) => {
        // TODO Implement proper error handling
        console.error(error)
      })
  }, [])

  return (
    <>
      <div className={"flex justify-between p-4 pb-6 pt-6"}>
        <div className={"text-2xl font-semibold leading-8"}>Suggestions</div>
        <div>
          <PlusIcon className={"h-8 w-8 text-black"} onClick={() => {}} />
        </div>
      </div>

      <div
        className={
          "flex flex-col items-center gap-6 lg:flex-row lg:flex-wrap lg:justify-center"
        }
      >
        {suggestions.map((suggestion) => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    </>
  )
}

export default WithProtectedRoute(Suggestions)
