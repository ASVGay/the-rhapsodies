import React, { useEffect, useState } from "react"
import Spinner from "@/components/utils/spinner"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { EventWithAttendance } from "@/types/database-types"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import EventCard from "@/components/events/event-card"
import { getEventsWithAttendees } from "@/services/event.service"
import { getDisplayName } from "@/services/authentication.service"
import { toast } from "react-toastify"

export default function Home() {
  const [showSpinner, setShowSpinner] = useState<boolean>(true)
  const [displayName, setDisplayName] = useState<string>("")
  const [upcomingEvent, setUpcomingEvent] = useState<EventWithAttendance>()
  const [showEventError, setShowEventError] = useState<boolean>(false)

  const supabase = useSupabaseClient<Database>()
  const uid = useUser()?.id

  useEffect(() => {
    const fetchData = async () => {
      setShowSpinner(true)

      if (uid) {
        const { data, error } = await getDisplayName(supabase, uid)
        if (data) setDisplayName(data.display_name)
        if (error) toast.error(`Something went wrong.`, { toastId: "name-error" })
      }

      const { data, error } = await getEventsWithAttendees(supabase)
      if (data) setUpcomingEvent((data as EventWithAttendance[])[0])
      if (error) setShowEventError(true)

      setShowSpinner(false)
    }

    fetchData().catch(() =>
      toast.error("Something went wrong while retrieving data.", { toastId: "fetch-error" }),
    )
  }, [supabase, uid])

  return (
    <>
      {showSpinner ? (
        <div className={"h-[75vh] text-center"}>
          <Spinner size={10} />
        </div>
      ) : (
        <div className={"page-wrapper"}>
          <div className={"page-header"}>
            Welcome{displayName && <span className={"text-moon-400"}> {displayName}</span>}
            <span className={`${displayName.length > 0 ? "text-moon-400" : "text-black"}`}>!</span>
          </div>
          <div className={"flex flex-col items-center justify-center gap-2 text-center"}>
            <p>Check out the next event or start browsing the app.</p>
            {upcomingEvent && (
              <EventCard
                key={upcomingEvent.id}
                event={upcomingEvent}
                setShowSpinner={setShowSpinner}
              />
            )}
            {showEventError && (
              <div className={"max-w-m flex items-center justify-center gap-4 text-zinc-400"}>
                <div>
                  <ExclamationTriangleIcon className={"h-[50px] w-[50px]"} />
                </div>
                <p>No upcoming events..</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
