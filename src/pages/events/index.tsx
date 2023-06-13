import React, {useEffect, useState} from 'react';
import EventCard from "@/components/events/event-card";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import { Event } from "@/types/database-types";
import {getEvents} from "@/services/event.service";
import {Database} from "@/types/database";

const Index = () => {
    const supabaseClient = useSupabaseClient<Database>()
    const [events, setEvents] = useState<Event[]>();
    const [showSpinner, setShowSpinner] = useState<boolean>()
    const fetchEvents = () => {
        setShowSpinner(true)

        const events = getEvents(supabaseClient);

        events.then((res) => {
            if(res.error) {
                //cant load
                return
            }

            if(res.data?.length > 0) {
                setEvents(res.data as Event[])
            } else {
                //no events yet
            }
        })
            .catch(() => {
                //loading error
            })
            .finally(() => {
                console.log("hi")
            })
    }

    useEffect(() => {
        fetchEvents()
    },[])

    return (
        <div className={"page-wrapper"}>
            <div className={"flex justify-between"}>
                <div className={"page-header"}>
                    Events
                </div>
            </div>
            <div className={"flex flex-wrap justify-center gap-6"}>
                {events?.map((event: Event) => {
                    return <EventCard key={event.id} event={event}/>
                })}
            </div>
        </div>
    );
};

export default Index;