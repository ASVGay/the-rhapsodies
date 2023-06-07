import React from "react"
import SongListWrapper, { SongType } from "@/components/wrapper/song-list-wrapper"

const Index = () => {
  return <SongListWrapper songType={SongType.Repertoire} />
}

export default Index
