import React, { useState } from "react"
import Image from "next/image"
import Toggle from "@/components/settings/controls/toggle"

interface ToggleAwayModeFormProps {}

const ToggleAwayModeForm = (props: ToggleAwayModeFormProps) => {
  const [enabled, setEnabled] = useState<boolean>(false)
  return (
    <div className={"flex flex-col gap-4 items-center"}>
      <p className={"lg:text-center"}>
        <span className={"font-bold text-moon"}>Away Mode</span> enables you to become invisible in
        the app. When enabled, your presence will not be reflected in the song repertoire,
        suggestions, or event attendance lists. Use this feature if you are temporarily stepping
        away from the Rhapsodies but intend to return later.
      </p>
      <br />
      <Image
        src={"/images/undraw-travel-mode.svg"}
        alt={"Open envelope with checkmark"}
        className={"animate-fade-right animate-once"}
        width={0}
        height={0}
        style={{ width: "50%" }}
      />
      <br />
      <Toggle
        text={"Enable Away Mode"}
        handleChange={() => {
          setEnabled(!enabled)
        }}
        checked={enabled}
        dataCy={"away-mode-toggle"}
        disabled={false}
      />
    </div>
  )
}

export default ToggleAwayModeForm
