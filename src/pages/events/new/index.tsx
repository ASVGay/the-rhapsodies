import React, { useState } from "react"
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
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormValues>()

  const submitNewEvent: SubmitHandler<FormValues> = async ({
    eventType,
    day,
    startTime,
    endTime,
  }: FormValues) => {
    console.log("hi")
  }

  const isSelected = (field: string | number) => {
    return field !== undefined && field != 0
  }

  const customDateInput = (
    <div className="input">
      <input
        data-cy={"input-event-date"}
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

        <div className={`input w-full ${!isSelected(watch("eventType")) && "text-gray-400"}`}>
          <select className="" {...register("eventType")}>
            <option value="0" disabled selected hidden>
              Event type
            </option>
            <option value="1">Brainstormborrel</option>
            <option value="2">Rehearsal</option>
          </select>
          <span>
            <ChevronDownIcon />
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
          <div className={`input w-full ${!isSelected(watch("startTime")) && "text-gray-400"}`}>
            <select
                data-cy={"start-time-select"}
                {...register("startTime", {
                required: "Required",
              })}
            >
              <option value="0" disabled selected hidden>
                Start
              </option>
              {getAllTimeSlots().map((timeslot) => {
                return <option key={timeslot}>{timeslot}</option>
              })}
            </select>
            <span>
              <ClockIcon />
            </span>
          </div>

          <div className={`input w-full ${!isSelected(watch("endTime")) && "text-gray-400"}`}>
            <select
                data-cy={"end-time-select"}
              {...register("endTime", {
                required: "Required",
              })}
            >
              <option value="0" disabled selected hidden>
                End
              </option>
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
          <input data-cy={"input-location"} type="text" placeholder="Location" />
          <span>
            <LockClosedIcon />
          </span>
        </div>

        <button data-cy={"button-add-event"} type="submit" className="btn song-information mb-4">
          Add Event
        </button>

      </form>

      <style>
          {/* Custom css to style datepicker */}
          {`
            .react-datepicker__day--selected {
              background-color: #F2D264;
             }         
        `}
      </style>
    </div>
  )
}
