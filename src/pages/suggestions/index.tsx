import {FC} from "react"
import SuggestionCard from "@/components/suggestion/suggestion-card"
import SongListWrapper, {SongType} from "@/components/wrapper/song-list-wrapper";

const Suggestions: FC = () => {
    return <SongListWrapper renderSongCard={SuggestionCard} songType={SongType.Suggestion}/>
}

export default Suggestions
