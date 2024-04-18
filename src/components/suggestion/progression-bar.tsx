import { SongInstrument } from "@/types/database-types"
import { SongType } from "@/components/wrapper/song-list-wrapper"

interface ProgressionBarProps {
  suggestionInstruments: SongInstrument[]
  songType: SongType
}

const ProgressionBar = ({ suggestionInstruments, songType }: ProgressionBarProps) => {
  const rolesFilled = () => {
    return suggestionInstruments.filter(({ division }) => division.length > 0).length
  }

  const progressionFraction = () => `${rolesFilled()}/${suggestionInstruments.length}`

  const progressionBarWidth = () => {
    return rolesFilled() > 0 ? (rolesFilled() / suggestionInstruments.length) * 100 + "%" : 0
  }

  const fractionStyle = () => {
    const allRolesFilled = rolesFilled() === suggestionInstruments.length

    if (allRolesFilled && songType === SongType.Suggestion) {
      return "text-green-500"
    }

    if (!allRolesFilled && songType === SongType.Repertoire) {
      return "text-red-400"
    }

    return "text-gray-400 font-light"
  }

  return (
    <div className={"flex items-center justify-between"}>
      <div className={"h-2 w-full rounded-md bg-green-200"}>
        <div
          className={`h-2 rounded-md bg-green-400`}
          style={{ width: progressionBarWidth(), transition: "width 1s" }}
        />
      </div>
      <p className={`ml-4 text-sm ${fractionStyle()}`}>{progressionFraction()}</p>
    </div>
  )
}

export default ProgressionBar
