import React, { useEffect, useState } from "react"
import OverlayContainer from "./overlay-container"
import { OverlayContent } from "@/interfaces/overlay-content"
import { getOverlay } from "@/helpers/overlay.helper"

interface ScrollViewOverlayProps {
  onClose: () => void
  overlayContent: OverlayContent
}

const ScrollViewOverlay = ({ overlayContent, onClose }: ScrollViewOverlayProps) => {
  const [animationActive, setAnimationActive] = useState<boolean>(false)
  useEffect(() => {
    setAnimationActive(true)
  }, [])

  const waitForTransition = () => {
    setAnimationActive(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  return getOverlay(
    <OverlayContainer animationActive={animationActive}>
      <div data-cy={overlayContent.dataCy}>
        <h2 className="mb-4 text-xl font-bold">{overlayContent.title}</h2>
        <div className="mb-2 max-h-[400px] overflow-scroll overflow-x-hidden p-2">
          <div className="prose" dangerouslySetInnerHTML={{ __html: overlayContent.content }} />
        </div>
        <p className="mb-2 ">{overlayContent.footer}</p>
        <div className="flex justify-end">
          <button className="btn secondary" onClick={waitForTransition}>
            {overlayContent.buttonText}
          </button>
        </div>
      </div>
    </OverlayContainer>,
  )
}

export default ScrollViewOverlay
