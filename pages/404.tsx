import MainButton from "@/components/buttons/main-button/MainButton"
import { useRouter } from "next/router"
import WithProtectedRoute from "@/components/protected-route/ProtectedRoute"

function Custom404() {
  const router = useRouter()

  return (
    <div
      data-cy="404-page"
      className="grid h-[calc(100vh-68px)]  place-content-center bg-white px-4 lg:h-[calc(100vh-6rem)]"
    >
      <div className="text-center">
        <h1 className="text-9xl font-black text-zinc-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mb-6 mt-4 text-gray-500">Something went wrong.</p>

        <MainButton text={"Go back home"} onClick={() => router.push("/")} />
      </div>
    </div>
  )
}

export default WithProtectedRoute(Custom404)
