"use client"

import Link from "next/link"
import type { ReactNode } from "react"

interface NavLinkProps {
  href: string
  children: ReactNode
  highlight?: boolean
  active?: boolean
  onClick?: () => void
}

export default function NavLink({ href, children, highlight = false, active = false, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`
        transition-colors
        ${highlight || active ? "font-bold" : "font-normal"}
        ${
          highlight
            ? "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            : active
              ? "text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-200"
              : "text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-200"
        }
    `}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
