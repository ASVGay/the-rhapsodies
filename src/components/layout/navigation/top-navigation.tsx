import { isActive, NavigationItems, NavItem } from "@/components/layout/navigation/navigation-items"
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import { NextRouter, useRouter } from "next/router"

export default function TopNavigation() {
  const router: NextRouter = useRouter()
  const settingsItem: NavItem | undefined = NavigationItems.find((item) => item.data == "settings")

  return (
    <div
      data-cy={"top"}
      className={"top-navigation hidden h-24 items-center justify-between bg-white px-4 lg:flex"}
    >
      <Link href={"/"}>
        <Image src={"/images/logo.png"} alt={"Logo of The Rhapsodies"} height={96} width={96} />
      </Link>

      <div className={"flex"}>
        {NavigationItems.map((item, index): React.ReactNode => {
          if (item.text == "Settings") return
          return (
            <Link
              data-cy={item.data}
              data-active={isActive(item.path, router)}
              key={item.path}
              href={item.path}
              className={`px-4 text-xl ${
                isActive(item.path, router) ? "font-semibold text-moon-400" : "text-zinc-300"
              }`}
            >
              <div className={"group relative "}>
                <span>{item.text}</span>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-moon-300 transition-all group-hover:w-full" />
              </div>
            </Link>
          )
        })}
      </div>

      {settingsItem == undefined ? (
        <span className={"w-24"} />
      ) : (
        <Link
          data-cy={settingsItem.data}
          data-active={isActive(settingsItem.path, router)}
          href={settingsItem.path}
          key={settingsItem.path}
          className={"w-24"}
        >
          <Cog8ToothIcon
            className={`float-right h-9 transition duration-500 ease-in-out hover:rotate-180 hover:text-moon-200 ${
              isActive(settingsItem.path, router) ? "text-moon-400" : "text-zinc-300"
            }`}
          />
        </Link>
      )}
    </div>
  )
}
