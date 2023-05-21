import React from "react"
import Link from "next/link"

interface ButtonLinkProps {
  href: string
  text: string
  onClick: () => void
}

const ButtonLink = ({ href, text }: ButtonLinkProps) => {
  return (
    <Link href={href} onClick={() => onclick}>
      <div className={"bg-moon-500 text-white p-2 rounded-md w-[280px]"}>{text}</div>
    </Link>
  )
}

export default ButtonLink