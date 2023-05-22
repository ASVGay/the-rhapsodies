import React, { FC, useState } from "react"
import { MusicalNoteIcon, XMarkIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import ProgressionBar from "@/components/suggestion/progression-bar"
import Image from "next/image"
import { GetServerSideProps } from "next"
import {
  deleteDivision,
  getInstrumentImage,
  getSuggestion,
  insertDivision
} from "@/services/suggestion.service"
import { formatDistanceToNow } from "date-fns"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import {
  Division,
  DivisionDatabaseOperation,
  Suggestion,
  SuggestionInstrument
} from "@/types/database-types"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import ErrorPopup from "@/components/popups/error-popup"

interface SuggestionProps {
  suggestion: Suggestion
}

const SuggestionPage: FC<SuggestionProps> = (props: SuggestionProps) => {
  const [suggestion, setSuggestion] = useState<Suggestion>(props.suggestion)
  const [showUpdateError, setShowUpdateError] = useState<boolean>(false)
  const user = useUser()
  const supabase = useSupabaseClient<Database>()
  const uid = user?.id

  const updateSuggestion = () => {
    getSuggestion(supabase, suggestion.id)
      .then((response) => {
        response.data ? setSuggestion(response.data as Suggestion) : setShowUpdateError(true)
      })
      .catch(() => setShowUpdateError(true))
  }

  const selectInstrument = (suggestionInstrument: SuggestionInstrument) => {
    if (!uid) return

    const division: DivisionDatabaseOperation = {
      musician: uid,
      suggestion_instrument_id: suggestionInstrument.id
    }

    // TODO implement error handling and loading (so that users cant click when updating division)
    const exists = suggestionInstrument.division.some(({ musician }) => musician.id === uid)
    if (exists) {
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
      {suggestion && (
        <div className={"m-4 flex flex-col pt-2"} data-cy="suggestion">
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
              {suggestion.suggestion_instruments.map((suggestionInstrument: SuggestionInstrument) => {
                  const { instrument, division, id, description } = suggestionInstrument
                  return (
                    <div
                      key={id}
                      className={"flex cursor-pointer select-none"}
                      onClick={() => selectInstrument(suggestionInstrument)}
                    >
                      <Image
                        src={getInstrumentImage(instrument.image_source)}
                        alt={instrument.instrument_name.toString()}
                        width={64}
                        height={64}
                        className={`${division.length == 0 ? "opacity-30" : ""} mr-4 h-10 w-10`}
                        draggable={"false"}
                      />
                      <div>
                        <p>{instrument.instrument_name}</p>
                        <p className={"leading-5 text-zinc-400 md:max-w-[12rem]"}>{description}</p>
                        {division.length > 0 && (
                          <div className={`font-bold`} data-cy="division">{formatUsernames(division)}</div>
                        )}
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          </div>

          {showUpdateError && (
            <div className={"mt-6"}>
              <ErrorPopup
                text={"Failed to add or remove user to instrument."}
                closePopup={() => setShowUpdateError(false)}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context)
  const { params } = context
  try {
    let { data } = await getSuggestion(supabase, params?.suggestion as string)
    if (data == null) return { notFound: true }
    return { props: { suggestion: data } }
  } catch {
    return { notFound: true }
  }
}

export default SuggestionPage
