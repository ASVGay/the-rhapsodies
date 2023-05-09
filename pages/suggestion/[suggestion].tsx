import { FC, useEffect, useState } from "react";
import { MusicalNoteIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import ProgressionBar from "@/components/suggestion/progressionBar";
import Image from "next/image";
import { Instruments } from "@/constants/Instruments.constant";
import { ISuggestion } from "@/interfaces/Suggestion";
import WithProtectedRoute from "@/components/protected-route/ProtectedRoute";
import { GetStaticPaths, GetStaticProps } from "next";
import { getSuggestion, updateSuggestion } from "@/services/suggestions.service";
import { useAuthContext } from "@/context/AuthContext";

//TODO: replace hardcoded value: time
//todo: Highlight current user's name, get curr username
interface SuggestionProps {
  props: ISuggestion
}

const Suggestion: FC<SuggestionProps> = ({ props }) => {
  const [suggestion, setSuggestion] = useState<ISuggestion>(props)
  const { user } = useAuthContext()
  const username = user?.additionalUserData.username as string

  const selectInstrument = (index: number) => {
    // if (suggestion.roles.at(index)?.filledBy?.includes(username)) {
    //   //TODO remove
    // } else {
    //   suggestion.roles.at(index)?.filledBy?.push(username)
    // }



    // updateSuggestion(suggestion).then(() => console.log(true))
    //   // .then((data) => setSuggestion(data))
    //   // .catch((error) => {
    //   //   // TODO Implement proper error handling
    //   //   console.error(error)
    //   // })
  }

  return <> {suggestion &&
    <div className={"flex flex-col m-4 pt-2"}>
      <div className={"flex"}>
        <div className={"w-full"}>
          <p className={"text-2xl leading-8"}><b>Suggestion</b> by {suggestion.user}</p>
          <p className={"text-sm leading-4 font-medium text-zinc-200"}>Posted on April 25th</p>
        </div>
        <Link href={"/suggestions"}><XMarkIcon className={"text-zinc-400 h-8 h-8"}/></Link>
      </div>

      <div className={"m-2 md:max-w-sm md:ml-auto md:mr-auto"}>
        <p className={"text-xl leading-7 font-medium text-moon-500 text-center m-4"}>Song information</p>
        <div className={"flex"}>
          <MusicalNoteIcon className={"w-14 h-14 p-2 text-black rounded-md bg-neutral-200"}/>
          <div className={"ml-3"}>
            <p className={"font-bold line-clamp-1"}>{suggestion.title}</p>
            <p className={"line-clamp-1"}>{suggestion.artists.join(', ')}</p>
          </div>
        </div>
        <p className={"text-sm leading-4 font-medium text-gray-400 h-12 line-clamp-3 mt-3 mb-3"}>
          {suggestion.motivation}
        </p>
      </div>

      <div className={"md:flex flex-col items-center"}>
        <p className={"text-xl font-medium text-moon-500 text-center"}>Instruments</p>
        <div className={"m-4 md:w-2/3 lg:w-1/3"}>
          <ProgressionBar roles={suggestion.roles}
          />
        </div>
        <div className={"flex gap-6 flex-col md:flex-row md:flex-wrap md:max-w-lg"}>
          {suggestion.roles.map((role, index) => {
            const instrument = Instruments[role.instrument]
            return <div key={index} className={"flex cursor-pointer"} onClick={() => selectInstrument(index)}>
              <Image
                src={instrument.icon}
                alt={role.instrument.toString()}
                className={`${role.filledBy ?? "opacity-30"} h-10 w-10 mr-4`}
              />
              <div>
                <p>{instrument.instrument}</p>
                <p className={"text-zinc-400 leading-5 md:max-w-[12rem]"}>{role.note}</p>
                {role.filledBy?.length! > 0 &&
                  <li className={"text-zinc-400 leading-5 ml-8 font-bold"}>{role.filledBy?.join(", ")}</li>
                }
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  }
    {/*todo implement 404 page?*/}
  </>
}

export const getStaticPaths: GetStaticPaths<{ suggestion: string }> = async () => {
  return {
    paths: [],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  let suggestion = await getSuggestion(params?.suggestion as string)
  console.log(suggestion)
  return {
    props: { props: suggestion },
  };
};

export default WithProtectedRoute(Suggestion)