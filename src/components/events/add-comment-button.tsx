import React, { useState } from "react"
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline"
import AddCommentOverlay from "@/components/overlays/add-comment.overlay"

interface AddCommentButtonProps {
  eventId: string
}

const AddCommentButton = ({ eventId }: AddCommentButtonProps) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  return (
    <div className={"mb-2 text-center"}>
      <button
        data-cy={"add-comment-button"}
        type={"button"}
        onClick={() => setShowOverlay(true)}
        className={
          "inline-flex gap-2 rounded-lg border border-sky-500 px-2 py-1 align-baseline text-sm text-sky-500 hover:bg-sky-500 hover:text-white focus:ring-2 focus:ring-sky-500"
        }
      >
        <ChatBubbleBottomCenterTextIcon className={"inline h-5"} />
        <span>Add comment</span>
      </button>
      {showOverlay && <AddCommentOverlay onClose={() => setShowOverlay(false)} eventId={eventId} />}
    </div>
  )
}

export default AddCommentButton
