import React from "react"
import { CheckCircleIcon, QuestionMarkCircleIcon, XCircleIcon } from "@heroicons/react/20/solid"

interface AttendanceCardProps {
  present: number
  absent: number
  undecided: number
}

const AttendanceCard = ({ present, absent, undecided }: AttendanceCardProps) => {
  return (
    <div
      className={
        "color flex w-[141px] max-w-[141px] flex-row items-center justify-between rounded bg-zinc-100 pl-2 pr-2"
      }
    >
      <CheckCircleIcon height={20} width={20} color={"#4ADE80"} />
      <span className={"text-sm font-normal leading-5"}>{present}</span>
      <XCircleIcon height={20} width={20} color={"#F87171"} />
      <span className={"text-sm font-normal leading-5"}>{absent}</span>
      <QuestionMarkCircleIcon height={20} width={20} color={"#FDBA74"} />
      <span className={"text-sm font-normal leading-5"}>{undecided}</span>
    </div>
  )
}

export default AttendanceCard
