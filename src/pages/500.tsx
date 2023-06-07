import { useRouter } from "next/router"
import React from "react"

export default function Custom500() {
  const router = useRouter()

  return (
    <div
      data-cy="500-page"
      className="grid h-[calc(100vh-68px)]  place-content-center bg-white px-4 lg:h-[calc(100vh-6rem)]"
    >
      <div className="text-center">
        <h1 className="text-9xl font-black text-zinc-200">500</h1>

        <p className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Oh-no!</p>

        <p className="mb-6 mt-4 text-gray-500">{"Couldn't connect to the server."}</p>

        <button className={"btn"} onClick={() => router.back()}>
          Retry
        </button>
      </div>
    </div>
  )
}
