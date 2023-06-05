import React from "react"
import SettingsWrapper from "@/components/settings/settings-wrapper"
import {UserCircleIcon} from "@heroicons/react/24/outline"
import SignOut from "@/components/settings/account/sign-out"
import ChangePassword from "@/components/settings/account/change-password";

const AccountSettings = () => {
    return (
        <SettingsWrapper category={"Account"} icon={UserCircleIcon}>
            <SignOut/>
            <ChangePassword/>
        </SettingsWrapper>
    )
}

export default AccountSettings
