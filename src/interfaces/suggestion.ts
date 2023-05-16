import { Timestamp } from "@firebase/firestore"
import { IUser } from "@/interfaces/user"

export interface ITimeStamp {
  seconds: number
  nanoseconds: number
}

export interface IRole {
  filledBy: IUser[]
  instrument: string
  note: string | null
}

export interface ISuggestion {
  id: string
  artists: string[]
  date: Timestamp | ITimeStamp
  motivation: string
  roles: IRole[]
  title: string
  user: IUser
}
