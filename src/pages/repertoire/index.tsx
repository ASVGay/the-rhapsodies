import React from 'react';
import SongListWrapper, {SongType} from "@/components/wrapper/song-list-wrapper";
import RepertoireCard from "@/components/repertoire/repertoire-card";


const Index = () => {
    return <SongListWrapper renderSongCard={RepertoireCard} songType={SongType.Repertoire}/>
};

export default Index;