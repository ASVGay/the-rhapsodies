import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "@/types/database";

export const getEvents = async (supabase: SupabaseClient<Database>) => {
    return supabase
        .from('events')
        .select();
}