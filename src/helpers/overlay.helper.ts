import { createPortal } from "react-dom"

export const getOverlay = (reactNode: React.ReactNode) => {
  return createPortal(
    reactNode,
    document.getElementById("overlay-container") as Element | DocumentFragment,
  )
}
