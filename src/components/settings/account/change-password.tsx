import React, {useEffect, useState} from 'react';
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {Database} from "@/types/database";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import ErrorMessage from "@/components/error/error-message";
import SignInTextField from "@/components/text-fields/sign-in-text-field";

const ChangePassword = () => {
    const user = useUser()
    const supabase = useSupabaseClient<Database>()
    const [errorMessage, setErrorMessage] = useState("")

    const {
        handleSubmit,
        register,
        watch,
        formState: {errors},
    } = useForm()

    useEffect(() => {
        watch(() => setErrorMessage(""))
    }, [watch])

    const password = watch("password")
    const submitNewPassword: SubmitHandler<FieldValues> = async ({password}) => {
        if (!user) return

        const {data, error} = await supabase.auth.updateUser({password})

        if (error) {
            setErrorMessage("Change password failed, try again")
        }
    }
    return (
        <div className={"flex items-start justify-between"}>
            <p>Change password</p>
            <form className={"flex flex-col gap-6 pt-2"} onSubmit={handleSubmit(submitNewPassword)}>
                <div className="flex w-full flex-col gap-2">
                    <SignInTextField
                        tag={"password"}
                        validationOptions={{
                            required: "Password is required",
                            minLength: {value: 6, message: "Password should at least be 6 characters."},
                        }}
                        register={register}
                        type={"password"}
                        placeholder={"Password"}
                        dataCy={"change-password-textfield"}
                    />
                    {errors["password"] && (
                        <ErrorMessage
                            dataCy={`password-error`}
                            message={errors["password"]?.message?.toString()}
                        />
                    )}
                    <SignInTextField
                        tag={"confirm-password"}
                        validationOptions={{
                            required: "Confirm Password is required",
                            validate: (value) => value === password || "Passwords do not match",
                        }}
                        register={register}
                        type={"password"}
                        placeholder={"Confirm password"}
                        dataCy={"confirm-password-textfield"}
                    />
                    {errors["confirm-password"] && (
                        <ErrorMessage
                            dataCy={`confirm-password-error`}
                            message={errors["password"]?.message?.toString()}
                        />
                    )}
                    <button className={"btn"} data-cy={"submit-password-btn"}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;