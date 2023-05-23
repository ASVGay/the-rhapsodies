import React from "react"
import TopNavigation from "@/components/layout/navigation/top-navigation"
import BottomNavigation from "@/components/layout/navigation/bottom-navigation"
import { useRouter } from "next/router"
import { useUser } from "@supabase/auth-helpers-react"

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter()
  const user = useUser()

  if (pathname === "/change-password" || pathname === "/sign-in" || !user) {
    return <>{children}</>
  }

  return (
    <>
      <div className="fixed z-50 h-[env(safe-area-inset-top)] w-full bg-moon-200"></div>
      <div className={"p-safe"}>
        <TopNavigation />
        <div className={"max-lg:pb-[68px]"}>{children}</div>
        <BottomNavigation />
      </div>
    </>
  )
}
