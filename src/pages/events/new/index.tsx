import React, { useState } from "react"
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
    startTime,
    endTime,
    location,
    eventDate,
  }: EventFormInputs) => {
    setShowSpinner(true)
    const { startDateTime, endDateTime } = parseStartAndEndDate(startTime, endTime, eventDate)

    try {
      const { error, data } = await createEvent(supabase, {
        start_time: startDateTime,
        end_time: endDateTime,
        event_type: eventType,
        location: location,
      })
      if (error) {
        toast.error("Something went wrong trying to add the event, please try again.")
      } else {
        toast.success("Your event has been added.")
        await router.push(`/events/${data.id}`)
      }
    } catch (error) {
      toast.error("Something went wrong trying to add the event, please try again.")
    }
    setShowSpinner(false)
  }

  return (
    <FormProvider {...methods}>
      <EventForm
        type="new"
        goBack={() => router.push("/events")}
        showSpinner={showSpinner}
        onSubmit={submitNewEvent}
      />
    </FormProvider>
  )
}
