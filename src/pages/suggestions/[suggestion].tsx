import React, { FC, useEffect, useState } from "react"
import { MusicalNoteIcon, XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid"
import ProgressionBar from "@/components/suggestion/progression-bar"
import { GetServerSideProps } from "next"
import { deleteDivision, getSuggestion, insertDivision } from "@/services/suggestion.service"
import { formatDistanceToNow } from "date-fns"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { DivisionDatabaseOperation, SongInstrument, Suggestion } from "@/types/database-types"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import ErrorPopup from "@/components/popups/error-popup"
import SuggestionLink from "@/components/suggestion/song-information/suggestion-link"
import { UserAppMetadata } from "@supabase/gotrue-js"
import { createSongFromSuggestion } from "@/services/song.service"
import { useRouter } from "next/router"
import Spinner from "@/components/utils/spinner"
import Instrument from "@/components/suggestion/instrument"

interface SuggestionProps {
  suggestion: Suggestion
  isEditable: boolean
}

const SuggestionPage: FC<SuggestionProps> = (props: SuggestionProps) => {
  const [suggestion, setSuggestion] = useState<Suggestion>(props.suggestion)
  const [showUpdateError, setShowUpdateError] = useState<boolean>(false)
  const [showSongError, setShowSongError] = useState<boolean>(false)
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [roles, setRoles] = useState<UserAppMetadata>()
  const user = useUser()
  const supabase = useSupabaseClient<Database>()
  const uid = user?.id
  const router = useRouter()

  useEffect(() => {
    if (supabase) {
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setRoles(session?.user?.app_metadata)
        }
      })
    }
  }, [supabase])

  const updateSuggestion = () => {
    getSuggestion(supabase, suggestion.id)
      .then((response) => {
        response.data ? setSuggestion(response.data as Suggestion) : setShowUpdateError(true)
      })
      .catch(() => setShowUpdateError(true))
  }

  const selectInstrument = (songInstrument: SongInstrument) => {
    if (!uid) return

    const division: DivisionDatabaseOperation = {
      musician: uid,
      song_instrument_id: songInstrument.id,
    }

    // TODO implement error handling and loading (so that users cant click when updating division)
    const exists = songInstrument.division.some(({ musician }) => musician.id === uid)
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

  const displayButton = (): boolean => {
    return (
      roles?.["claims_admin"] &&
      suggestion.song_instruments.filter((i) => i.division.length == 0).length == 0
    )
  }

  const addToRepertoire = () => {
    setShowSpinner(true)
    createSongFromSuggestion(supabase, suggestion.id)
      .then(() => router.push("/repertoire"))
      .catch(() => setShowSongError(true))
      .finally(() => setShowSpinner(false))
  }

  return (
    <>
      {showSpinner ? (
        <div className={"h-[75vh] text-center"}>
          <Spinner size={10} />
        </div>
      ) : (
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
            <div className={"flex flex-row gap-2"}>
              {props.isEditable && (
                <PencilSquareIcon
                  className={"h-8 w-8 cursor-pointer text-black hover:text-zinc-400"}
                  data-cy="suggestion-edit-icon"
                  onClick={() => router.push(`/suggestions/edit/${suggestion.id}`)}
                />
              )}
              <XMarkIcon
                className={"h-8 w-8 cursor-pointer text-black hover:text-zinc-400"}
                data-cy="suggestion-x-icon"
                onClick={() => router.push("/suggestions")}
              />
            </div>
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
            <p className={"mb-3 mt-3 text-sm font-medium leading-4 text-gray-400"}>
              {suggestion.motivation}
            </p>
            <SuggestionLink link={suggestion.link} />
          </div>

          <div className={"flex-col items-center md:flex"}>
            <p className={"text-center text-xl font-medium text-moon-500"}>Instruments</p>
            <div className={"m-4 md:w-2/3 lg:w-1/3"}>
              <ProgressionBar suggestionInstruments={suggestion.song_instruments} />
            </div>

            <div className={"grid gap-6"}>
              {suggestion.song_instruments.map((instrument) => {
                return (
                  <Instrument
                    key={instrument.id}
                    imageURL={instrument.instrument.image_source}
                    name={instrument.instrument.instrument_name}
                    division={instrument.division}
                    description={instrument.description}
                    uid={uid}
                    onclick={() => selectInstrument(instrument)}
                  />
                )
              })}
            </div>
          </div>

          {displayButton() && (
            <div className={"m-8 flex justify-center"}>
              <button className={"btn toRepertoire"} onClick={() => addToRepertoire()}>
                Move to repertoire
              </button>
            </div>
          )}

          {showUpdateError && (
            <div className={"mt-6"}>
              <ErrorPopup
                text={"Failed to add or remove user to instrument."}
                closePopup={() => setShowUpdateError(false)}
              />
            </div>
          )}

          {showSongError && (
            <div className={"mt-6"}>
              <ErrorPopup
                text={"Failed to convert this suggestion to a repertoire song."}
                closePopup={() => setShowSongError(false)}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createPagesServerClient(context)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { params } = context
  try {
    let { data } = await getSuggestion(supabase, params?.suggestion as string)

    if (data == null) return { notFound: true }
    console.log(data.author + " | " + session?.user.id)
    return {
      props: {
        suggestion: data,
        isEditable: (data.author as { id: string }).id === session?.user.id,
      },
    }
  } catch {
    return { notFound: true }
  }
}

export default SuggestionPage
