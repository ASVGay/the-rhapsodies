import React from "react"
import {
  CheckCircleIcon,
  DocumentTextIcon,
  ListBulletIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline"

const ProgressBar = () => {
  return (
    <div className={"px-2 py-4 md:hidden"}>
      <div className="w-full after:mt-7 after:block after:h-0.5 after:bg-zinc-300">
        <ol className="grid grid-cols-3 font-medium text-zinc-300">
          <li className="relative flex justify-start text-moon-300">
            <span className="absolute -bottom-[2.5rem] start-0">
              <CheckCircleIcon
                viewBox={"2.25 2.25 19.5 19.5"}
                className={"h-6 w-6 bg-white text-moon-300"}
              />
            </span>

            <MusicalNoteIcon className={"h-6 w-6"} />
          </li>

          <li className="relative flex justify-center text-zinc-300">
            <span className="absolute -bottom-[2.5rem] left-1/2 -translate-x-1/2">
              <CheckCircleIcon
                viewBox={"2.25 2.25 19.5 19.5"}
                className={"h-6 w-6  bg-white text-zinc-300"}
              />
            </span>

            <ListBulletIcon className="mx-auto h-6 w-6 " />
          </li>

          <li className="relative flex justify-end">
            <span className="absolute -bottom-[2.5rem] end-0">
              <CheckCircleIcon
                viewBox={"2.25 2.25 19.5 19.5"}
                className={"h-6 w-6 bg-white text-zinc-300"}
              />
            </span>

            <DocumentTextIcon className={"h-6 w-6"} />
          </li>
        </ol>
      </div>
    </div>
  )
}

export default ProgressBar
