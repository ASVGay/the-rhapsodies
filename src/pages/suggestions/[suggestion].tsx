import { FC, useState } from "react"
import { MusicalNoteIcon, XMarkIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import ProgressionBar from "@/components/suggestion/progression-bar"
import Image from "next/image"
import { GetServerSideProps } from "next"
import {
  deleteDivision,
  getInstrumentImage,
  getSuggestion,
  insertDivision,
} from "@/services/suggestion.service"
import { formatDistanceToNow } from "date-fns"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import {
  Division,
  DivisionDatabaseOperation,
  Suggestion,
  SuggestionInstrument,
  SuggestionType,
} from "@/types/database-types"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"

interface SuggestionProps {
  suggestion: SuggestionType
  error: PostgrestError | null
}

const SuggestionPage: FC<SuggestionProps> = (props: SuggestionProps) => {
  const [suggestion, setSuggestion] = useState<SuggestionType>(props.suggestion)
  const [error, setError] = useState<PostgrestError | null>(props.error)
  const user = useUser()
  const supabase = useSupabaseClient<Database>()
  const uid = user?.id

  function updateSuggestion() {
    getSuggestion(supabase, suggestion.id).then((response) => {
      const { data, error } = response
      if (error) setError(error)
      if (data) setSuggestion(data as Suggestion)
    })
  }

  const selectInstrument = (suggestionInstrument: SuggestionInstrument) => {
    if (uid) {
      const division: DivisionDatabaseOperation = {
        musician: uid,
        suggestion_instrument_id: suggestionInstrument.id,
      }
      // TODO implement error handling and loading (so that users cant click when updating division)
      if (suggestionInstrument.division.some(({ musician }) => musician.id === uid)) {
        deleteDivision(supabase, division).then(({ error }) => {
          if (error) alert(error.message)
          updateSuggestion()
        })
      } else {
        insertDivision(supabase, division).then(({ error }) => {
          if (error) alert(error.message)
          updateSuggestion()
        })
      }
    }
  }

  const formatUsernames = (divisions: Division[]) => {
    return divisions.map(({ musician }, index) => (
      <span key={musician.id} className={musician.id == uid ? "text-moon-500" : "text-zinc-400"}>
        {musician.display_name}
        {index != divisions.length - 1 && ", "}
      </span>
    ))
  }

  return (
    <>
      {/*TODO Implement Error handling*/}
      {error && <p>Something went wrong...</p>}
      {suggestion && (
        <div className={"m-4 flex flex-col pt-2"}>
          <div className={"flex"}>
            <div className={"w-full"}>
              <p className={"text-2xl leading-8"}>
                <b>Suggestion</b> by {(suggestion.author as { display_name: string }).display_name}
              </p>
              <p className={"text-sm font-medium leading-4 text-zinc-200"}>
                Posted {formatDistanceToNow(new Date(suggestion.created_at))} ago
              </p>
            </div>
            <Link href={"/suggestions"}>
              <XMarkIcon className={"h-8 w-8 text-zinc-400"} />
            </Link>
          </div>

          <div className={"m-2 md:ml-auto md:mr-auto md:max-w-sm"}>
            <p className={"m-4 text-center text-xl font-medium leading-7 text-moon-500"}>
              Song information
            </p>
            <div className={"flex"}>
              <MusicalNoteIcon className={"h-14 w-14 rounded-md bg-neutral-200 p-2 text-black"} />
              <div className={"ml-3"}>
                <p className={"line-clamp-1 font-bold"}>{suggestion.title}</p>
                <p className={"line-clamp-1"}>{suggestion.artist.join(", ")}</p>
              </div>
            </div>
            <p
              className={"mb-3 mt-3 line-clamp-3 h-12 text-sm font-medium leading-4 text-gray-400"}
            >
              {suggestion.motivation}
            </p>
          </div>

          <div className={"flex-col items-center md:flex"}>
            <p className={"text-center text-xl font-medium text-moon-500"}>Instruments</p>
            <div className={"m-4 md:w-2/3 lg:w-1/3"}>
              <ProgressionBar suggestionInstruments={suggestion.suggestion_instruments} />
            </div>

            <div className={"grid gap-6"}>
              {suggestion.suggestion_instruments.map((suggestionInstrument) => {
                const { instrument, division } = suggestionInstrument
                return (
                  <div
                    key={suggestionInstrument.id}
                    className={"flex cursor-pointer select-none"}
                    onClick={() => selectInstrument(suggestionInstrument)}
                  >
                    <Image
                      src={getInstrumentImage(supabase, instrument)}
                      alt={instrument.instrument_name.toString()}
                      width={64}
                      height={64}
                      className={`${division.length == 0 ? "opacity-30" : ""} mr-4 h-10 w-10`}
                      draggable={"false"}
                    />
                    <div>
                      <p>{instrument.instrument_name}</p>
                      <p className={"leading-5 text-zinc-400 md:max-w-[12rem]"}>
                        {suggestionInstrument.description}
                      </p>
                      {division.length > 0 && (
                        <div className={`font-bold`}>{formatUsernames(division)}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context)
  const { params } = context
  let { data, error } = await getSuggestion(supabase, params?.suggestion as string)
  return {
    props: { suggestion: data, error },
  }
}

export default SuggestionPage
