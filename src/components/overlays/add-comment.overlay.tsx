import React, { useEffect, useState } from "react"
import OverlayContainer from "./overlay-container"
import { getOverlay } from "@/helpers/overlay.helper"
import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/error/error-message"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { setComment } from "@/services/event.service"
import { Database } from "@/types/database"
import { toast } from "react-toastify"
import SpinnerStripes from "@/components/utils/spinner-stripes"

interface ScrollViewOverlayProps {
  onClose: (updated: boolean) => void
  eventId: string
  commentValue: string | null
}

interface FormInputs {
  comment: string
}

const AddCommentOverlay = ({ onClose, eventId, commentValue }: ScrollViewOverlayProps) => {
  const uid = useUser()?.id
  const supabase = useSupabaseClient<Database>()
  const [overlayIsOpen, setOverlayIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues: { comment: commentValue ?? "" } })

  const inputValue = watch("comment")

  useEffect(() => setOverlayIsOpen(true), [])

  const waitForTransition = (updated: boolean) => {
    setOverlayIsOpen(false)
    setTimeout(() => onClose(updated), 300)
  }

  function updateComment(comment: string | null, deleted?: true) {
    if (uid) {
      setIsLoading(true)
      setComment(supabase, eventId, uid, comment).then(({ error }) => {
        if (error)
          toast.error(
            `Something went wrong while ${deleted ? "deleting" : "saving"} 
            your comment. Please try again.`
          )
        else {
          toast.success(`Comment successfully ${deleted ? "deleted" : "saved"}!`)
          waitForTransition(true)
        }
        setIsLoading(false)
      })
    }
  }

  const submitComment = ({ comment }: FormInputs) => updateComment(comment)

  const deleteComment = () => {
    const confirmed = confirm("Are you sure you want to delete your comment?")
    if (confirmed) updateComment(null, true)
  }

  return getOverlay(
    <OverlayContainer animationActive={overlayIsOpen}>
      <div
        data-cy="comment-loader"
        className={`loader absolute bottom-0 left-0 right-0 top-0 z-50 flex h-full 
          w-full items-center justify-center rounded-lg bg-black opacity-40
          ${!isLoading && "hidden"}`}
      >
        <SpinnerStripes />
      </div>
      <div data-cy={"add-comment-overlay"} className={"flex w-80 flex-col gap-6"}>
        <h2 className="flex justify-between text-xl font-bold">
          Comment
          <XMarkIcon
            className={"h-6 cursor-pointer text-zinc-500 hover:text-red-600"}
            onClick={() => waitForTransition(false)}
            data-cy={"close-comment-overlay"}
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
            <button
              className="btn error"
              data-cy={"delete-comment-button"}
              onClick={deleteComment}
              type={"button"}
              hidden={!commentValue}
            >
              Delete
            </button>
            <button
              className="btn"
              data-cy={"save-comment-button"}
              disabled={inputValue === commentValue}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </OverlayContainer>
  )
}

export default AddCommentOverlay
