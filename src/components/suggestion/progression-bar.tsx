import { SuggestionInstrument } from "@/types/database-types"

interface ProgressionBarProps {
  suggestionInstruments: SuggestionInstrument[]
}

const ProgressionBar = ({ suggestionInstruments }: ProgressionBarProps) => {
  const rolesFilled = () => {
    return suggestionInstruments.filter(({ division }) => division.length > 0).length
  }

  const progressionFraction = () => `${rolesFilled()}/${suggestionInstruments.length}`

  const progressionBarWidth = () => {
    const amountFilled = rolesFilled()
    return amountFilled > 0 ? (amountFilled / suggestionInstruments.length) * 100 + "%" : 0
  }

  return (
    <div className={"flex items-center justify-between"}>
      <div className={"h-2 w-full rounded-md bg-green-200"}>
        <div
          className={`h-2 rounded-md bg-green-400`}
          style={{ width: progressionBarWidth(), transition: "width 1s" }}
        />
      </div>
      <p className={"ml-4 text-sm font-light text-gray-400"}>{progressionFraction()}</p>
    </div>
  )
}

export default ProgressionBar
