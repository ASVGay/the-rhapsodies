import Image from "next/image"
import { getInstrumentImage } from "@/helpers/cloudinary.helper"
import React from "react"
import { Division } from "@/types/database-types"
import SpinnerStripes from "../utils/spinner-stripes"

interface InstrumentProps {
  imageURL: string
  name: string
  division?: Division[]
  description: string | null
  uid?: string
  onClick?: () => void
  toggleOpacity?: boolean
  loading?: boolean
}

const Instrument = ({
  imageURL,
  name,
  division,
  description,
  uid,
  onClick,
  toggleOpacity = true,
  loading,
}: InstrumentProps) => {
  const formatUsernames = (divisions: Division[]) => {
    return divisions.map(({ musician }, index) => (
      <span key={musician.id} className={musician.id == uid ? "text-moon-500" : "text-zinc-400"}>
        {musician.display_name}
        {index != divisions.length - 1 && ", "}
      </span>
    ))
  }

  return (
    <div
      className={`flex ${onClick && !loading && "cursor-pointer"} select-none`}
      onClick={() => onClick?.()}
      data-cy="instrument"
    >
      <div className={`flex ${loading && "opacity-30"}`}>
        <Image
          src={getInstrumentImage(imageURL)}
          alt={name}
          width={64}
          height={64}
          className={`${toggleOpacity && division?.length == 0 ? "opacity-30" : ""} mr-4 h-10 w-10`}
          draggable={"false"}
        />
        <div>
          <p>{name}</p>
          <p className={"leading-5 text-zinc-400 md:max-w-[12rem]"}>{description}</p>
          <div className={`font-bold`} data-cy="division">
            {division && formatUsernames(division)}
          </div>
        </div>
      </div>
      <div className={"ml-2 flex items-center"}>
        <SpinnerStripes tailwindProps="stroke-moon" dataCy={"spinner"} />
      </div>
    </div>
  )
}

export default Instrument
