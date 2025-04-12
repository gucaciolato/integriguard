"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import NavLink from "../atoms/nav-link"
import ContactButton from "./contact-button"

interface MobileNavigationProps {
  items?: Array<{
    label: string
    href: string
    highlight?: boolean
  }>
  currentPath?: string
}

export default function MobileNavigation({ items, currentPath }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const pathname = currentPath || "/"

  // Modificar os itens de navegação padrão para remover "Apoie um forger" e "Entrar", e substituir "Assinar" por "Contato"
  const defaultItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ]

  const navItems = items || defaultItems

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-600 hover:text-orange-500 transition-colors dark:text-white dark:hover:text-orange-500"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50 border-b border-gray-100 dark:bg-black/90 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  highlight={false}
                  active={pathname === item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <ContactButton>
                <span className="text-blue-500 hover:text-blue-600 transition-colors font-bold">Contato</span>
              </ContactButton>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
