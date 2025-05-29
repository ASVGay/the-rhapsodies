import React, { useEffect, useRef, useState } from "react"
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
import { APP_SETTINGS } from "@/constants/app-settings"

/**
 * Props for the HoldToDeleteButton component.
 * @property onHoldComplete - Callback invoked when the hold duration is completed.
 */
type HoldToDeleteButtonProps = {
  onHoldComplete: () => void
}

/**
 * HoldToDeleteButton component
 *
 * A button that requires the user to hold it for a specified duration to confirm a destructive action.
 * Shows a progress bar and countdown while holding. Calls `onHoldComplete` when the hold is completed.
 *
 * @param {HoldToDeleteButtonProps} props
 * @param {() => void} props.onHoldComplete - Callback invoked when the hold duration is completed.
 */
const HoldToDeleteButton = ({ onHoldComplete }: HoldToDeleteButtonProps) => {
  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const holdRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Starts the hold action, updating progress until the hold duration is met.
   * Calls onHoldComplete when finished.
   */
  const startHold = () => {
    setHolding(true)
    const startTime = Date.now()

    holdRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct = Math.min(elapsed / APP_SETTINGS.holdToDeleteDuration, 1)
      setProgress(pct * 100)

      if (pct >= 1) {
        clearInterval(holdRef.current!)
        setHolding(false)
        setProgress(0)
        onHoldComplete()
      }
    }, 16)
  }

  /**
   * Cancels the hold action and resets progress.
   */
  const cancelHold = () => {
    if (holdRef.current) clearInterval(holdRef.current)
    setHolding(false)
    setProgress(0)
  }

  return (
    <button
      className="relative btn error w-[280px] select-none"
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      data-cy="delete-suggestion-button"
    >
      {holding && (
        <div
          className="absolute left-0 top-0 h-full bg-red-500 transition-all ease-linear rounded-sm"
          style={{ width: `${progress}%`, zIndex: 0 }}
        />
      )}
      <span className="relative z-10 text-white">
        {holding
          ? `Deleting suggestion in ${Math.ceil((APP_SETTINGS.holdToDeleteDuration - progress * 20) / 1000)}...`
          : "Hold to confirm deletion"}
      </span>
    </button>
  )
}

/**
 * Props for the DeleteSuggestionOverlay component.
 * @property onClose - Callback to close the overlay, receives a boolean indicating if the overlay should remain open.
 * @property suggestion - The suggestion (song) to be deleted.
 */
interface DeleteSuggestionOverlayProps {
  onClose: (showOverlay: boolean) => void
  suggestion: Song
}

const DeleteSuggestionOverlay = ({ onClose, suggestion }: DeleteSuggestionOverlayProps) => {
  const supabase = useSupabaseClient<Database>()
  const [overlayIsOpen, setOverlayIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const author = (suggestion.author as Member).display_name
  useEffect(() => setOverlayIsOpen(true), [])

  const waitForTransition = (isOpen: boolean) => {
    setOverlayIsOpen(false)
    setTimeout(() => onClose(isOpen), 300)
  }

  const removeSuggestion = () => {
    deleteSuggestion(supabase, suggestion.id).then(({ error }) => {
      if (error) {
        toast.error("We couldn't delete the suggestion, try again later.")
      } else {
        router.push("/suggestions").then(() => {
          toast.success("Suggestion successfully deleted.")
        })
      }
    })
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
        <div className="flex justify-center p-4">
          <HoldToDeleteButton onHoldComplete={removeSuggestion} />
        </div>
      </div>
    </OverlayContainer>,
  )
}

export default DeleteSuggestionOverlay
