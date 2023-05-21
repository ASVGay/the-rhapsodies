import { getInstrumentImage } from "@/helpers/cloudinary.helper"
import { Instrument } from "@/types/database-types"
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
        src={getInstrumentImage(instrument.image_source)}
        width={64}
        height={64}
        alt={instrument.instrument_name.toString()}
        className={"mr-4 h-6 w-6 hover:text-white"}
      />
      {textNode}
    </li>
  )
}

export default InstrumentSearchItem
