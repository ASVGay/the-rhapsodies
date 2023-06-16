import React, { useEffect, useState } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { Attending, AttendingMember, Member } from "@/types/database-types"
import { createAttendeeChannel, getAllAttendanceForEvent } from "@/services/event.service"
import { toast } from "react-toastify"
import SpinnerStripes from "@/components/utils/spinner-stripes"
import { CheckCircleIcon, QuestionMarkCircleIcon, XCircleIcon } from "@heroicons/react/20/solid"
import { useForm } from "react-hook-form"

interface AttendingListProps {
  eventId: string
}

interface AttendingListInputs {
  attendingMembers: Attending
}

const AttendingMembers = ({ eventId }: AttendingListProps) => {
  const supabase = useSupabaseClient<Database>()
  const uid = useUser()?.id
  const attendance: Attending[] = ["present", "absent", "undecided"]
  const [attendingMembers, setAttendingMembers] = useState<AttendingMember[]>([])
  const { register, watch } = useForm<AttendingListInputs>({
    defaultValues: { attendingMembers: "present" },
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [failedToRetrieve, setFailedToRetrieve] = useState<boolean>(false)
  const isChecked = (status: Attending) => watch("attendingMembers") === status

  useEffect(() => {
    const fetchAttendance = () => {
      if (attendingMembers.length === 0) setIsLoading(true)
      getAllAttendanceForEvent(supabase, eventId).then(({ data, error }) => {
        if (data) {
          setAttendingMembers(data)
          setFailedToRetrieve(false)
        }

        if (error) {
          toast.error("Something went wrong while retrieving the attending members.", {
            toastId: "attending-members",
          })
          setFailedToRetrieve(true)
        }
        setIsLoading(false)
      })
    }

    fetchAttendance()

    const channel = createAttendeeChannel(supabase, fetchAttendance)
    return () => void supabase.removeChannel(channel)
  }, [attendingMembers.length, eventId, supabase])

  const getMembersFor = (attendance: Attending) => {
    return attendingMembers.filter(({ attending }) => attending === attendance)
  }

  const getCountFor = (attendance: Attending) => getMembersFor(attendance).length

  const getName = ({ display_name, id }: Member) => (
    <li key={id} className={`${id === uid && "font-bold text-moon"}`}>
      {display_name}
    </li>
  )

  function showNoMembersFor(attendance: Attending) {
    if (failedToRetrieve) {
      return <p className={"py-2 italic text-red-400"}>Failed to retrieve attending members.</p>
    }

    return (
      <p className={"py-2 italic text-zinc-400"}>
        No members have marked themselves <span className={"font-semibold"}>{attendance}</span> for
        this event.
      </p>
    )
  }

  return (
    <div className={"rounded-lg shadow"}>
      <form>
        <div
          data-cy={"loading"}
          className={`loading duration-2000 opacity-1 absolute z-50 flex h-14 w-[calc(100%-2rem)] items-center justify-center rounded-lg bg-zinc-300 lg:w-[calc(60%-2rem)] 
          ${!isLoading && "!h-0 opacity-0"}`}
        >
          <SpinnerStripes />
        </div>
        <ul className="grid w-full grid-cols-3">
          <li>
            <input
              type="radio"
              id={"present-members"}
              defaultValue="present"
              className="peer hidden"
              {...register("attendingMembers")}
            />
            <label
              htmlFor="present-members"
              className="attendanceButtonItem rounded-tl-lg text-black"
            >
              <div className="inline-flex gap-2 align-baseline">
                <CheckCircleIcon
                  className={`h-5 text-green-400 ${isChecked("present") && "text-green-500"}`}
                />
                <p>{getCountFor("present")}</p>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="absent-members"
              defaultValue="absent"
              className="peer hidden"
              {...register("attendingMembers")}
            />
            <label htmlFor="absent-members" className="attendanceButtonItem text-black">
              <div className="inline-flex gap-2 align-baseline">
                <XCircleIcon
                  className={`h-5 text-red-400 ${isChecked("absent") && "text-red-500"}`}
                />
                <p>{getCountFor("absent")}</p>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="undecided-members"
              defaultValue="undecided"
              className="peer hidden"
              {...register("attendingMembers")}
            />
            <label
              htmlFor="undecided-members"
              className="attendanceButtonItem rounded-tr-lg text-black"
            >
              <div className="inline-flex gap-2 align-baseline">
                <QuestionMarkCircleIcon
                  className={`h-5 text-orange-300 ${isChecked("undecided") && "text-orange-400"}`}
                />
                <p>{getCountFor("undecided")}</p>
              </div>
            </label>
          </li>
        </ul>
      </form>

      {attendance.map((attendance) => {
        const members = getMembersFor(attendance)
        return (
          <div hidden={!isChecked(attendance)} className={"text-center leading-8"} key={attendance}>
            {members.length > 0 ? (
              <ol>
                {members
                  .sort((a, b) => a.member.display_name.localeCompare(b.member.display_name))
                  .map(({ member }) => getName(member))}
              </ol>
            ) : (
              showNoMembersFor(attendance)
            )}
          </div>
        )
      })}
    </div>
  )
}

export default AttendingMembers
