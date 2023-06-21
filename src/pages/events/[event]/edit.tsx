import React from "react"
import { GetServerSideProps } from "next"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { getEvent } from "@/services/event.service"
import { Event } from "@/types/database-types"

interface EditEventPageProps {
  event: Event
}

const EditEventPage = ({ event }: EditEventPageProps) => {
  return <div>{event.id}</div>
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
