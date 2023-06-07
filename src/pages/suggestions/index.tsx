import { FC } from "react"
import SongListWrapper, { SongType } from "@/components/wrapper/song-list-wrapper"

const Suggestions: FC = () => {
  return <SongListWrapper songType={SongType.Suggestion} />
}

export default Suggestions
