import { Song } from "@/types/database-types"

/**
 * Get song line in the following format: [Title] - [Artists]
 * @param title
 * @param artist
 */
export const getSongLine = (title: string, artist: string[]) => {
  return `${title} - ${artist.join(", ")}`
}

/**
 * Get number of musicians for a song
 *
 * @param song
 */
export const getNumberOfMusicians = (song: Song) => {
  return song.song_instruments.reduce((acc, curr) => {
    return acc + curr.division.length
  }, 0)
}
