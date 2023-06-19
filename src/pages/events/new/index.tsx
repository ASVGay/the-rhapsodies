import React, {useState} from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {ClockIcon, DocumentTextIcon, LockClosedIcon} from "@heroicons/react/24/outline"
import {format} from "date-fns"
import {ChevronDownIcon} from "@heroicons/react/20/solid"
import {getAllTimeSlots} from "@/helpers/event.helper"
import {SubmitHandler, useForm} from "react-hook-form"
import ErrorMessage from "@/components/error/error-message"
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Database} from "@/types/database";
import {IEvent} from "@/interfaces/event";
import {EventType} from "@/types/database-types";
import {createEvent} from "@/services/event.service";

type FormValues = {
  eventType: EventType
  date: string
  startDate: string
  endDate: string
  location: string
}
export default function Index() {
  const [eventDate, setEventDate] = useState(new Date())
  const supabase = useSupabaseClient<Database>()

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormValues>()

  const submitNewEvent: SubmitHandler<FormValues> = async ({
    eventType,
    startDate,
    endDate,
    location,
  }: FormValues) => {

    const { startTime, endTime } = parseStartAndEndDate(startDate, endDate)

    createEvent(supabase, {startTime, endTime, eventType, location}).then((res) => {
      console.log(res)
    })


  }

  const isSelected = (field: string | number) => {
    return field !== undefined && field != 0
  }

  const parseStartAndEndDate = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(":");
    const [endHours, endMinutes] = endTime.split(":");

    const startDate = new Date(eventDate)
    const endDate = new Date(eventDate)

    startDate.setHours(parseInt(startHours) ,parseInt(startMinutes))
    endDate.setHours(parseInt(endHours) ,parseInt(endMinutes))

    const startDateIsoString = startDate.toISOString()
    const endDateIsoString = endDate.toISOString()

    return { startTime: startDateIsoString, endTime: endDateIsoString }
  }

  const customDateInputField = (
    <div className={"input-container"}>
      <label htmlFor="eventType" className="sr-only">
        Pick an event date
      </label>
      {errors.date && <ErrorMessage dataCy={"input-date-error"} message={errors.date.message} />}

      <div className="input">
        <input
          data-cy={"input-event-date"}
          type="text"
          value={format(new Date(eventDate), "cccc, LLLL d")}
          {...register("date", {
            required: "Date is required",
              validate: () => {
                  const currentDate = new Date();
                  currentDate.setDate(currentDate.getDate() - 1); //substract one day to include today
                  return eventDate > currentDate || "The date has to be in the future";
              },
          })}
        />
        <span>
          <DocumentTextIcon />
        </span>
      </div>
    </div>
  )

  return (
    <div className={"page-wrapper lg:w-3/5"}>
      <div className={"page-header"}>New Event</div>
      <form className={"flex flex-col"} onSubmit={handleSubmit(submitNewEvent)}>
        <div className={"input-container"}>
          <label htmlFor="eventType" className="sr-only">
            Enter the event type
          </label>
          {errors.eventType && (
            <ErrorMessage dataCy={"input_eventtype_error"} message={errors.eventType.message} />
          )}

          <div className={`input w-full ${!isSelected(watch("eventType")) && "text-gray-400"}`}>
            <select
              {...register("eventType", {
                required: "Required",
                validate: (value) => isSelected(value) || "The event type needs to be selected",
              })}
            >
              <option value="0" disabled selected hidden>
                Event type
              </option>
              <option value="brainstormborrel">Brainstormborrel</option>
              <option value="rehearsal">Rehearsal</option>
            </select>
            <span>
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        <DatePicker
          wrapperClassName={"w-full"}
          selected={eventDate}
          onChange={(date: Date) => setEventDate(date)}
          customInput={customDateInputField}
          enableTabLoop={false}
        />

        <div className={"flex flex-row justify-between gap-4 items-end"}>
          <div className={"input-container w-full"}>
            <label htmlFor="startDate" className="sr-only">
              Enter the start time
            </label>
            {errors.startDate && (
              <ErrorMessage dataCy={"select-startDate-error"} message={errors.startTime.message} />
            )}
            <div className={`input w-full ${!isSelected(watch("startDate")) && "text-gray-400"}`}>
              <select
                data-cy={"start-time-select"}
                {...register("startDate", {
                  required: "Required",
                  validate: (value) => {
                    if (!isSelected(value)) return "The start time needs to be selected"
                  }
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
          </div>

          <div className={"input-container w-full"}>
            <label htmlFor="endTime" className="sr-only">
              Enter the end time
            </label>
            {errors.endDate && (
              <ErrorMessage dataCy={"select-end-time-error"} message={errors.endDate.message} />
            )}

            <div className={`input w-full ${!isSelected(watch("endDate")) && "text-gray-400"}`}>
              <select
                data-cy={"end-time-select"}
                {...register("endDate", {
                  required: "Required",
                  validate: (value) => {
                      if (!isSelected(value)) return "The event type needs to be selected"
                      if (value < watch("endDate")) return "The end time needs to be later than the start time"
                  }
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
        </div>

        <div className={"input-container"}>
          <label htmlFor="location" className="sr-only">
            Enter the location
          </label>
          {errors.location && (
            <ErrorMessage dataCy={"input-location-error"} message={errors.location.message} />
          )}

          <div className="input">
            <input
              data-cy={"input-location"}
              type="text"
              placeholder="Location"
              {...register("location", {
                required: "Location is required",
              })}
            />
            <span>
              <LockClosedIcon />
            </span>
          </div>
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
