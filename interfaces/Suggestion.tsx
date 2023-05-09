export interface IRole {
  filledBy: string[] | null
  instrument: string
  note: string | null
}

export interface ISuggestion {
  id: string
  artists: string[]
  date: string
  motivation: string
  roles: IRole[]
  title: string
  user: string
}
