import React from "react";
import TopNavigation from "@/components/layout/navigation/top-navigation/TopNavigation";
import BottomNavigation from "@/components/layout/navigation/bottom-navigation/BottomNavigation";

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
    return <>
        <TopNavigation/>
        {children}
        <BottomNavigation/>
    </>
}