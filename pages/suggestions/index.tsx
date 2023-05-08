import { FC } from "react"
import { PlusIcon } from "@heroicons/react/24/solid"

const Suggestions: FC = () => {
  return (
    <>
      <div className={"flex justify-between p-4 pb-6 pt-6"}>
        <div className={"text-2xl font-semibold leading-8"}>Suggestions</div>
        <div>
          <PlusIcon className={"h-8 w-8 text-black"} onClick={() => {}} />
        </div>
      </div>
    </>
  )
}

export default Suggestions
