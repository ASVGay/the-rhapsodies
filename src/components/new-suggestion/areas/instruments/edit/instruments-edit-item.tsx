import { Instrument } from "@/constants/instruments"
import { TrashIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

export interface InstrumentItem {
  instrument: Instrument
  note: string
}

interface InstrumentsEditItemProps {
  instrumentItem: InstrumentItem
}

const InstrumentsEditItem = ({ instrumentItem }: InstrumentsEditItemProps) => {
  return (
    <li className="flex items-center justify-between p-4">
      <div className="flex">
        <Image
          src={instrumentItem.instrument.icon}
          alt={instrumentItem.instrument.instrumentName.toString()}
          className={"mr-4 h-8 w-8"}
        />
        {instrumentItem.instrument.instrumentName}
      </div>
      <button onClick={() => {}} className="h-6 w-6">
        <TrashIcon className="mr-4 h-6 w-6 text-red-500 focus:text-red-900" />
      </button>
    </li>
  )
}

export default InstrumentsEditItem
