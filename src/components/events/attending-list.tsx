import React, { useEffect, useState } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { Attending, AttendingMember, Member } from "@/types/database-types"
import { createAttendeeChannel, getAllAttendanceForEvent } from "@/services/event.service"
import { toast } from "react-toastify"

interface AttendingListProps {
  eventId: string
}

const AttendingList = ({ eventId }: AttendingListProps) => {
  const supabase = useSupabaseClient<Database>()
  const [allAttendance, setAllAttendance] = useState<AttendingMember[]>([])
  const uid = useUser()?.id
  const attendance: Attending[] = ["present", "absent", "undecided"]

  useEffect(() => {
    const refreshData = () => {
      getAllAttendanceForEvent(supabase, eventId).then(({ data, error }) => {
        if (data) setAllAttendance(data)
        if (error) toast.error("Something went wrong while retrieving the attendance")
      })
    }
    refreshData()
    const channel = createAttendeeChannel(supabase, refreshData)

    return () => {
      supabase.removeChannel(channel)
    }
  }, [eventId, supabase])

  const getCountFor = (attendance: Attending) => getMembersFor(attendance).length

  const getMembersFor = (attendance: Attending) => {
    return allAttendance.filter(({ attending }) => attending === attendance)
  }

  function getName(member: Member | null) {
    return (
      <li key={member?.id} className={`${member?.id === uid && "font-bold text-moon"}`}>
        {member?.display_name}
      </li>
    )
  }

  return (
    <div>
      {attendance.map((attendance) => {
        return (
          <>
            <p>Present: {getCountFor(attendance)}</p>
            <ol>{getMembersFor(attendance).map(({ member }) => getName(member))}</ol>
          </>
        )
      })}
    </div>
  )
}

export default AttendingList
