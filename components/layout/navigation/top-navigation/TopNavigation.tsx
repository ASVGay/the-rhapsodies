import {isActive, NavigationItems, NavItem} from "@/components/layout/navigation/navigation-items";
import * as React from "react";
import Link from "next/link";
import Image from 'next/image'
import {Cog8ToothIcon} from "@heroicons/react/24/outline";
import {NextRouter, useRouter} from "next/router";

export default function TopNavigation() {
    const router: NextRouter = useRouter();
    const settingsItem: NavItem | undefined = NavigationItems.find(item => item.data == "settings");

    return (
        <div data-cy={'top'}
             className={"top-navigation hidden lg:flex bg-white h-24 justify-between items-center px-4"}>
            <Link href={"/"}>
                <Image src={"/images/logo.png"} alt={"Logo of The Rhapsodies"} height={96} width={96}/>
            </Link>

            <div className={"flex"}>
                {NavigationItems.map((item, index): React.ReactNode => {
                    if (item.text == "Settings") return
                    return <Link data-cy={item.data} key={item.path} href={item.path}
                                 className={`text-xl px-4 ${isActive(item.path, router) ? "text-moon-400" : "text-zinc-300"}`}>
                        <div className={"relative group "}>
                            <span>{item.text}</span>
                            <span
                                className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-moon-300 group-hover:w-full"/>
                        </div>
                    </Link>
                })}
            </div>

            {settingsItem == undefined ? <span className={"w-24"}/> :
                <Link data-cy={settingsItem.data} href={settingsItem.path} key={settingsItem.path} className={"w-24"}>
                    <Cog8ToothIcon
                        className={`h-9 float-right hover:text-moon-200 hover:rotate-180 transition duration-500 ease-in-out ${isActive(settingsItem.path, router) ? "text-moon-400" : "text-zinc-300"}`}/>
                </Link>
            }
        </div>
    )
}