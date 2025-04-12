import { ReactNode } from "react"

interface TypographyProps {
  children: ReactNode
  className?: string
}

export function Heading1({ children, className = "" }: TypographyProps) {
  return (
    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 ${className}`}>
      {children}
    </h1>
  )
}

export function Heading2({ children, className = "" }: TypographyProps) {
  return (
    <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 ${className}`}>
      {children}
    </h2>
  )
}

export function Heading3({ children, className = "" }: TypographyProps) {
  return (
    <h3 className={`text-2xl font-bold text-gray-900 ${className}`}>
      {children}
    </h3>
  )
}

export function LargeParagraph({ children, className = "" }: TypographyProps) {
  return (
    <p className={`text-lg text-gray-600 ${className}`}>
      {children}
    </p>
  )
}

export function Paragraph({ children, className = "" }: TypographyProps) {
  return (
    <p className={`text-base text-gray-600 ${className}`}>
      {children}
    </p>
  )
}

export function SmallText({ children, className = "" }: TypographyProps) {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  )
}
