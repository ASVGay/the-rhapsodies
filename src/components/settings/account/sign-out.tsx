import React from 'react';
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Database} from "@/types/database";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

const SignOut = () => {
    const supabase  = useSupabaseClient<Database>()
    const router = useRouter();

    const signOut = () => {
        (async () => {
            const { error } = await supabase.auth.signOut()
            if (error) toast.warn("Can't log out right now.")
            else await router.push("/sign-in")
        })()
    }
    return (
        <div className={"flex justify-between items-center hover:cursor-pointer"} onClick={signOut}>
            <p>Sign out</p>
            <ChevronRightIcon height={16} width={16}/>
        </div>
    );
};

export default SignOut;