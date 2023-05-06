import { IUser } from "@/interfaces/User";

export interface ISuggestion {
    artists: string[]
    instruments: string[]
    motivation: string
    title: string
    user: IUser
}