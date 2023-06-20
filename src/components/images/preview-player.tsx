import { useEffect, useState } from "react"
import { debounce } from "debounce"
import { PlayIcon, PlayPauseIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"

export interface PreviewPlayerProps {
  url: string
  color: string
}

const PreviewPlayer = ({ url, color }: PreviewPlayerProps) => {
  const [audio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(false)

  const router = useRouter()

  useEffect(() => {
    playing ? audio.play() : audio.load()
  }, [playing])

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false))
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false))
    }
  }, [])

  useEffect(() => {
    router.events.on("routeChangeStart", () => audio.pause())
  }, [])

  return (
    <div className={`z-10 ${color}`} onClick={debounce(() => setPlaying(!playing), 100)}>
      {playing
        ? <PlayPauseIcon className={`p-3`} width={64} height={64} />
        : <PlayIcon className={`p-4`} width={64} height={64} />
      }
    </div>
  )
}

export default PreviewPlayer