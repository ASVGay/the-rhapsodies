import React from "react"
import { useSelector } from "react-redux"
import { AppState } from "@/redux/store"

const ReviewArea = () => {
  const newSuggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)
  return (
    <div data-cy="area-review">
      <h2 className={"area-header"}>Review</h2>
      <p>Title: {newSuggestion.title}</p>
      <p>Artist(s): {newSuggestion.artist}</p>
      <p>Motivation: {newSuggestion.motivation}</p>
      <p>Link: {newSuggestion.link}</p>
    </div>
  )
}

export default ReviewArea
