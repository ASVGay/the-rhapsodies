import { Controller, useFormContext } from "react-hook-form"
import ErrorMessage from "@/components/error/error-message"
import { CalendarIcon, ClockIcon, MapPinIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Spinner from "@/components/utils/spinner"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import DatePicker from "react-datepicker"
import { getAllTimeSlots, getEventDateFormatted } from "@/helpers/event.helper"
import React from "react"
import { EventFormInputs } from "@/interfaces/event-form-inputs"

interface EventFormParams {
  title: string
  goBack: () => void
  showSpinner: boolean
  onSubmit: ({
    eventType,
    startDate,
    endDate,
    location,
    eventDate,
  }: EventFormInputs) => Promise<void>
}

const EventForm = ({ title, goBack, showSpinner, onSubmit }: EventFormParams) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useFormContext<EventFormInputs>()

  const eventDate = watch("eventDate")

  const isSelected = (field: string | number) => {
    return field !== undefined && field != 0
  }

  const customDateInputField = (
    <div className={"input-container"}>
      <label htmlFor="eventDate" className="sr-only">
        Pick an event date
      </label>
      {errors.eventDate && (
        <ErrorMessage dataCy={"input-date-error"} message={errors.eventDate.message} />
      )}

      <div className="input">
        <input
          data-cy={"input-event-date"}
          type="text"
          placeholder={"Date"}
          value={eventDate ? getEventDateFormatted(eventDate) : ""}
        />
        <span>
          <CalendarIcon />
        </span>
      </div>
    </div>
  )

  return (
    <div className={"page-wrapper lg:w-3/5"}>
      <div className={"flex justify-between"}>
        <div className={"page-header"}>{title}</div>
        <XMarkIcon
          data-cy={"button-discard-new-suggestion"}
          className={"h-8 w-8 cursor-pointer text-zinc-400 hover:text-red-500"}
          onClick={goBack}
        />
      </div>
      {showSpinner ? (
        <div className={"h-[75vh] text-center"} data-cy="song-list-spinner">
          <Spinner size={10} />
        </div>
      ) : (
        <form className={"flex flex-col"} onSubmit={handleSubmit(onSubmit)}>
          <div className={"input-container"}>
            <label htmlFor="eventType" className="sr-only">
              Enter the event type
            </label>
            {errors.eventType && (
              <ErrorMessage dataCy={"input-event-type-error"} message={errors.eventType.message} />
            )}

            <div className={`input w-full ${!isSelected(watch("eventType")) && "text-gray-400"}`}>
              <select
                data-cy={"event-type-select"}
                defaultValue={"0"}
                {...register("eventType", {
                  required: "Required",
                  validate: (value) => isSelected(value) || "The event type needs to be selected",
                })}
              >
                <option value="0" disabled hidden>
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

          <Controller
            control={control}
            name="eventDate"
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <DatePicker
                id={"date-picker"}
                wrapperClassName={"w-full"}
                selected={field.value}
                minDate={new Date()}
                onChange={(date) => field.onChange(date ?? new Date())}
                customInput={customDateInputField}
                enableTabLoop={false}
              />
            )}
          />

          <div className={"flex flex-row items-end justify-between gap-4"}>
            <div className={"input-container w-full"}>
              <label htmlFor="startDate" className="sr-only">
                Enter the start time
              </label>
              {errors.startDate && (
                <ErrorMessage
                  dataCy={"select-startDate-error"}
                  message={errors.startDate.message}
                />
              )}
              <div className={`input w-full ${!isSelected(watch("startDate")) && "text-gray-400"}`}>
                <select
                  data-cy={"start-time-select"}
                  defaultValue={"0"}
                  {...register("startDate", {
                    required: "Required",
                    validate: (value) => {
                      if (!isSelected(value)) return "The start time needs to be selected"
                    },
                  })}
                >
                  <option value="0" disabled hidden>
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
                  defaultValue={"0"}
                  {...register("endDate", {
                    required: "Required",
                    validate: (value) => {
                      if (!isSelected(value)) return "The end time needs to be selected"
                      if (value < watch("startDate"))
                        return "The end time needs to be later than the start time"
                    },
                  })}
                >
                  <option value="0" disabled hidden>
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
                <MapPinIcon />
              </span>
            </div>
          </div>

          <button data-cy={"button-add-event"} type="submit" className="btn song-information mb-4">
            Create Event
          </button>
        </form>
      )}
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

export default EventForm
