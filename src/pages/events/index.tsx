import React, { useEffect, useState } from "react"
import EventCard from "@/components/events/event-card"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Events, EventWithAttendance } from "@/types/database-types"
import { getEventsWithAttendees } from "@/services/event.service"
import { Database } from "@/types/database"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import Spinner from "@/components/utils/spinner"
import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

const Index = () => {
  const supabaseClient = useSupabaseClient<Database>()
  const [events, setEvents] = useState<Events>()
  const [showSpinner, setShowSpinner] = useState<boolean>(true)
  const [errorText, setErrorText] = useState("")
  const router = useRouter();
  useEffect(() => {
    const fetchEvents = () => {
      setShowSpinner(true)
      getEventsWithAttendees(supabaseClient)
        .then((res) => {
          if (res.error) {
            setErrorText("Failed to load events.")
            return
          }

          if (res.data?.length > 0) {
            setEvents(res.data)
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

    fetchEvents()
  }, [supabaseClient])

  return (
    <div className={"page-wrapper"}>
      <div className={"flex justify-between"}>
        <div className={"page-header"}>Events</div>
          <PlusIcon
              data-cy={"button-new-suggestion"}
              className={"h-8 w-8 cursor-pointer text-black hover:text-zinc-400"}
              onClick={() => router.push("/events/new")}
          />
      </div>

      <div data-cy={"event-list"} className={"flex flex-wrap justify-center gap-6"}>
        {showSpinner ? (
          <div className={"h-[75vh] text-center"} data-cy="song-list-spinner">
            <Spinner size={10} />
          </div>
        ) : (
          events?.map((event: EventWithAttendance) => {
            return <EventCard key={event.id} event={event} setShowSpinner={setShowSpinner} />
          })
        )}
      </div>

      {errorText && !events && (
        <div
          className={"max-w-m flex items-center justify-center gap-4 text-zinc-400"}
          data-cy="no-events-text"
        >
          <div>
            <ExclamationTriangleIcon className={"h-[50px] w-[50px]"} />
          </div>
          <p>{errorText}</p>
        </div>
      )}
    </div>
  )
}

export default Index
