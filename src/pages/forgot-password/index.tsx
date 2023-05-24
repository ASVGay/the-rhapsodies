import React from "react"
import Image from "next/image"
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const Index = () => {
  return (
    <div className={"full-bg-moon-50"}>
      <div className={"auth-container text-center"}>
        <Image
          src={"/images/undraw-forgot-password.svg"}
          alt={"Person looking confused at password field"}
          width={0}
          height={0}
          style={{ width: "100%" }}
        />
        <span className={"text-xl font-semibold"}>Forgotten your password?</span>
        <p className={"text-zinc-400"}>
          Enter your email and we&#39;ll send you a link to reset your password.
        </p>
        <form>
          <div className={"input-container"}>
            <label htmlFor="email" className="sr-only">
              Enter your email
            </label>

            <div className="input">
              <input
                className={"bg-zinc-50 !p-2.5"}
                data-cy={"input-email"}
                type="email"
                placeholder="Email"
                required
              />
              <span>
                <EnvelopeIcon />
              </span>
            </div>
          </div>
          <button type={"submit"} className={"btn w-full rounded-lg p-2.5"}>
            Send link
          </button>
        </form>
        <Link
          href={"/sign-in"}
          className={"text-center text-sm text-gray-400"}
          data-cy={"back-to-sign-in"}
        >
          Back to login
        </Link>
      </div>
    </div>
  )
}

export default Index
