import React, { useState } from "react"
import { Event, UpdateEvent } from "@/types/database-types"
import EventForm from "@/components/events/event-form"
import { useRouter } from "next/router"
import { EventFormInputs } from "@/interfaces/event-form-inputs"
import { GetServerSideProps } from "next"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { getEvent, updateEvent } from "@/services/event.service"
import { FormProvider, useForm } from "react-hook-form"
import { getEventTimeInHoursMinutes, parseStartAndEndDate } from "@/helpers/event.helper"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { toast } from "react-toastify"

interface EditEventPageProps {
  event: Event
}

const EditEventPage = ({
  event: { id, event_type, location, end_time, start_time },
}: EditEventPageProps) => {
  const router = useRouter()
  const redirectPath = `/events/${id}`
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const supabase = useSupabaseClient<Database>()
  const methods = useForm<EventFormInputs>({
    defaultValues: {
      eventType: event_type,
      location: location,
      startTime: getEventTimeInHoursMinutes(start_time),
      endTime: getEventTimeInHoursMinutes(end_time),
      eventDate: new Date(start_time),
    },
  })
  const submitUpdatedEvent = async (input: EventFormInputs) => {
    setShowSpinner(true)

    const { startDateTime, endDateTime } = parseStartAndEndDate(
      input.startTime,
      input.endTime,
      input.eventDate,
    )

    const updatedEvent: UpdateEvent = {
      start_time: startDateTime,
      end_time: endDateTime,
      event_type: input.eventType,
      location: input.location,
    }

    const { error } = await updateEvent(supabase, updatedEvent, id)

    if (error) {
      toast.error("Something went wrong while saving your changes. Please try again")
      setShowSpinner(false)
    } else {
      toast.success("The event has been successfully updated!")
      await router.push(redirectPath)
    }
  }

  return (
    <FormProvider {...methods}>
      <EventForm
        type={"edit"}
        goBack={() => router.push(redirectPath)}
        showSpinner={showSpinner}
        onSubmit={submitUpdatedEvent}
      />
    </FormProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createPagesServerClient(context)
  const { params } = context
  try {
    let { data } = await getEvent(supabase, params?.event as string)
    if (data == null) return { notFound: true }
    return { props: { event: data } }
  } catch {
    return { redirect: { destination: "/500", permanent: false } }
  }
}

export default EditEventPage
