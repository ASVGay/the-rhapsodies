import React, {useState} from 'react';
import Image from 'next/image'
import SigninTextfield from "@/components/textfields/SigninTextfield";
import signIn from "@/firebase/signin";
import {useRouter} from "next/router";
import ErrorPopup from "@/components/popups/error-popup/ErrorPopup";
import {mapAuthErrorCodeToErrorMessage} from "@/util/signin/SigninHelpers";
import MainButton from "@/components/buttons/main-button/MainButton";


const Index = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showErrorPopup, setErrorPopup] = useState<boolean>();
    const [errorPopupText, setErrorPopupText] = useState<string>("");
    const router = useRouter();

    const signInUser = async () => {
        const {error} = await signIn(email, password);

        if (error) {
            handleBadLogin(error.code)
        } else {
            await router.push("./")
        }
    }
    const handleBadLogin = (error: string) => {
        setErrorPopupText(mapAuthErrorCodeToErrorMessage(error))
        setErrorPopup(true)
    }
    return (
        <div className={"flex justify-center items-center w-screen h-screen bg-moon-50"}>
            <div className={"w-80 h-fit flex justify-between bg-blend-hard-light bg-zinc-50 rounded-lg p-4 flex-col gap-6"}>
                <div className={"flex justify-center w-full"}>
                    <Image
                        height={150}
                        width={150}
                        alt={"Logo Rhapsodies"}
                        src={"/images/circle_logo.png"}
                        style={{width: "150px", height: "150px"}}/>
                </div>
                <div className={"flex justify-center w-full"}>
                    <span className={"w-fit font-semibold leading-8 text-black"}>Sign in to your account</span>
                </div>
                <div className="w-full">
                    <SigninTextfield
                        placeholder={"Email"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
                </div>
                <div className="w-full">
                    <SigninTextfield
                        placeholder={"Password"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                </div>
                {
                    showErrorPopup && <ErrorPopup closePopup={() => setErrorPopup(false)} text={errorPopupText}/>
                }
                <MainButton onClick={signInUser} text={"Sign in"}/>
            </div>
        </div>
    )
};

export default Index;