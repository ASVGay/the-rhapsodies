import { useSelector } from "react-redux"
import { AppState } from "@/redux/store"
import Image from "next/image"
import { getInstrumentImage } from "@/services/suggestion.service"
import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import { Instrument } from "@/interfaces/new-suggestion"
import ButtonLink from "@/components/button/buttonLink"

const Review = () => {
  const suggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)

  return (
    <div>
      {/*todo responsiveness*/}
      <div className={"m-2 md:ml-auto md:mr-auto md:max-w-sm"}>
        <div className={"flex"}>
          <MusicalNoteIcon className={"h-14 w-14 rounded-md bg-neutral-200 p-2 text-black"} />
          <div className={"ml-3"}>
            <p className={"line-clamp-1 font-bold"}>{suggestion.title}</p>
            <p className={"line-clamp-1"}>{suggestion.artist.join(", ")}</p>
          </div>
        </div>
        <p className={"mb-3 mt-3 line-clamp-3 h-12 text-sm font-medium leading-4 text-gray-400"}>
          {suggestion.motivation}
        </p>
      </div>

      {/*todo: instruments*/}
      <p className={"text-center text-lg font-medium text-moon-200"}>Instruments</p>
      <div className={"grid gap-6 mb-6"}>
        {suggestion.instruments.map(({ id, note }: Instrument) => {
            return (
              <div key={id} className={"flex select-none"}>
                <Image
                  src={getInstrumentImage("")}
                  alt={""}
                  width={64}
                  height={64}
                  className={"mr-4 h-10 w-10"}
                  draggable={"false"}
                />
                <div>
                  <p>{""}</p>
                  <p className={"leading-5 text-zinc-400 md:max-w-[12rem]"}>{note}</p>
                </div>
              </div>
            )
          }
        )}
      </div>

      {/*todo save suggestion*/}
      <div className={"flex justify-center"}>
        <ButtonLink href={"/suggestions"} text={"Submit Suggestion"} onClick={() => {}}/>
      </div>

    </div>
  )
}

export default Review