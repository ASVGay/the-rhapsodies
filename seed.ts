/**
 * ! Executing this script will delete all data in your database and seed it with 10 users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed"
import { TESTING } from "./cypress/support/constants"

const main = async () => {
  const seed = await createSeedClient({ dryRun: true })

  // Generate suggestion (not in repertoire) with no author
  await seed.song([
    {
      id: TESTING.idSongNoAuthor,
      title: "Stick Season",
      artist: ["Noah Kahan"],
      motivation: "Great song for the band to play together",
      author: null,
      link: "https://open.spotify.com/track/0mflMxspEfB0VbI1kyLiAv",
      image: "https://i.scdn.co/image/ab67616d000048516ee35072df1af802cca09918",
      inRepertoire: false,
      previewUrl: null,
    },
  ])

  process.exit()
}

main()
