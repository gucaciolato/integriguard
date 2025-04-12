"use client"
import NavLink from "../atoms/nav-link"
import ContactButton from "./contact-button"

interface NavigationProps {
  items?: Array<{
    label: string
    href: string
    highlight?: boolean
  }>
  currentPath?: string
}

export default function Navigation({ items, currentPath }: NavigationProps) {
  const pathname = currentPath || "/"

  const defaultItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ]

  const navItems = items || defaultItems

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map((item) => (
        <NavLink key={item.href} href={item.href} highlight={false} active={pathname === item.href}>
          {item.label}
        </NavLink>
      ))}
      <ContactButton>
        <span className="text-sm font-semibold leading-6 text-[#0000ff] hover:text-[#0000ff]/80 cursor-pointer">
          Contato
        </span>
      </ContactButton>
    </nav>
  )
}
