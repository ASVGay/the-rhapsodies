import { PlayCircleIcon } from "@heroicons/react/24/outline"
import { Suggestion } from "@/types/database-types"

interface SuggestionLinkProps {
  link: Suggestion["link"]
}

const SuggestionLink = ({ link }: SuggestionLinkProps) => {
  return (
    <>
      {link && (
        <a
          className={
            "inline-flex cursor-pointer text-moon-400 hover:font-semibold hover:text-moon-500"
          }
          href={link}
          target={"_blank"}
        >
          <PlayCircleIcon className={"mr-1 inline h-6"} />
          Link to the song
        </a>
      )}
    </>
  )
}

export default SuggestionLink
