import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/redux/store"
import Image from "next/image"
import { getInstrumentImage, insertSuggestion, insertSuggestionInstruments } from "@/services/suggestion.service"
import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import { NewInstrument } from "@/interfaces/new-suggestion"
import Button from "@/components/button/button"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { initialState, setActiveArea, updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"
import { Area } from "@/constants/area"
import { useRouter } from "next/router"

const Review = () => {
  const supabase = useSupabaseClient<Database>()
  const suggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useUser()

  const saveSuggestion = () => {
    insertSuggestion(supabase, suggestion, user!.id)
      .then((response) => {
        if (response.error) {
          handleError()
          return
        }
      })
      .catch(() => handleError())

    insertSuggestionInstruments(supabase, suggestion.instruments, user!.id)
      .then((response) => {
        if (response.error) {
          handleError()
          return
        }

        dispatch(updateNewSuggestion(initialState.suggestion))
        dispatch(setActiveArea(Area.SongInformation))
        router.push("/suggestions")
      })
      .catch(() => handleError())
  }

  const handleError = () => {
    //TODO: error-handeling
  }

  const requiredDataIsPresent = () => {
    return suggestion.artist.length > 0
      && suggestion.motivation.length > 0
      && suggestion.title.length > 0
      && suggestion.instruments.length > 0
  }

  return (
    <div>

      <div className={"m-2 md:ml-auto md:mr-auto md:max-w-sm"}>
        <div className={"flex"}>
          <MusicalNoteIcon className={"h-14 w-14 rounded-md bg-neutral-200 p-2 text-black"} />
          <div className={"ml-3"}>
            {suggestion.title.length > 0
              ? <p className={"line-clamp-1 font-bold"}>{suggestion.title}</p>
              : <p className={"text-zinc-300"}>Unknown</p>
            }
            {suggestion.artist.length > 0
              ? <p className={"line-clamp-1"}>{suggestion.artist.join(", ")}</p>
              : <p className={"text-zinc-300"}>Unknown</p>
            }
          </div>
        </div>
        <p className={"mb-3 mt-3 line-clamp-3 h-12 text-sm leading-4 text-gray-400"}>
          {suggestion.motivation.length > 0
            ? suggestion.motivation
            : "Please provide a description of why you'd like to suggest this song."
          }
        </p>
      </div>

      <p className={"text-center text-lg font-medium text-moon-200 mb-4"}>Instruments</p>
      <div className={"grid gap-6 mb-12 justify-center"}>
        {suggestion.instruments.map(({ id, name, image, note }: NewInstrument) => {
            return (
              <div key={id} className={"flex select-none"}>
                <Image
                  src={getInstrumentImage(image)}
                  alt={""}
                  width={64}
                  height={64}
                  className={"mr-4 h-10 w-10"}
                  draggable={"false"}
                />
                <div>
                  <p className={"text-left"}>{name}</p>
                  <p className={"leading-5 text-zinc-400 md:max-w-[12rem]"}>{note}</p>
                </div>
              </div>
            )
          }
        )}
        {suggestion.instruments.length == 0 && (
          <p className={"text-sm leading-4 text-gray-400"}>
            No instruments have been selected yet..
          </p>
        )}
      </div>

      <div className={`flex justify-center`}>
        <Button text={"Submit Suggestion"} onClick={() => saveSuggestion()} disabled={() => !requiredDataIsPresent()} />
      </div>

    </div>
  )
}

export default Review