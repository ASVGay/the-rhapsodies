import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "@/types/database";


export const getEventsWithAttendees = async (supabase: SupabaseClient<Database>) => {
    return supabase
        .from("event")
        .select(`
            *,
            attendees:attendee (
                "user_id",
                "attending"
            )
        `)
        .order('event_start_time');
}