import React from "react"
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline"

const AddCommentButton = () => {
  return (
    <div className={"mb-2 text-center"}>
      <button
        type={"button"}
        className={
          "inline-flex gap-2 rounded-lg border border-sky-500 px-2 py-1 align-baseline text-sm text-sky-500 hover:bg-sky-500 hover:text-white focus:ring-2 focus:ring-sky-500"
        }
      >
        <ChatBubbleBottomCenterTextIcon className={"inline h-5"} />
        <span>Add comment</span>
      </button>
    </div>
  )
}

export default AddCommentButton
