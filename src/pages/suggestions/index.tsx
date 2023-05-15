import { FC, useEffect, useState } from "react"
import { getSuggestions } from "@/services/suggestion.service"
import SuggestionCard from "@/components/suggestion/suggestion-card"
import { PlusIcon } from "@heroicons/react/24/solid"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { Suggestion } from "@/types/database-types"

const Suggestions: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [suggestions, setSuggestions] = useState<Suggestion[]>()
  const supabaseClient = useSupabaseClient<Database>()

  useEffect(() => {
    const fetchSuggestions = async () => {
      const { data, error } = await getSuggestions(supabaseClient)
      if (error) throw error
      if (data) {
        const dataSuggestions = data as Suggestion[]
        setSuggestions(dataSuggestions)
      }
      setIsLoading(false)
    }

    // TODO Implement error handling
    fetchSuggestions().catch(console.error)
  }, [supabaseClient])

  // TODO Show loader when loading
  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className={"py mx-auto px-4 pt-6"}>
      <div className={"flex justify-between pb-6"}>
        <div className={"text-2xl font-semibold leading-8"}>Suggestions</div>
        <div>
          <PlusIcon className={"h-8 w-8 text-black"} onClick={() => {}} />
        </div>
      </div>

      <div className={"flex flex-wrap justify-center gap-6"}>
        {suggestions?.map((suggestion) => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    </div>
  )
}

export default Suggestions
