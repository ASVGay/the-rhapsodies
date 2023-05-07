import React, { useState} from 'react';
import SignInTextField from "@/components/textfields/SigninTextfield";
import MainButton from "@/components/buttons/main-button/MainButton";
import {useAuthContext} from "@/context/AuthContext";
import {useRouter} from "next/router";
import ErrorPopup from "@/components/popups/error-popup/ErrorPopup";
import {ErrorCodes, mapAuthErrorCodeToErrorMessage} from "@/util/signin/SigninHelpers";
import {FirebaseError} from "@firebase/util";
import WithProtectedRoute from "@/components/protected-route/ProtectedRoute";

const Index = () => {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [errorText, setErrorText] = useState<string>("");
    const [showErrorText, setShowErrorText] = useState<boolean>(false);
    const {changePassword, signOutUser, user} = useAuthContext();
    const router = useRouter();
    const submitNewPassword = async () => {
        if (!password) {
            return;
        }

        if (!user) {
            return;
        }

        if (password !== confirmPassword) {
            setErrorText("Fill in equal passwords.")
            setShowErrorText(true)
            return;
        }

        try {
            await changePassword(password, user.user)
        } catch (error) {
            const err = error as FirebaseError;
            setErrorText(mapAuthErrorCodeToErrorMessage(err.code))
            if (err.code === ErrorCodes.REQUIRE_RECENT_LOGIN) {
                setTimeout(() => {
                    signOutUser();
                },5000)
                signOutUser();
            }
            setShowErrorText(true)
        }
    }


    return (
        <div>
            <div className={"flex justify-center items-center w-screen h-screen bg-moon-50"}>
                <div
                    className={"w-80 h-fit flex justify-between bg-blend-hard-light bg-zinc-50 rounded-lg p-4 flex-col gap-6"}>
                    {
                        user?.additionalUserData.isFirstLogin &&
                        <div className={"flex justify-center w-full"}>
                            <span className={"w-fit font-semibold leading-8 text-black"}>In order to access the application you need to change your password.</span>
                        </div>
                    }

                    <div className="w-full">
                        <SignInTextField placeholder={"Password"} type={"password"}
                                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <SignInTextField placeholder={"Confirm Password"} type={"password"}
                                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}/>
                    </div>
                    {
                        showErrorText &&
                        <ErrorPopup text={errorText} closePopup={() =>
                            setShowErrorText(false)}/>
                    }
                    <MainButton onClick={submitNewPassword} text={"Submit"}/>
                </div>
            </div>
        </div>
    );
};

export default WithProtectedRoute(Index);