const SPOTIFY_ACCESS_TOKEN = "spotify-access-token"

export const requestSpotifyAccessToken = async (basePath: string) => {
  return fetch(`${basePath}/api/spotify/token`)
}

const getSpotifyAccessToken = (): any => {
  const token = localStorage.getItem(SPOTIFY_ACCESS_TOKEN)
  return token ? JSON.parse(token) : null
}

export const setSpotifyAccessToken = (token: JSON) => {
  localStorage.setItem(SPOTIFY_ACCESS_TOKEN, JSON.stringify(token))
}

export const getSpotifySearchResults = async (basePath: string, searchQuery: string) => {
  return fetch(`${basePath}/api/spotify/search?q=${searchQuery}`, {
    headers: {
      Authorization: `Bearer ${getSpotifyAccessToken().access_token}`,
    },
  })
}
