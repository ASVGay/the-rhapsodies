import React from "react"
import { HeroIcon } from "@/types/hero-icon"

interface SettingsWrapperProps {
  category: string
  icon: HeroIcon
  children: React.ReactNode
}

const SettingsWrapper = ({ category, icon, children }: SettingsWrapperProps) => {
  const Icon = icon
  return (
    <div>
      <div className={"mb-1 inline-flex w-full items-center border-b border-zinc-200 pb-1"}>
        <Icon className={"mr-2 h-6 text-moon-500"} />
        <h1 className={"text-xl leading-8"}>{category} </h1>
      </div>
      {children}
    </div>
  )
}

export default SettingsWrapper
