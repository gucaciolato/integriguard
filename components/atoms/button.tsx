"use client"

import type React from "react"

import Link from "next/link"
import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: "primary" | "secondary" | "white"
  size?: "small" | "medium" | "large"
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  style?: React.CSSProperties
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "medium",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  style,
}: ButtonProps) {
  const baseStyles = "font-medium rounded-xl transition-colors relative z-10"

  const variantStyles = {
    primary: disabled
      ? "bg-gray-400 text-white cursor-not-allowed"
      : "bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow dark:text-black",
    secondary: disabled
      ? "border border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
      : "border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-700",
    white: disabled
      ? "bg-gray-400 text-white cursor-not-allowed"
      : "bg-white hover:bg-white/90 text-primary shadow-sm hover:shadow",
  }

  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3",
    large: "px-8 py-4 text-lg",
  }

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  // If href starts with #, it's an anchor on the same page
  const isAnchor = href?.startsWith("#")

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchor) {
      e.preventDefault()
      const targetId = href?.substring(1)
      const targetElement = document.getElementById(targetId || "")

      if (targetElement) {
        // Adjust to compensate for fixed header
        const headerHeight = 80 // Approximate header height
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    }

    if (onClick) {
      onClick()
    }
  }

  if (href) {
    // For internal links, use Link component
    if (href.startsWith("/") || isAnchor) {
      return (
        <Link
          href={href}
          className={styles}
          onClick={isAnchor ? handleAnchorClick : undefined}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
          style={style}
        >
          {children}
        </Link>
      )
    }

    // For external links, use anchor tag
    return (
      <a
        href={href}
        className={styles}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        style={style}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={styles} onClick={onClick} type={type} disabled={disabled} style={style}>
      {children}
    </button>
  )
}
