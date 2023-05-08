interface IRole {
  filledBy: string
  instrument: string
}

export interface ISuggestion {
  id: string
  artists: string[]
  motivation: string
  roles: IRole[]
  title: string
  user: string
}
