import React from "react"

interface ReviewAreaProps {
  show: boolean
}

const ReviewArea = ({ show }: ReviewAreaProps) => {
  return (
    <div className={`${!show && "hidden"}`}>
      <h2 className={"area-header"}>Review</h2>
    </div>
  )
}

export default ReviewArea
