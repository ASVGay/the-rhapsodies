export interface IRole {
    filledBy: string | null
    instrument: string
}

export interface ISuggestion {
    artists: string[]
    motivation: string
    roles: IRole[]
    title: string
    user: string
}