import { FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

//TODO: responsiveness for desktop
//TODO: replace hardcoded values
//todo: Highlight current user's name

const Suggestion: FC = () => {
    return <>
        <div className={"flex flex-col justify-center ml-4 mr-4"}>
            <div className={"flex"}>
                <div className={"w-full"}>
                    <p className={"text-2xl leading-8"}><b>Suggestion</b> by Danny</p>
                    <p className={"text-sm leading-4 font-medium text-zinc-200"}>Posted on April 25th</p>
                </div>
                <Link href={"/suggestions"}><XMarkIcon className={"text-zinc-400 h-8 h-8"}/></Link>
            </div>

            <div>
                <p className={"text-xl leading-7 font-medium text-moon-500 text-center"}>Song information</p>
                {/*todo: suggestion-info component*/}
            </div>

            <div>
                <p className={"text-xl leading-7 font-medium text-moon-500 text-center"}>Instruments</p>
                {/*todo progression component*/}
                {/*todo display instruments*/}
            </div>
        </div>
    </>
}

export default Suggestion