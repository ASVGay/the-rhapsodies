import React from "react"

interface SongInformationAreaProps {
  show: boolean
}

const SongInformationArea = ({ show }: SongInformationAreaProps) => {
  return (
    <div data-cy="area-song-information" className={`${!show && "hidden"}`}>
      <h2 className={"area-header"}>Song information</h2>
    </div>
  )
}

export default SongInformationArea
