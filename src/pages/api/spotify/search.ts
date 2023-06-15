import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  const { q } = req.query
  const accessToken = req.headers.authorization!

  const response = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track&market=NL&limit=10&offset=0`, {
    method: "GET",
    headers: {
      Authorization: accessToken
    }
  })

  res.send(await response.json())
}

export default handler