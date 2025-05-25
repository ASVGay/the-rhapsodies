import React, { useEffect, useState } from "react"
import OverlayContainer from "./overlay-container"
import { getOverlay } from "@/helpers/overlay.helper"
import { MusicalNoteIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { Member, Song } from "@/types/database-types"
import { CalendarIcon } from "@heroicons/react/24/solid"
import { deleteSuggestion } from "@/services/suggestion.service"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { getNumberOfMusicians, getSongLine } from "@/helpers/song.helper"
import { formatDistanceToNow } from "date-fns"
import SpinnerStripes from "@/components/utils/spinner-stripes"

interface DeleteSuggestionOverlayProps {
  onClose: (showOverlay: boolean) => void
  suggestion: Song
}

const DeleteSuggestionOverlay = ({ onClose, suggestion }: DeleteSuggestionOverlayProps) => {
  const supabase = useSupabaseClient<Database>()
  const [overlayIsOpen, setOverlayIsOpen] = useState<boolean>(false)
  const [showInput, setShowInput] = useState(false)
  const [deleteButtonIsActive, setDeleteButtonIsActive] = useState(false)
  const router = useRouter()
  const author = (suggestion.author as Member).display_name
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  useEffect(() => setOverlayIsOpen(true), [])

  const waitForTransition = (isOpen: boolean) => {
    setOverlayIsOpen(false)
    setTimeout(() => onClose(isOpen), 300)
  }

  const handleChange = (value: string) => {
    value == author ? setDeleteButtonIsActive(true) : setDeleteButtonIsActive(false)
  }

  const removeSuggestion = () => {
    setIsDeleting(true)
    deleteSuggestion(supabase, suggestion.id)
      .then(({ error }) => {
        if (error) {
          toast.error("We couldn't delete the suggestion, try again later.")
        } else {
          router.push("/suggestions").then(() => {
            toast.success("Suggestion successfully deleted.")
          })
        }
      })
      .finally(() => setIsDeleting(false))
  }

  return getOverlay(
    <OverlayContainer animationActive={overlayIsOpen} padding={false}>
      <div className="flex flex-col">
        <div className="flex justify-between gap-4 p-4">
          <div className="flex items-center justify-center">
            <span className="text-lg font-bold leading-8">Delete Suggestion</span>
          </div>
          <XMarkIcon
            className="p-0cursor-pointer h-6 text-zinc-500 hover:text-red-600"
            onClick={() => waitForTransition(false)}
            data-cy="close-comment-overlay"
          />
        </div>
        <hr className="w-full" />
        <div className="flex items-center justify-center py-2 px-4">
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg font-bold leading-8 text-center">
              {getSongLine(suggestion.title, suggestion.artist)}
            </span>
            <div className="flex flex-col">
              <div className="flex flex-row gap-2">
                <UserCircleIcon height={20} width={20} color="#EEC73F" />
                <span className="text-base text-neutral-700 font-normal leading-5">
                  By {author}
                </span>
              </div>
              <div className="flex flex-row gap-2">
                <CalendarIcon height={20} width={20} color="#EEC73F" />
                <span className="text-base text-neutral-700 font-normal leading-5">
                  Posted {formatDistanceToNow(new Date(suggestion.created_at))} ago
                </span>
              </div>
              <div className="flex flex-row gap-2">
                <MusicalNoteIcon height={20} width={20} color="#EEC73F" />
                <span className="text-base text-neutral-700 font-normal leading-5">
                  {getNumberOfMusicians(suggestion)} musician(s) entered
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        {!showInput ? (
          <div className={"flex justify-center"}>
            <button
              className="btn error m-4 w-[280px]"
              data-cy={"delete-suggestion-continue-button"}
              onClick={() => setShowInput(true)}
            >
              I want to delete this suggestion
            </button>
          </div>
        ) : (
          <div className={"flex w-full flex-col items-center justify-center gap-2 pt-2"}>
            <span className={"text-sm font-normal leading-5"}>
              To confirm, type {author} below.
            </span>
            <div className={"w-[280px] text-left"}>
              <div className={"input"}>
                <input
                  className="h-8 w-full shadow-xs"
                  data-cy={"input-delete-suggestion"}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
            </div>
            <div className={"flex justify-center"}>
              <button
                className="btn error m-4 mt-1 w-[280px] flex justify-center"
                data-cy={"delete-suggestion-final-button"}
                disabled={!deleteButtonIsActive}
                onClick={() => removeSuggestion()}
              >
                {isDeleting ? (
                  <SpinnerStripes
                    dataCy={"delete-suggestion-button-loader"}
                    size={5}
                    className={"stroke-white"}
                  />
                ) : (
                  <>Delete this suggestion</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </OverlayContainer>,
  )
}

export default DeleteSuggestionOverlay
