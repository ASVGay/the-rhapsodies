import { FC, useEffect, useState } from "react"
import { PlusIcon } from "@heroicons/react/24/solid"
import SuggestionCard from "@/components/cards/suggestion-card"
import { getSuggestions } from "@/services/suggestion.service"
import { ISuggestion } from "@/interfaces/suggestion"
import WithProtectedRoute from "@/components/protected-route/protected-route"
import { useRouter } from "next/router"

const Suggestions: FC = () => {
  const router = useRouter()
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
    <div className={"page-wrapper"}>
      <div className={"flex justify-between"}>
        <div className={"page-header"}>Suggestions</div>
        <PlusIcon
          className={"h-8 w-8 cursor-pointer text-black hover:text-zinc-400"}
          onClick={() => router.push("/suggestions/new")}
        />
      </div>

      <div
        className={"flex flex-col items-center gap-6 lg:flex-row lg:flex-wrap lg:justify-center"}
      >
        {suggestions.map((suggestion) => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    </div>
  )
}

export default WithProtectedRoute(Suggestions)
