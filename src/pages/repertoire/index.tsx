import React from 'react';
import SongListPageWrapper from "@/components/wrapper/song-list-wrapper";
import RepertoireCard from "@/components/repertoire/repertoire-card";


const Index = () => {
    return <SongListPageWrapper renderSuggestionCard={RepertoireCard} pageName={"Repertoire"}/>
};

export default Index;