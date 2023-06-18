import React, { useEffect, useState } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { Attending } from "@/types/database-types"
import { getAttendanceForEventOfUser, updateAttendance } from "@/services/event.service"
import { toast } from "react-toastify"
import { CheckCircleIcon, QuestionMarkCircleIcon, XCircleIcon } from "@heroicons/react/20/solid"
import { useForm } from "react-hook-form"
import SpinnerStripes from "@/components/utils/spinner-stripes"

interface AttendanceButtonProps {
  eventId: string
}

interface AttendanceButtonInputs {
  attending: Attending
}

const AttendanceButton = ({ eventId }: AttendanceButtonProps) => {
  const supabase = useSupabaseClient<Database>()
  const uid = useUser()?.id
  const { register, watch, getValues, setValue } = useForm<AttendanceButtonInputs>()
  const currentValue = watch("attending")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const retrieveAttendance = () => {
      if (uid != null) {
        setIsLoading(true)
        getAttendanceForEventOfUser(supabase, eventId, uid).then(({ data, error }) => {
          if (error)
            toast.error("Something went wrong while retrieving your attendance.", {
              toastId: "presence-error",
            })
          data ? setValue("attending", data.attending) : setValue("attending", "undecided")
          setIsLoading(false)
        })
      }
    }

    setTimeout(() => {
      retrieveAttendance()
    }, 500)
  }, [eventId, setValue, supabase, uid])

  const changeAttendance = () => {
    const previousValue = currentValue
    if (uid) {
      setIsLoading(true)
      setTimeout(() => {
        updateAttendance(supabase, eventId, uid, getValues("attending")).then(({ error }) => {
          if (error) {
            setValue("attending", previousValue)

            toast.error("Something went wrong while updating your presence. Please try again.", {
              toastId: "presence-error",
            })
          }
          setIsLoading(false)
        })
      }, 500)
    }
  }

  const isChecked = (status: Attending) => currentValue === status

  return (
    <form>
      <div
        data-cy={"loading"}
        className={`loading duration-2000 opacity-1 absolute z-50 flex h-14 w-[calc(100%-2rem)] items-center justify-center rounded-lg bg-zinc-600 bg-opacity-70 lg:w-[calc(60%-2rem)] 
          ${!isLoading && "!h-0 opacity-0"}`}
      >
        <SpinnerStripes />
      </div>
      <ul className="grid w-full grid-cols-3">
        <li>
          <input
            type="radio"
            id={"present"}
            defaultValue="present"
            className="peer hidden"
            {...register("attending", {
              onChange: changeAttendance,
            })}
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
            {...register("attending", {
              onChange: changeAttendance,
            })}
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
            {...register("attending", {
              onChange: changeAttendance,
            })}
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
  )
}

export default AttendanceButton
