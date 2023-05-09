import React from "react"
import TopNavigation from "@/components/layout/navigation/top-navigation"
import BottomNavigation from "@/components/layout/navigation/bottom-navigation"
import { useRouter } from "next/router"

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter()

  if (pathname === "/sign-in") {
    return <>{children}</>
  }

  return (
    <>
      <TopNavigation />
      <div className={"max-lg:pb-[68px]"}>{children}</div>
      <BottomNavigation />
    </>
  )
}
