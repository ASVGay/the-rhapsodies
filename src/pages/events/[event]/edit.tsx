import React from "react"
import { Event } from "@/types/database-types"
import EventForm from "@/components/events/event-form"
import { useRouter } from "next/router"
import { EventFormInputs } from "@/interfaces/event-form-inputs"
import { GetServerSideProps } from "next"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { getEvent } from "@/services/event.service"
import { FormProvider, useForm } from "react-hook-form"
import { getEventTimeInHoursMinutes } from "@/helpers/event.helper"

interface EditEventPageProps {
  event: Event
}

const EditEventPage = ({
  event: { id, event_type, location, end_time, start_time },
}: EditEventPageProps) => {
  const router = useRouter()
  const methods = useForm<EventFormInputs>({
    defaultValues: {
      eventType: event_type,
      location: location,
      startTime: getEventTimeInHoursMinutes(start_time),
      endTime: getEventTimeInHoursMinutes(end_time),
      eventDate: new Date(start_time),
    },
  })
  const submitUpdatedEvent = async ({
    eventType,
    startTime,
    endTime,
    location,
    eventDate,
  }: EventFormInputs) => {}

  return (
    <FormProvider {...methods}>
      <EventForm
        title={"Edit Event"}
        goBack={() => void router.push(`/events/${id}`)}
        showSpinner={false}
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
