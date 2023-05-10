import { FC, useEffect, useState } from "react"
import { ISuggestion } from "@/interfaces/suggestion"
import { getSuggestions } from "@/services/suggestion.service"
import SuggestionCard from "@/components/suggestion/suggestion-card"
import WithProtectedRoute from "@/components/protected-route/protected-route"
import { PlusIcon } from "@heroicons/react/24/solid"

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
        className={"flex flex-col items-center gap-6 lg:flex-row lg:flex-wrap lg:justify-center"}
      >
        {suggestions.map((suggestion) => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    </>
  )
}

export default WithProtectedRoute(Suggestions)
