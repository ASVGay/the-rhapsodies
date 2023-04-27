import React, {useState} from 'react';
import SignInTextField from "@/components/textfields/SigninTextfield";
import MainButton from "@/components/buttons/main-button/MainButton";
import {useAuthContext} from "@/context/AuthContext";
import {useRouter} from "next/router";
import ErrorPopup from "@/components/popups/error-popup/ErrorPopup";
import {mapAuthErrorCodeToErrorMessage} from "@/util/signin/SigninHelpers";
import {FirebaseError} from "@firebase/util";

const Index = () => {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [errorText, setErrorText] = useState<string>("");
    const [showErrorText, setShowErrorText] = useState<boolean>(false);
    const {changePassword, signOutUser} = useAuthContext();
    const router = useRouter();
    const submitNewPassword = async () => {
        if (!password) {
            return;
        }

        if (password !== confirmPassword) {
            setErrorText("Fill in equal passwords.")
            setShowErrorText(true)
            return;
        } else {
            try {
                await changePassword(password)
                await signOutUser()
                await router.push('/signin')
            } catch (error) {
                const err = error as FirebaseError;
                handleBadValues(err.code)
                setShowErrorText(true)
            }
        }
    }

    const handleBadValues = (errorCode: string) => {
        setErrorText(mapAuthErrorCodeToErrorMessage(errorCode));
    }

    return (
        <div>
            <div className={"flex justify-center items-center w-screen h-screen bg-moon-50"}>
                <div
                    className={"w-80 h-fit flex justify-between bg-blend-hard-light bg-zinc-50 rounded-lg p-4 flex-col gap-6"}>
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
                        <ErrorPopup text={errorText} closePopup={() => setShowErrorText(false)}/>
                    }
                    <MainButton onClick={submitNewPassword} text={"Submit"}/>
                </div>
            </div>
        </div>
    );
};

export default Index;