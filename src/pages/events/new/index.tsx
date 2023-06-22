import React, { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { parseStartAndEndDate } from "@/helpers/event.helper"
import { FormProvider, useForm } from "react-hook-form"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { createEvent } from "@/services/event.service"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import EventForm from "@/components/events/event-form"
import { EventFormInputs } from "@/interfaces/event-form-inputs"

export default function Index() {
  const [showSpinner, setShowSpinner] = useState(false)
  const router = useRouter()
  const supabase = useSupabaseClient<Database>()
  const methods = useForm<EventFormInputs>()
  const submitNewEvent = async ({
    eventType,
    startDate,
    endDate,
    location,
    eventDate,
  }: EventFormInputs) => {
    setShowSpinner(true)
    const { startTime, endTime } = parseStartAndEndDate(startDate, endDate, eventDate)

    try {
      const { error, data } = await createEvent(supabase, {
        start_time: startTime,
        end_time: endTime,
        event_type: eventType,
        location: location,
      })
      if (error) {
        toast.error("Something went wrong trying to add the event, please try again.")
      } else {
        toast.success("Your event has been added.")
        void router.push(`/events/${data.id}`)
      }
    } catch (error) {
      toast.error("Something went wrong trying to add the event, please try again.")
    }
    setShowSpinner(false)
  }

  return (
    <FormProvider {...methods}>
      <EventForm
        title={"New Event"}
        goBack={() => void router.push("/events")}
        showSpinner={showSpinner}
        onSubmit={submitNewEvent}
      />
    </FormProvider>
  )
}
