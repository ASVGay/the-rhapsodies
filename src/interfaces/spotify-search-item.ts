export interface SearchItem {
  id: string
  title: string
  artists: string[]
  link: string
  image: string | null
  previewUrl: string | null
}

export interface SpotifyArtist {
  name: string
}

export interface ExternalUrls {
  spotify: string
}

export interface SpotifyImage {
  url: string
}

export interface Album {
  images: SpotifyImage[]
}

export interface SpotifySearchItem {
  id: string
  name: string
  artists: SpotifyArtist[]
  external_urls: ExternalUrls
  album: Album
  preview_url: string | null
}
