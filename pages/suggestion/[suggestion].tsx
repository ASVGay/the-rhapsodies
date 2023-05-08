import { FC } from "react";
import { MusicalNoteIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import ProgressionBar from "@/components/suggestion/progressionBar";
import Image from "next/image";
import { Instruments } from "@/constants/Instruments.constant";

//TODO: responsiveness for desktop
//TODO: replace hardcoded values
//todo: Highlight current user's name, get curr username
//TODO instrument onlick -> update suggestion data + UI if role not already filled
//TODO: error-handeling

const testDataRoles = [
    { filledBy: "rens", instrument: "SINGER" },
    { filledBy: null, instrument: "BANJO" },
    { filledBy: "rens", instrument: "GUITAR" },
    { filledBy: "rens", instrument: "SINGER" },
    { filledBy: null, instrument: "BANJO" },
]

const Suggestion: FC = () => {
    return <>
        <div className={"flex flex-col justify-center m-4"}>
            <div className={"flex"}>
                <div className={"w-full"}>
                    <p className={"text-2xl leading-8"}><b>Suggestion</b> by Danny</p>
                    <p className={"text-sm leading-4 font-medium text-zinc-200"}>Posted on April 25th</p>
                </div>
                <Link href={"/suggestions"}><XMarkIcon className={"text-zinc-400 h-8 h-8"}/></Link>
            </div>

            <div className={"m-2"}>
                <p className={"text-xl leading-7 font-medium text-moon-500 text-center m-4"}>Song information</p>
                <div className={"flex"}>
                    <MusicalNoteIcon className={"w-14 h-14 p-2 text-black rounded-md bg-neutral-200"}/>
                    <div className={"ml-3"}>
                        <p className={"font-bold line-clamp-1"}>Be Honest</p>
                        <p className={"line-clamp-1"}>{["Jorja Smith", "Burna Boy"].join(', ')}</p>
                    </div>
                </div>
                <p className={"text-sm leading-4 font-medium text-gray-400 h-12 line-clamp-3 mt-3 mb-3"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolore est facilis in magnam molestias
                    numquam officia recusandae tenetur totam.
                </p>
            </div>

            <div>
                <p className={"text-xl font-medium text-moon-500 text-center"}>Instruments</p>
                <div className={"m-4"}>
                    <ProgressionBar roles={testDataRoles}
                    />
                </div>
                <div className={"flex flex-col gap-4"}>
                    {testDataRoles.map((role, index) => {
                        const instrument = Instruments[role.instrument]
                        return <div key={index} className={"flex"}>
                            <Image
                                src={instrument.icon}
                                alt={role.instrument.toString()}
                                className={`${role.filledBy ?? "opacity-30"} h-10 w-10 mr-4`}
                            />
                            <div>
                                <p>{instrument.instrument}</p>
                                <p className={"text-zinc-400 leading-5"}>plays same line as bass</p>
                                {role.filledBy &&
                                  <li className={"text-zinc-400 leading-5 ml-8 font-bold"}>{role.filledBy}</li>
                                }
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </>
}

export default Suggestion