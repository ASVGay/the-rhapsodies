import React, {useState} from 'react';
import SettingsWrapper from "@/components/settings/settings-wrapper";
import {BellIcon} from "@heroicons/react/24/outline";
import EnableNotificationsToggle from "@/components/settings/notifications/enable-notifications-toggle";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {Database} from "@/types/database";
import {FieldValues, SubmitHandler} from "react-hook-form";
import ErrorMessage from "@/components/error/error-message";

const ChangePassword = () => {
    const user = useUser()
    const supabase = useSupabaseClient<Database>()
    const [errorMessage, setErrorMessage] = useState("")


    const submitNewPassword: SubmitHandler<FieldValues> = async ({password}) => {
        if (!user) return

        const {data, error} = await supabase.auth.updateUser({ password })

        if(error) {
            setErrorMessage("Change password failed, try again")
        }
    }
    return (
        <>
            {errorMessage !== "" && (
                <ErrorMessage dataCy={"submit-password-err"} message={errorMessage} />
            )}
        </>
    );
};

export default ChangePassword;