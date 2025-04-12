"use client"

import type React from "react"

import "./globals.css"
import { Ubuntu } from "next/font/google"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { applyThemeFromLocalStorage } from "@/lib/theme-utils"

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  // Aplicar tema salvo ao carregar
  useEffect(() => {
    applyThemeFromLocalStorage()
  }, [])

  // Efeito para lidar com a transição de página
  useEffect(() => {
    if (pathname) {
      setIsPageTransitioning(true)

      // Após um pequeno delay, atualize o conteúdo
      const timeout = setTimeout(() => {
        setDisplayChildren(children)
        setIsPageTransitioning(false)
      }, 300)

      return () => clearTimeout(timeout)
    }
  }, [pathname, children])

  return (
    <html lang="pt-BR">
      <body className={ubuntu.className}>
        <div className={`transition-opacity duration-300 ${isPageTransitioning ? "opacity-0" : "opacity-100"}`}>
          {displayChildren}
        </div>
      </body>
    </html>
  )
}
