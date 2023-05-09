import React, { useState } from "react"
import { DocumentTextIcon, ListBulletIcon, MusicalNoteIcon } from "@heroicons/react/24/outline"
import ProgressBarCheckBox from "@/components/new-suggestion/progress-bar/progress-bar-check-box"

export enum Area {
  SongInformation = "song-information",
  Instruments = "instruments",
  Review = "review",
}

const ProgressBar = () => {
  const [activeArea, setActiveArea] = useState(Area.SongInformation)

  function colorArea(area: string) {
    return area === activeArea ? "text-moon-300" : "text-zinc-300"
  }

  return (
    <div className={"flex justify-center px-2 py-4"}>
      <div className="w-full after:mt-7 after:block after:h-0.5 after:bg-zinc-300 lg:w-2/4">
        <ol className="grid grid-cols-3 font-medium text-zinc-300 ">
          <li
            className={`progress-bar-icon group justify-start ${colorArea(Area.SongInformation)}`}
            onClick={() => setActiveArea(Area.SongInformation)}
          >
            <MusicalNoteIcon className={"h-6 w-6"} />
            <ProgressBarCheckBox positioning={"start-0"} />
          </li>

          <li
            className={`progress-bar-icon group justify-center ${colorArea(Area.Instruments)}`}
            onClick={() => setActiveArea(Area.Instruments)}
          >
            <ListBulletIcon className="mx-auto h-6 w-6" />
            <ProgressBarCheckBox positioning={"left-1/2 -translate-x-1/2"} />
          </li>

          <li
            className={`progress-bar-icon group justify-end ${colorArea(Area.Review)}`}
            onClick={() => setActiveArea(Area.Review)}
          >
            <DocumentTextIcon className={"h-6 w-6"} />
            <ProgressBarCheckBox positioning={"end-0"} />
          </li>
        </ol>
      </div>
    </div>
  )
}

export default ProgressBar
