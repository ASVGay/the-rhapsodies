import { Song } from "@/types/database-types"
import React from "react"
import { NextRouter } from "next/router"

export interface SongCardProps {
  song: Song
  setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>
  router: NextRouter
}
