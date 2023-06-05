import { FC } from "react"
import SuggestionCard from "@/components/suggestion/suggestion-card"
import SongListPageWrapper from "@/components/wrapper/song-list-wrapper";

const Suggestions: FC = () => {
  return <SongListPageWrapper renderSongCard={SuggestionCard} pageName={"Suggestions"}/>
}

export default Suggestions
