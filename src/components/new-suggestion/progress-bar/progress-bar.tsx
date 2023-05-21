import React from "react"
import { DocumentTextIcon, ListBulletIcon, MusicalNoteIcon } from "@heroicons/react/24/outline"
import ProgressBarCheckBox from "@/components/new-suggestion/progress-bar/progress-bar-check-box"
import { Area } from "@/constants/area"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "@/redux/store"
import { setActiveArea } from "@/redux/slices/new-suggestion.slice"

const ProgressBar = () => {
  const dispatch: AppDispatch = useDispatch()
  const activeArea = useSelector((state: AppState) => state.newSuggestion.activeArea)

  function colorArea(area: string) {
    return area === activeArea ? "text-moon-300" : "text-zinc-300"
  }

  return (
    <div
      className={"flex justify-center px-2 py-4"}
      data-cy={"progress-bar"}
      data-active-area={activeArea}
    >
      <div className="w-full after:mt-7 after:block after:h-0.5 after:bg-zinc-300">
        <ol className="grid grid-cols-3 font-medium text-zinc-300 ">
          <li
            data-cy={"new-suggestion-progress-bar-song-information"}
            className={`progress-bar-icon group justify-start ${colorArea(Area.SongInformation)}`}
            onClick={() => dispatch(setActiveArea(Area.SongInformation))}
          >
            <MusicalNoteIcon className={"h-6 w-6"} />
            <ProgressBarCheckBox positioning={"start-0"} />
          </li>

          <li
            data-cy={"new-suggestion-progress-bar-instruments"}
            className={`progress-bar-icon group justify-center ${colorArea(Area.Instruments)}`}
            onClick={() => dispatch(setActiveArea(Area.Instruments))}
          >
            <ListBulletIcon className="mx-auto h-6 w-6" />
            <ProgressBarCheckBox positioning={"left-1/2 -translate-x-1/2"} />
          </li>

          <li
            data-cy={"new-suggestion-progress-bar-review"}
            className={`progress-bar-icon group justify-end ${colorArea(Area.Review)}`}
            onClick={() => dispatch(setActiveArea(Area.Review))}
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
