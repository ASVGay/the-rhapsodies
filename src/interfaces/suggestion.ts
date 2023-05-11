export interface IUser {
  id: string
  name: string
}

export interface IRole {
  filledBy: IUser[] | null
  instrument: string
  note: string | null
}

export interface ISuggestion {
  id: string
  artists: string[]
  date: Date
  motivation: string
  roles: IRole[]
  title: string
  user: IUser
}
