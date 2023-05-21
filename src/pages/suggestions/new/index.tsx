import React from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import ProgressBar from "@/components/new-suggestion/progress-bar/progress-bar"
import { useRouter } from "next/router"
import SongInformationArea from "@/components/new-suggestion/areas/song-information.area"
import InstrumentsArea from "@/components/new-suggestion/areas/instruments.area"
import ReviewArea from "@/components/new-suggestion/areas/review.area"
import { Area } from "@/constants/area"
import { useSelector } from "react-redux"
import { AppState } from "@/redux/store"

const NewSuggestion = () => {
  const router = useRouter()
  const activeArea = useSelector((state: AppState) => state.newSuggestion.activeArea)

  return (
    <div className={"page-wrapper"}>
      <div className={"flex justify-between"}>
        <div className={"page-header"}>New Suggestion</div>
        <XMarkIcon
          data-cy={"button-discard-new-suggestion"}
          className={"h-8 w-8 cursor-pointer text-zinc-400 hover:text-red-500"}
          onClick={() => router.push("/suggestions")}
        />
      </div>

      <div className={"mx-auto text-center lg:w-2/4"}>
        <ProgressBar />
        {activeArea == Area.SongInformation && <SongInformationArea />}
        {activeArea == Area.Instruments && <InstrumentsArea />}
        {activeArea == Area.Review && <ReviewArea />}
      </div>
    </div>
  )
}

export default NewSuggestion
