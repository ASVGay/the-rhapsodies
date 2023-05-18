import { Instrument } from "@/constants/instruments"
import Image from "next/image"

interface InstrumentDropdownItemProps {
  instrument: Instrument
  textNode: React.ReactNode
  onClick(key: Instrument): boolean
}

const InstrumentSearchItem = ({ textNode, instrument, onClick }: InstrumentDropdownItemProps) => {
  return (
    <li
      onClick={() => onClick(instrument)}
      className="flex items-center p-4 hover:bg-moon-300 hover:text-white"
    >
      <Image
        src={instrument.icon}
        alt={instrument.instrumentName.toString()}
        className={"mr-4 h-6 w-6 hover:text-white"}
      />
      {textNode}
    </li>
  )
}

export default InstrumentSearchItem
