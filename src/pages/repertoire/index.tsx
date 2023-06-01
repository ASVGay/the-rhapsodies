import React from 'react';
import SongListPageWrapper from "@/components/wrapper/song-list-wrapper";
import SuggestionCard from "@/components/suggestion/suggestion-card";


const Index = () => {
    return <SongListPageWrapper renderSuggestionCard={SuggestionCard} pageName={"Repertoire"}/>
};

export default Index;