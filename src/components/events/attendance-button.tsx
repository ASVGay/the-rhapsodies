import React, { useEffect, useState } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { Attending } from "@/types/database-types"
import { getAttendance } from "@/services/event.service"
import { toast } from "react-toastify"

interface AttendanceButtonProps {
  eventId: string
}

const AttendanceButton = ({ eventId }: AttendanceButtonProps) => {
  const supabase = useSupabaseClient<Database>()
  const uid = useUser()?.id
  const [attendance, setAttendance] = useState<Attending>()

  useEffect(() => {
    if (uid) {
      getAttendance(supabase, eventId, uid).then(({ data, error }) => {
        if (error) {
          toast.error("Something went wrong while retrieving your attendance.")
          return
        } else if (data) {
          const attendance = data[0]
          if (attendance == null) setAttendance("undecided")
          else setAttendance(attendance.attending)
        }
      })
    }
  })

  return (
    <div>
      <p>
        Current status: <span data-cy={"user-attendance"}>{attendance}</span>
      </p>
    </div>
  )
}

export default AttendanceButton
