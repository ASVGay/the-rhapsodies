import React from 'react';
import SongListWrapper from "@/components/wrapper/song-list-wrapper";
import RepertoireCard from "@/components/repertoire/repertoire-card";


const Index = () => {
    return <SongListWrapper renderSongCard={RepertoireCard} pageName={"Repertoire"}/>
};

export default Index;