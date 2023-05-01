import * as React from "react";
import {CalendarDaysIcon, Cog8ToothIcon, FolderIcon, HomeIcon, LightBulbIcon} from "@heroicons/react/24/solid";
import {NextRouter} from "next/router";

type HeroIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>

type NavItem = {
    icon: HeroIcon,
    path: string,
    text: string
}

export const NavigationItems: NavItem[] = [
    {
        icon: HomeIcon,
        path: "/",
        text: "Home"
    },
    // {
    //     icon: FolderIcon,
    //     path: "/repertoire",
    //     text: "Repertoire"
    // },
    {
        icon: LightBulbIcon,
        path: "/suggestions",
        text: "Suggestions"
    },
    // {
    //     icon: CalendarDaysIcon,
    //     path: "/events",
    //     text: "Events"
    // },
    // {
    //     icon: Cog8ToothIcon,
    //     path: "/settings",
    //     text: "Settings"
    // },
]

export const isActive = (path: string, router: NextRouter): boolean => {
    return router.pathname == path
}