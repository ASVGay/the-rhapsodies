import React from "react"
import { CheckCircleIcon, QuestionMarkCircleIcon, XCircleIcon } from "@heroicons/react/20/solid"
import { Attendee } from "@/types/database-types"

interface AttendanceCardProps {
  attendees: Attendee[]
}
const AttendanceCard = ({ attendees }: AttendanceCardProps) => {
  const attendeeCount = {
    isAttending: attendees.filter((attendee) => {
      return attendee.attending === "present"
    }).length,
    isNotAttending: attendees.filter((attendee) => {
      return attendee.attending === "absent"
    }).length,
    noInfo: attendees.filter((attendee) => {
      return attendee.attending === "undecided"
    }).length,
  }
  return (
    <div
      className={
        "color flex w-[141px] max-w-[141px] flex-row items-center justify-between rounded bg-zinc-100 pl-2 pr-2"
      }
    >
      <CheckCircleIcon height={20} width={20} color={"#4ADE80"} />
      <span className={"text-sm font-normal leading-5"}>{attendeeCount.isAttending}</span>
      <XCircleIcon height={20} width={20} color={"#F87171"} />
      <span className={"text-sm font-normal leading-5"}>{attendeeCount.isNotAttending}</span>
      <QuestionMarkCircleIcon height={20} width={20} color={"#FDBA74"} />
      <span className={"text-sm font-normal leading-5"}>{attendeeCount.noInfo}</span>
    </div>
  )
}

export default AttendanceCard
