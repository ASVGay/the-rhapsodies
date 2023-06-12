import React, {useEffect} from 'react';
import EventCard from "@/components/events/event-card";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Database} from "@/types/database";
import {getEvents} from "@/services/event.service";

const Index = () => {
    const supabaseClient = useSupabaseClient<Database>()

    const fetchEvents = async () => {
        const data = await getEvents(supabaseClient);
        console.log(data)
    }

    useEffect(() => {
        fetchEvents()
    })

    return (
        <div className={"page-wrapper"}>
            <div className={"flex justify-between"}>
                <div className={"page-header"}>
                    Events
                </div>
            </div>
            <div className={"flex flex-wrap justify-center gap-6"}>
                <EventCard/>
                <EventCard/>
                <EventCard/>
                <EventCard/>
            </div>
        </div>
    );
};

export default Index;