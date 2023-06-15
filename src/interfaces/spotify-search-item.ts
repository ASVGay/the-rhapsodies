export interface SearchItem {
  id: string
  title: string
  artists: string[]
  link: string
}

export interface SpotifyArtist {
  name: string
}

export interface external_urls {
  spotify: string
}

export interface SpotifySearchItem {
  id: string
  name: string
  artists: SpotifyArtist[]
  external_urls: external_urls
}