import { getInstrumentImage } from "@/helpers/cloudinary.helper"
import { ISuggestionInstrument } from "@/interfaces/suggestion"
import { TrashIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { ChangeEvent, useEffect, useRef } from "react"

interface InstrumentsListItemProps {
  instrumentItem: ISuggestionInstrument
  onDeleteClick(): void
  onDescriptionChanged(value: string): void
}

const InstrumentsListItem = ({
  instrumentItem,
  onDeleteClick,
  onDescriptionChanged,
}: InstrumentsListItemProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const maxDescriptionLength = 64

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onDescriptionChanged(event.target.value)
  }

  //Resize textarea element to fit content.
  useEffect(() => {
    textareaRef.current!.style.height = "0px"
    const scrollHeight = textareaRef.current?.scrollHeight
    textareaRef.current!.style.height = scrollHeight + "px"
  }, [instrumentItem.description])

  return (
    <li className="flex items-center justify-between px-4 py-2">
      <div className="mr-4 flex w-full items-center">
        <Image
          src={getInstrumentImage(instrumentItem.instrument.image_source)}
          width={64}
          height={64}
          alt={instrumentItem.instrument.instrument_name.toString()}
          className={"mr-4 h-8 w-8"}
        />
        <div className="flex w-full flex-col items-start">
          <p className="pl-2 font-bold">{instrumentItem.instrument.instrument_name}</p>
          <textarea
            className="w-full resize-none rounded-sm p-1 pl-2 leading-tight text-gray-500 hover:outline-moon-300 focus:outline-moon-300 placeholder-gray-300"
            placeholder={"Add note"}
            data-cy="description-input"
            rows={3}
            value={instrumentItem.description}
            ref={textareaRef}
            maxLength={maxDescriptionLength}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
              }
            }}
            onChange={handleDescriptionChange}
          />
          <div />
        </div>
      </div>
      <button onClick={onDeleteClick} data-cy="delete-button" className="h-6 w-6">
        <TrashIcon className="mr-4 h-6 w-6 text-red-500 hover:text-red-900 focus:text-red-900" />
      </button>
    </li>
  )
}

export default InstrumentsListItem
