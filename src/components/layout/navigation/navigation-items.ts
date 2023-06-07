import { Cog8ToothIcon, HomeIcon, LightBulbIcon, FolderIcon } from "@heroicons/react/24/solid"
import { NextRouter } from "next/router"
import { HeroIcon } from "@/types/hero-icon"

export type NavItem = {
  icon: HeroIcon
  path: string
  text: string
  data: string
}

export const NavigationItems: NavItem[] = [
  {
    icon: HomeIcon,
    path: "/",
    text: "Home",
    data: "home",
  },
  {
    icon: FolderIcon,
    path: "/repertoire",
    text: "Repertoire",
    data: "repertoire",
  },
  {
    icon: LightBulbIcon,
    path: "/suggestions",
    text: "Suggestions",
    data: "suggestions",
  },
  // {icon: CalendarDaysIcon, path: "/events", text: "Events", data: "events"},
  {
    icon: Cog8ToothIcon,
    path: "/settings",
    text: "Settings",
    data: "settings",
  },
]

export const isActive = (path: string, router: NextRouter): boolean => {
  return path === "/" ? router.pathname === "/" : new RegExp(`${path}.*`).test(router.pathname)
}
