import { useEffect, useState } from "react"
import { PlayIcon, PlayPauseIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"

export interface PreviewPlayerProps {
  url: string
  color: string
}

const PreviewPlayer = ({ url, color }: PreviewPlayerProps) => {
  const [audio, setAudio] = useState<HTMLAudioElement>()
  const [playing, setPlaying] = useState(false)

  const router = useRouter()

  useEffect(() => {
    playing && audio ? audio.play() : audio?.load()
  }, [playing])

  useEffect(() => {
    if (audio) {
      router.events.on("routeChangeStart", () => {
        audio.pause()
      })

      audio.addEventListener("ended", () => setPlaying(false))
      return () => {
        audio.removeEventListener("ended", () => setPlaying(false))
      }
    }
  }, [audio])

  useEffect(() => {
    setAudio(new Audio(url))
  }, [])

  return (
    <div className={`z-10 ${color}`} onClick={() => setPlaying(!playing)} data-cy="player">
      {playing ? (
        <PlayPauseIcon className={`p-3`} width={64} height={64} data-cy="pause-icon" />
      ) : (
        <PlayIcon className={`p-4`} width={64} height={64} data-cy="play-icon" />
      )}
    </div>
  )
}

export default PreviewPlayer
