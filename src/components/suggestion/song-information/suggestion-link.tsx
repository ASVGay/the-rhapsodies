import { PlayCircleIcon } from "@heroicons/react/24/outline"
import { Song } from "@/types/database-types"

interface SuggestionLinkProps {
  link: Song["link"]
  dataCy?: string
}

const SuggestionLink = ({ link, dataCy }: SuggestionLinkProps) => {
  return (
    <>
      {link && (
        <a
          className={
            "inline-flex cursor-pointer text-moon-400 hover:font-semibold hover:text-moon-500"
          }
          href={link}
          target={"_blank"}
          data-cy={dataCy}
        >
          <PlayCircleIcon className={"mr-1 inline h-6"} />
          Link to the song
        </a>
      )}
    </>
  )
}

export default SuggestionLink
