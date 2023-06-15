import React, { useEffect, useState } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { Attending } from "@/types/database-types"
import { getAttendance } from "@/services/event.service"
import { toast } from "react-toastify"
import { CheckCircleIcon, QuestionMarkCircleIcon, XCircleIcon } from "@heroicons/react/20/solid"
import { useForm } from "react-hook-form"

interface AttendanceButtonProps {
  eventId: string
}

interface AttendanceButtonInputs {
  attending: Attending
}

const AttendanceButton = ({ eventId }: AttendanceButtonProps) => {
  const supabase = useSupabaseClient<Database>()
  const uid = useUser()?.id
  const [attendance, setAttendance] = useState<Attending>()
  const { register, watch } = useForm<AttendanceButtonInputs>()

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

  const isChecked = (status: Attending) => watch("attending") === status

  return (
    <div>
      <p>
        Current status: <span data-cy={"user-attendance"}>{attendance}</span>
      </p>

      <form>
        <ul className="grid w-full grid-cols-3">
          <li>
            <input
              type="radio"
              id={"present"}
              defaultValue="present"
              className="peer hidden"
              {...register("attending")}
            />
            <label htmlFor="present" className="attendanceButtonItem rounded-l-lg">
              <div className="block">
                <CheckCircleIcon
                  className={`h-5 text-green-400 ${isChecked("present") && "text-green-500"}`}
                />
                <p>Present</p>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="absent"
              defaultValue="absent"
              className="peer hidden"
              {...register("attending")}
            />
            <label htmlFor="absent" className="attendanceButtonItem">
              <div className="block">
                <XCircleIcon
                  className={`h-5 text-red-400 ${isChecked("absent") && "text-red-500"}`}
                />
                <p>Absent</p>
              </div>
            </label>
          </li>
          <li>
            <input
              {...register("attending")}
              type="radio"
              id="undecided"
              defaultValue="undecided"
              className="peer hidden"
            />
            <label htmlFor="undecided" className="attendanceButtonItem rounded-r-lg">
              <div className="block">
                <QuestionMarkCircleIcon
                  className={`h-5 text-orange-300 ${isChecked("undecided") && "text-orange-400"}`}
                />
                <p>Undecided</p>
              </div>
            </label>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default AttendanceButton
