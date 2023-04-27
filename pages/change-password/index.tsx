import React, {useState} from 'react';
import SignInTextField from "@/components/textfields/SigninTextfield";
import MainButton from "@/components/buttons/main-button/MainButton";
import {useAuthContext} from "@/context/AuthContext";
import {useRouter} from "next/router";

const Index = () => {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const { changePassword, signOutUser } = useAuthContext();
    const router = useRouter();
    const submitNewPassword = async () => {
        if(!password) {
            return;
        }

        if (password === confirmPassword) {
            try {
                await changePassword(password)
                await signOutUser()
                await router.push('/signin')
            } catch(error) {
                console.error(error)
            }
        }
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

                    <MainButton onClick={submitNewPassword} text={"Submit"}/>
                </div>
            </div>
        </div>
    );
};

export default Index;