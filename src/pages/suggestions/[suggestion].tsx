import React, { FC, useState } from "react"
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid"
import ProgressionBar from "@/components/suggestion/progression-bar"
import { GetServerSideProps } from "next"
import { deleteDivision, getSuggestion, insertDivision } from "@/services/suggestion.service"
import { formatDistanceToNow } from "date-fns"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { DivisionDatabaseOperation, Song, SongInstrument } from "@/types/database-types"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import ErrorPopup from "@/components/popups/error-popup"
import SuggestionLink from "@/components/suggestion/song-information/suggestion-link"
import { createSongFromSuggestion } from "@/services/song.service"
import { useRouter } from "next/router"
import Spinner from "@/components/utils/spinner"
import Instrument from "@/components/suggestion/instrument"
import SongPreviewImage from "@/components/images/song-preview-image"
import { toast } from "react-toastify"
import { TrashIcon } from "@heroicons/react/24/outline"
import DeleteSuggestionOverlay from "@/components/overlays/delete-suggestion.overlay"

interface SuggestionPageProps {
  suggestionFromNext: Song
  isEditable: boolean
}

const SuggestionPage: FC<SuggestionPageProps> = ({
  suggestionFromNext,
  isEditable,
}: SuggestionPageProps) => {
  const [suggestion, setSuggestion] = useState<Song>(suggestionFromNext)
  const [showSuggestionError, setShowSuggestionError] = useState<boolean>(false)
  const [showSongError, setShowSongError] = useState<boolean>(false)
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [instrumentsInUpdate, setInstrumentsInUpdate] = useState<SongInstrument[]>([])
  const [showDeleteOverlay, setShowDeleteOverlay] = useState<boolean>(false)
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const uid = user?.id
  const isAdmin = user?.app_metadata.claims_admin

  const router = useRouter()

  const updateSuggestion = async () => {
    await getSuggestion(supabase, suggestion.id)
      .then((response) => {
        response.data ? setSuggestion(response.data as Song) : setShowSuggestionError(true)
      })
      .catch(() => setShowSuggestionError(true))
  }

  const selectInstrument = async (songInstrument: SongInstrument) => {
    if (!uid || instrumentsInUpdate.length !== 0) return

    const division: DivisionDatabaseOperation = {
      musician: uid,
      song_instrument_id: songInstrument.id,
    }

    setInstrumentsInUpdate([songInstrument, ...instrumentsInUpdate])

    const exists = songInstrument.division.some(({ musician }) => musician.id === uid)
    if (exists) {
      await deleteDivision(supabase, division)
        .then(({ error }) => {
          if (error) throw new Error("Failed to remove you from instrument, please try again.")
        })
        .catch((error) => {
          toast.error(error.message)
        })
    } else {
      await insertDivision(supabase, division)
        .then(({ error }) => {
          if (error) throw new Error("Failed to remove you from instrument, please try again.")
        })
        .catch((error) => {
          toast.error(error.message)
        })
    }

    await updateSuggestion()
    setInstrumentsInUpdate(instrumentsInUpdate.filter((item) => item.id !== songInstrument.id))
  }

  const displayButton = (): boolean => {
    return isAdmin && suggestion.song_instruments.filter((i) => i.division.length == 0).length == 0
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
              {isAdmin && (
                <TrashIcon
                  className={"h-8 w-8 cursor-pointer text-red-500 hover:text-red-700"}
                  data-cy="suggestion-delete-icon"
                  onClick={() => setShowDeleteOverlay(true)}
                />
              )}
              {isEditable && (
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
              <SongPreviewImage previewUrl={suggestion.previewUrl} imageUrl={suggestion.image} />
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
                    onClick={async () => selectInstrument(instrument)}
                    loading={instrumentsInUpdate.includes(instrument)}
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
          {showSuggestionError && (
            <div className={"mt-6"}>
              <ErrorPopup
                text={"Failed to load suggestion. Please reload the page."}
                dataCy="suggestion-error"
                closePopup={() => setShowSuggestionError(false)}
              />
            </div>
          )}
          {showSongError && (
            <div className={"mt-6"}>
              <ErrorPopup
                text={"Failed to convert this suggestion to a repertoire song."}
                dataCy="repertoire-error"
                closePopup={() => setShowSongError(false)}
              />
            </div>
          )}
          {showDeleteOverlay && (
            <DeleteSuggestionOverlay
              onClose={() => setShowDeleteOverlay(false)}
              suggestion={suggestion}
            />
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
    return {
      props: {
        suggestionFromNext: data,
        isEditable: (data.author as { id: string }).id === session?.user.id,
      },
    }
  } catch {
    return { notFound: true }
  }
}

export default SuggestionPage
