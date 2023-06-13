import React, { useEffect, useState } from "react"
import EventCard from "@/components/events/event-card"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Event } from "@/types/database-types"
import { getEventsWithAttendees } from "@/services/event.service"
import { Database } from "@/types/database"
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"
import Spinner from "@/components/utils/spinner"

const Index = () => {
  const supabaseClient = useSupabaseClient<Database>()
  const [events, setEvents] = useState<Event[]>()
  const [showSpinner, setShowSpinner] = useState<boolean>(true)
  const [errorText, setErrorText] = useState("")
  const fetchEvents = () => {
    setShowSpinner(true)
    getEventsWithAttendees(supabaseClient)
      .then((res) => {
        if (res.error) {
          setErrorText("Failed to load events.")
          return
        }

        if (res.data?.length > 0) {
          setEvents(res.data as Event[])
        } else {
          setErrorText("No events have been added yet.")
        }
      })
      .catch(() => {
        setErrorText("Failed to load events, try refreshing the page.")
      })
      .finally(() => {
        setShowSpinner(false)
      })
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className={"page-wrapper"}>
      <div className={"flex justify-between"}>
        <div className={"page-header"}>Events</div>
      </div>

      <div data-cy={"event-list"} className={"flex flex-wrap justify-center gap-6"}>
        {showSpinner ? (
          <div className={"h-[75vh] text-center"} data-cy="song-list-spinner">
            <Spinner size={10} />
          </div>
        ) : (
          events?.map((event: Event) => {
            return <EventCard key={event.id} event={event} />
          })
        )}
      </div>

      {errorText.length > 0 && (
        <div
          className={"max-w-m flex items-center justify-center gap-4 text-zinc-400"}
          data-cy="no-events-text"
        >
          <div>
            <MagnifyingGlassCircleIcon className={"h-[50px] w-[50px]"} />
          </div>
          <p>{errorText}</p>
        </div>
      )}
    </div>
  )
}

export default Index
