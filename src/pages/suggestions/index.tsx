import {FC} from "react"
import SuggestionCard from "@/components/suggestion/suggestion-card"
import SongListWrapper from "@/components/wrapper/song-list-wrapper";

const Suggestions: FC = () => {
    return <SongListWrapper renderSongCard={SuggestionCard} pageName={"Suggestions"}/>
}

export default Suggestions
