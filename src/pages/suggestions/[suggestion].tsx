import { FC, useState } from "react"
import { MusicalNoteIcon, XMarkIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import ProgressionBar from "@/components/suggestion/progression-bar"
import Image from "next/image"
import { Instruments } from "@/constants/instruments"
import { ISuggestion } from "@/interfaces/suggestion"
import WithProtectedRoute from "@/components/protected-route/protected-route"
import { GetStaticPaths, GetStaticProps } from "next"
import { getSuggestion, updateSuggestion } from "@/services/suggestion.service"
import { useAuthContext } from "@/context/auth-context"
import { formatDistanceToNow } from "date-fns"

interface SuggestionProps {
  props: ISuggestion
}

const Suggestion: FC<SuggestionProps> = ({ props }) => {
  const [suggestion, setSuggestion] = useState<ISuggestion>(props)
  const { user } = useAuthContext()
  const username = user?.additionalUserData.username as string

  const selectInstrument = (index: number) => {
    if (suggestion.roles.at(index)?.filledBy?.includes(username)) {
      suggestion.roles
        .at(index)
        ?.filledBy?.splice(suggestion.roles.at(index)?.filledBy?.indexOf(username) as number, 1)
    } else {
      suggestion.roles.at(index)?.filledBy?.push(username)
    }

    updateSuggestion(suggestion)
      .then(() => setSuggestion({ ...suggestion }))
      .catch((error) => {
        // TODO Implement proper error handling
        console.error(error)
      })
  }

  const usernamesTextColor = (usernames: string[]) => {
    return usernames?.includes(username) ? "text-moon-500" : "text-zinc-400"
  }

  return (
    <>
      {" "}
      {suggestion && (
        <div className={"m-4 flex flex-col pt-2"}>
          <div className={"flex"}>
            <div className={"w-full"}>
              <p className={"text-2xl leading-8"}>
                <b>Suggestion</b> by {suggestion.user}
              </p>
              <p className={"text-sm font-medium leading-4 text-zinc-200"}>
                Posted {formatDistanceToNow(suggestion.date)} ago
              </p>
            </div>
            <Link href={"/suggestions"}>
              <XMarkIcon className={"h-8 w-8 text-zinc-400"} />
            </Link>
          </div>

          <div className={"m-2 md:ml-auto md:mr-auto md:max-w-sm"}>
            <p className={"m-4 text-center text-xl font-medium leading-7 text-moon-500"}>
              Song information
            </p>
            <div className={"flex"}>
              <MusicalNoteIcon className={"h-14 w-14 rounded-md bg-neutral-200 p-2 text-black"} />
              <div className={"ml-3"}>
                <p className={"line-clamp-1 font-bold"}>{suggestion.title}</p>
                <p className={"line-clamp-1"}>{suggestion.artists.join(", ")}</p>
              </div>
            </div>
            <p
              className={"mb-3 mt-3 line-clamp-3 h-12 text-sm font-medium leading-4 text-gray-400"}
            >
              {suggestion.motivation}
            </p>
          </div>

          <div className={"flex-col items-center md:flex"}>
            <p className={"text-center text-xl font-medium text-moon-500"}>Instruments</p>
            <div className={"m-4 md:w-2/3 lg:w-1/3"}>
              <ProgressionBar roles={suggestion.roles} />
            </div>
            <div className={"grid gap-6"}>
              {suggestion.roles.map((role, index) => {
                const instrument = Instruments[role.instrument]
                return (
                  <div
                    key={index}
                    className={"flex cursor-pointer "}
                    onClick={() => selectInstrument(index)}
                  >
                    <Image
                      src={instrument.icon}
                      alt={role.instrument.toString()}
                      className={`${role.filledBy?.length ? "" : "opacity-30"} mr-4 h-10 w-10`}
                    />
                    <div>
                      <p>{instrument.instrument}</p>
                      <p className={"leading-5 text-zinc-400 md:max-w-[12rem]"}>{role.note}</p>
                      {role.filledBy?.length! > 0 && (
                        <li
                          className={`${usernamesTextColor(
                            role.filledBy!
                          )} ml-8 font-bold leading-5`}
                        >
                          {role.filledBy?.join(", ")}
                        </li>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const getStaticPaths: GetStaticPaths<{ suggestion: string }> = async () => {
  return {
    paths: [],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  let suggestion = await getSuggestion(params?.suggestion as string)
  return {
    props: { props: suggestion },
  }
}

export default WithProtectedRoute(Suggestion)
