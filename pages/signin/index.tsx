import React, {useEffect, useState} from 'react';
import Image from 'next/image'
import SigninTextfield from "@/components/textfields/SigninTextfield";
import signIn from "@/firebase/signin";
import {log} from "util";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const Index = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const signinUser = async () => {
        const res = await signIn(email, password);

        if(res.error) {
            console.log(error)
        }

    }
    return (
        <div className={"flex justify-center items-center w-screen h-screen bg-moon-50"}>
            <div
                className={"w-80 h-fit flex justify-between bg-blend-hard-light bg-zinc-50 rounded-lg p-4 flex-col gap-6"}>
                <div className={"flex justify-center w-full"}>
                    <Image height={150} width={150} alt={"Logo Rhapsodies"} src={"/images/circle_logo.png"}
                           style={{width: "150px", height: "150px"}}/>
                </div>
                <div className={"flex justify-center w-full"}>
                    <span className={"w-fit font-semibold leading-8 text-black"}>Sign in to your account</span>
                </div>
                <div className="w-full">
                    <SigninTextfield placeholder={"Email"}
                                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
                </div>
                <div className="w-full">
                    <SigninTextfield placeholder={"Password"}
                                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                </div>
                <button className="bg-moon-500 hover:bg-moon-300 text-white font-bold py-2 px-4 rounded"
                        onClick={signinUser}>
                    Sign in
                </button>
            </div>
        </div>
    )
};

export default Index;