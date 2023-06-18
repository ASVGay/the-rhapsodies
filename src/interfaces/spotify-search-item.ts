export interface SearchItem {
  id: string
  title: string
  artists: string[]
  link: string
}

export interface SpotifyArtist {
  name: string
}

export interface ExternalUrls {
  spotify: string
}

export interface SpotifySearchItem {
  id: string
  name: string
  artists: SpotifyArtist[]
  external_urls: ExternalUrls
}