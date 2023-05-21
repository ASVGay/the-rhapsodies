import {RegisterOptions} from "react-hook-form";

export interface FormDataItem {
    tag: "email" | "password" | "confirmPassword" | "name"
    type: string
    placeholder: string
    dataCy: string
    validationOptions: RegisterOptions
}