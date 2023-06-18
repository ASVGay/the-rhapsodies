import React, {useEffect, useState} from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ClockIcon, DocumentTextIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import { format } from "date-fns"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { getAllTimeSlots } from "@/helpers/event.helper"
import { SubmitHandler, useForm } from "react-hook-form"

type FormValues = {
  eventType: string
  day: string
  startTime: string
  endTime: string
}
export default function Index() {
  const [startDate, setStartDate] = useState(new Date())
  const { handleSubmit, register,formState: { errors } } = useForm<FormValues>()

  useEffect(() => {
    console.log(errors)
  },[errors])
  const submitNewEvent: SubmitHandler<FormValues> = async ({
    eventType,
    day,
    startTime,
    endTime,
  }: FormValues) => {
    console.log("hi")
  }

  const customDateInput = (
    <div className="input">
      <input
        data-cy={"input-title"}
        type="text"
        value={format(new Date(startDate), "cccc, LLLL d")}
        {...register("day", {
          required: "Required",
        })}
      />
      <span>
        <DocumentTextIcon />
      </span>
    </div>
  )

  return (
    <div className={"page-wrapper lg:w-3/5"}>
      <div className={"page-header"}>New Event</div>
      <form className={"flex flex-col gap-6"} onSubmit={handleSubmit(submitNewEvent)}>
        <div className="input">
          <select
            className="w-full appearance-none rounded-lg bg-white p-4 pe-12 text-base shadow-sm outline outline-2 outline-gray-300 hover:outline-moon-300 focus:outline-moon-300"
            defaultValue=""
            {...register("eventType", {
              required: "Required",
            })}
          >
            <option>Brainstormborrel</option>
            <option>Rehearsal</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </span>
        </div>

        <DatePicker
          wrapperClassName={"w-full"}
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          customInput={customDateInput}
          enableTabLoop={false}
        />

        <div className={"flex flex-row justify-between gap-4"}>
          <div className={"input w-full"}>
            <select
              className="w-full appearance-none rounded-lg bg-white p-4 pe-12 text-base shadow-sm outline outline-2 outline-gray-300 hover:outline-moon-300 focus:outline-moon-300 disabled:text-gray-100"
              placeholder={"Event type"}
              {...register("startTime", {
                required: "Required",
              })}
            >
              {getAllTimeSlots().map((timeslot) => {
                return <option key={timeslot}>{timeslot}</option>
              })}
            </select>
            <span>
              <ClockIcon />
            </span>
          </div>

          <div className={"input w-full"}>
            <select
              className="w-full appearance-none rounded-lg bg-white p-4 pe-12 text-base shadow-sm outline outline-2 outline-gray-300 hover:outline-moon-300 focus:outline-moon-300"
              {...register("endTime", {
                required: "Required",
              })}
            >
              {getAllTimeSlots().map((option) => {
                return <option key={option}>{option}</option>
              })}
            </select>
            <span>
              <ClockIcon />
            </span>
          </div>
        </div>
        <div className="input">
          <input data-cy={"input-confirmation-password"} type="text" placeholder="Location" />
          <span>
            <LockClosedIcon />
          </span>
        </div>
        <button
          data-cy={"button-add-instruments"}
          type="submit"
          className="btn song-information mb-4"
        >
          Add instruments
        </button>
      </form>
      <style>
        {`
            .react-datepicker__day--selected {
              background-color: #F2D264;
             }         
        `}
      </style>
    </div>
  )
}
