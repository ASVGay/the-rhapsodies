import React, { useEffect, useState } from "react"
import OverlayContainer from "./overlay-container"
import { getOverlay } from "@/helpers/overlay.helper"
import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/error/error-message"
import { XMarkIcon } from "@heroicons/react/24/outline"

interface ScrollViewOverlayProps {
  onClose: () => void
}

interface FormInputs {
  comment: string
}

const AddCommentOverlay = ({ onClose }: ScrollViewOverlayProps) => {
  const [animationActive, setAnimationActive] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  useEffect(() => {
    setAnimationActive(true)
  }, [])

  const waitForTransition = () => {
    setAnimationActive(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const submitComment = ({ comment }: FormInputs) => {
    // todo submit comment
    waitForTransition()
  }

  const deleteComment = () => {
    const confirmed = confirm("Are you sure you want to delete your comment?")
    if (confirmed) {
      // todo delete comment
    }
  }
  return getOverlay(
    <OverlayContainer animationActive={animationActive}>
      <div data-cy={"add-comment-overlay"} className={"flex w-80 flex-col gap-6"}>
        <h2 className="flex justify-between text-xl font-bold">
          Comment
          <XMarkIcon
            className={"h-6 cursor-pointer text-zinc-500 hover:text-red-600"}
            onClick={waitForTransition}
          />
        </h2>
        <form onSubmit={handleSubmit(submitComment)}>
          <div className="input-container">
            {errors.comment && (
              <span className={"mb-1"}>
                <ErrorMessage
                  dataCy={"input-comment-error"}
                  message={"Please enter text if you would like to save your comment."}
                />
              </span>
            )}

            <label htmlFor="comment" className="sr-only">
              Type to add a comment to your attendance
            </label>

            <textarea
              data-cy={"input-comment"}
              className={`w-full rounded-lg p-3 shadow-sm outline outline-2 outline-gray-300 hover:outline-moon-300 focus:outline-moon-300 ${
                errors.comment && "outline-red-400"
              }`}
              rows={4}
              placeholder="Type to add a comment to your attendance"
              {...register("comment", {
                validate: (value) => !!value.trim(),
              })}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button className="btn error" onClick={deleteComment} type={"button"}>
              Delete
            </button>
            <button className="btn">Save</button>
          </div>
        </form>
      </div>
    </OverlayContainer>
  )
}

export default AddCommentOverlay
