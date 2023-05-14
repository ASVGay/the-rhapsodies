import { IRole } from "@/interfaces/suggestion"

interface ProgressionBarProps {
  roles: IRole[]
}

const ProgressionBar = ({ roles }: ProgressionBarProps) => {
  const rolesFilled = () => {
    return roles.filter((role) => role.filledBy?.length! > 0).length
  }

  const progressionFraction = () => `${rolesFilled()}/${roles.length}`

  const progressionBarWidth = () => {
    const amountFilled = rolesFilled()
    return amountFilled > 0 ? (amountFilled / roles.length) * 100 + "%" : 0
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
