import { IRole } from "@/interfaces/Suggestion";

interface ProgressionBarProps {
    roles: IRole[]
}

const ProgressionBar = ({ roles }: ProgressionBarProps) => {

    const rolesFilled = () => {
        return roles.filter((role) => role.filledBy != null).length
    }

    const progressionFraction = `${rolesFilled()}/${roles.length}`
    const progressionBarWidth = ((rolesFilled() / roles.length) * 100) + "%"

    return (
        <div className={"flex justify-between items-center"}>
            <div className={"bg-green-200 w-full h-2 rounded-md"}>
                <div className={`bg-green-400 h-2 rounded-md`} style={{ width: progressionBarWidth }}/>
            </div>
            <p className={"ml-4 text-gray-400 text-sm font-light"}>{progressionFraction}</p>
        </div>
    )
}

export default ProgressionBar