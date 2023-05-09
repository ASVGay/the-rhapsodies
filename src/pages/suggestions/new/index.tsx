import React, { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import ProgressBar from "@/components/new-suggestion/progress-bar/progress-bar"
import { useRouter } from "next/router"
import SongInformationArea from "@/components/new-suggestion/areas/song-information.area"
import InstrumentsArea from "@/components/new-suggestion/areas/instruments.area"
import ReviewArea from "@/components/new-suggestion/areas/review.area"
import { Area } from "@/constants/area"

const NewSuggestion = () => {
  const router = useRouter()
  const [activeArea, setActiveArea] = useState<Area>(Area.SongInformation)

  return (
    <div className={"page-wrapper"}>
      <div className={"flex justify-between"}>
        <div className={"page-header"}>New Suggestion</div>
        <XMarkIcon
          className={"h-8 w-8 cursor-pointer text-zinc-400 hover:text-red-500"}
          onClick={() => router.push("/suggestions")}
        />
      </div>

      <div className={"mx-auto text-center lg:w-2/4"}>
        <ProgressBar activeArea={activeArea} setActiveArea={setActiveArea} />
        <SongInformationArea show={activeArea == Area.SongInformation} />
        <InstrumentsArea show={activeArea == Area.Instruments} />
        <ReviewArea show={activeArea == Area.Review} />
      </div>
    </div>
  )
}

export default NewSuggestion
