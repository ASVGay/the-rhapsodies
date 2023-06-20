import React, { useEffect, useState } from "react"
import OverlayContainer from "./overlay-container"
import { getOverlay } from "@/helpers/overlay.helper"
import { ClockIcon, MapPinIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { Event } from "@/types/database-types"
import { getEventDate, getEventTime, getEventTitle } from "@/helpers/event.helper"
import { CalendarIcon } from "@heroicons/react/24/solid"
import {deleteEvent} from "@/services/event.service";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

interface DeleteEventOverlayProps {
  onClose: (showOverlay: boolean) => void
  event: Event
}

const DeleteEventOverlay = ({ onClose, event }: DeleteEventOverlayProps) => {
  const supabase = useSupabaseClient<Database>()
  const [overlayIsOpen, setOverlayIsOpen] = useState<boolean>(false)
  const [showInput, setShowInput] = useState(false)
  const [deleteButtonIsActive, setDeleteButtonIsActive] = useState(false)
  const router = useRouter();
  useEffect(() => setOverlayIsOpen(true), [])

  const waitForTransition = (isOpen: boolean) => {
    setOverlayIsOpen(false)
    setTimeout(() => onClose(isOpen), 300)
  }

  const handleChange = (value: string) => {
    value == getEventTitle(event.event_type)
      ? setDeleteButtonIsActive(true)
      : setDeleteButtonIsActive(false)
  }

  const removeEvent = () => {
    const confirmed = window.confirm("Are you sure you want to delete this event?")
    if (!confirmed) return

    deleteEvent(supabase, event.id).then(({error, data}) => {
      if(error) {
        toast.error("We couldn't delete your event, try again later.")
      } else {
        router.push("/events")
        toast.success("Event succesfully deleted.")
      }
    })
  }

  return getOverlay(
    <OverlayContainer animationActive={overlayIsOpen} padding={false}>
      <div className="flex flex-col">
        <div className="flex justify-between gap-4 p-4">
          <div className="flex items-center justify-center">
            <span className="text-lg font-bold leading-8">
              Delete {getEventTitle(event.event_type)}
            </span>
          </div>
            <XMarkIcon
              className="p-0cursor-pointer h-6 text-zinc-500 hover:text-red-600"
              onClick={() => waitForTransition(false)}
              data-cy="close-comment-overlay"
            />
          </div>
        <hr className="w-full" />
        <div className="fle items-center justify-center pb-2 pt-2">
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg font-bold leading-8">{getEventTitle(event.event_type)}</span>
            <div className="flex flex-col">
              <div className="flex flex-row gap-2">
                <CalendarIcon height={20} width={20} color="#EEC73F" />
                <span className="text-base font-normal leading-5">
                  {getEventDate(event.start_time)}
                </span>
              </div>
              <div className="flex flex-row gap-2">
                <ClockIcon height={20} width={20} color="#EEC73F" />
                <span className="text-base font-normal leading-5">
                  {getEventTime(event.start_time, event.end_time)}
                </span>
              </div>
              <div className="flex flex-row gap-2">
                <MapPinIcon height={20} width={20} color="#EEC73F" />
                <span className="text-base font-normal leading-5">{event.location}</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        {!showInput ? (
          <button
            className="btn error m-4 w-[280px]"
            data-cy={"delete-event-continue-button"}
            onClick={() => setShowInput(true)}
          >
            I want to delete this event
          </button>
        ) : (
          <div className={"flex w-full flex-col items-center justify-center gap-2 pt-2"}>
            <span className={"text-sm font-normal leading-5"}>
              To confirm, type {getEventTitle(event.event_type)} below.
            </span>
            <div className={"w-[280px] text-left"}>
              <div className={"input"}>
                <input
                  className="h-8 w-full shadow-sm"
                  data-cy={"input-delete-event"}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn error m-4 mt-1 w-[280px]"
              data-cy={"delete-event-final-button"}
              disabled={!deleteButtonIsActive}
              onClick={() => removeEvent()}
            >
              Delete this event
            </button>
          </div>
        )}
      </div>
    </OverlayContainer>
  )
}

export default DeleteEventOverlay
