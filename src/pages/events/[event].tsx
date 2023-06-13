import React from "react"
import { useRouter } from "next/router"
import { Event } from "@/types/database-types"
import { GetServerSideProps } from "next"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { getEvent } from "@/services/event.service"
import { XMarkIcon } from "@heroicons/react/24/solid"
import EventInfoCard from "@/components/events/event-info-card"

interface EventPageProps {
  event: Event
}

const EventPage = ({ event }: EventPageProps) => {
  const router = useRouter()

  return (
    <div className={"page-wrapper lg:w-3/5"}>
      <div className={"flex justify-between"}>
        <div className={"page-header"}>Event</div>
        <XMarkIcon
          data-cy={"button-back-to-events"}
          className={"h-8 w-8 cursor-pointer text-zinc-400 hover:text-red-500"}
          onClick={() => router.push("/events")}
        />
      </div>
      <EventInfoCard event={event} />
    </div>
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
export default EventPage
