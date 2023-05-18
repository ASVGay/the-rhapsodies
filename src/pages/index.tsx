import { useState } from "react"
import MainButton from "@/components/buttons/main-button"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { useRouter } from "next/router"
import ErrorMsg from "@/components/error/error-msg";

export default function Home() {
  const router = useRouter()
  const [showError, setShowError] = useState<boolean>(false)
  const supabase = useSupabaseClient<Database>()

  const signOut = () => {
    ;(async () => {
      const { error } = await supabase.auth.signOut()
      if (error) setShowError(true)
      else await router.push("/sign-in")
    })()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainButton text={"Log out"} onClick={() => signOut()} />
      {showError && (
        <ErrorMsg dataCy={"log-out-btn"} message={"Can't log out right now."} />
      )}
    </main>
  )
}
