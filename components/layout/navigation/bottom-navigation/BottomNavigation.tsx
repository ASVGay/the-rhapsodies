import * as React from "react";
import {NavigationItems} from "@/components/layout/navigation/navigation-items";
import {useRouter} from "next/router";
import Link from "next/link";

export default function BottomNavigation() {
    const router = useRouter();

    const isActive = (path: string): boolean => {
        return router.pathname == path
    }

    return (
        <div className="flex lg:hidden fixed bottom-0 w-full bg-white pb-safe min-[68px]">
            {NavigationItems.map((item, index): React.ReactNode => {
                const Icon = item.icon
                return (
                    <Link key={item.path} href={item.path}
                          className={`grow inline-flex flex-col justify-center items-center basis-full py-2 transition-colors duration-300 ${isActive(item.path) ? "text-moon-400" : "text-zinc-300"}`}>
                        <Icon className={"h-9"}/>
                        <span className={"text-xs"}>{item.text}</span>
                    </Link>
                )
            })}
        </div>
    )
};