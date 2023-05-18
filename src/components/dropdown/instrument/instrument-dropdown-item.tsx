import { Instrument } from "@/constants/instruments"
import Image from "next/image"

interface InstrumentDropdownItemProps {
  instrument: Instrument
  onClick(key: Instrument): boolean
}

const InstrumentDropdownItem = ({ instrument, onClick }: InstrumentDropdownItemProps) => {
  return (
    <li
      onClick={() => onClick(instrument)}
      key={instrument.instrumentName}
      className="flex items-center p-4 hover:bg-gray-100"
    >
      <Image
        src={instrument.icon}
        alt={instrument.instrumentName.toString()}
        className={"mr-4 h-10 w-10"}
      />
      {instrument.instrumentName}
    </li>
  )
}

export default InstrumentDropdownItem
