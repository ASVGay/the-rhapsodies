import { Instrument } from "@/constants/instruments"
import { TrashIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

export interface InstrumentItem {
  instrument: Instrument
  note: string
}

interface InstrumentsEditItemProps {
  instrumentItem: InstrumentItem
  onDeleteClick(): boolean
}

const InstrumentsEditItem = ({ instrumentItem, onDeleteClick }: InstrumentsEditItemProps) => {
  return (
    <li className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <Image
          src={instrumentItem.instrument.icon}
          alt={instrumentItem.instrument.instrumentName.toString()}
          className={"mr-4 h-8 w-8"}
        />
        <div className="flex flex-col items-start">
          <p className="pl-2 font-bold">{instrumentItem.instrument.instrumentName}</p>
          <input
            className="w-full rounded pl-2 leading-tight text-gray-500 "
            placeholder={"Set note"}
          />
          <div />
        </div>
      </div>
      <button onClick={onDeleteClick} className="h-6 w-6">
        <TrashIcon className="mr-4 h-6 w-6 text-red-500 focus:text-red-900" />
      </button>
    </li>
  )
}

export default InstrumentsEditItem
