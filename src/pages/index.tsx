import React, { useEffect, useState } from "react"
import Spinner from "@/components/utils/spinner"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { getUpcomingEvent } from "@/services/event.service"
import { EventWithAttendance } from "@/types/database-types"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import EventCard from "@/components/events/event-card"

export default function Home() {
  const [showSpinner, setShowSpinner] = useState<boolean>(true)
  const [upcomingEvent, setUpcomingEvent] = useState<EventWithAttendance>()
  const [showEventError, setShowEventError] = useState<boolean>(false)
  const supabase = useSupabaseClient<Database>()

  useEffect(() => {
    setShowSpinner(true)
    getUpcomingEvent(supabase)
      .then(({ data, error }) => {
        if (data) setUpcomingEvent(data as EventWithAttendance)
        else setShowEventError(true)
      })
    setShowSpinner(false)
  }, [])

  return <>
    {showSpinner ? (
      <div className={"h-[75vh] text-center"}>
        <Spinner size={10} />
      </div>
    ) : (<>
        <div className={"m-4 flex flex-col pt-2 gap-4"}>
          <div className={"flex flex-col w-full"}>
            <b className={"text-2xl leading-8"}>Home</b>
          </div>
          <p>Check out the next event or start browsing the app.</p>
          {upcomingEvent && <EventCard key={upcomingEvent.id} event={upcomingEvent} setShowSpinner={setShowSpinner} />}
          {showEventError &&
            <div className={"max-w-m flex items-center justify-center gap-4 text-zinc-400"}>
              <div><ExclamationTriangleIcon className={"h-[50px] w-[50px]"} /></div>
              <p>No upcoming events..</p>
            </div>
          }
        </div>
      </>
    )}
  </>
}
