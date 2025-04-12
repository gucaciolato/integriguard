import type { ReactNode } from "react"

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  centered?: boolean
}

export default function SectionTitle({ title, subtitle, className = "", centered = true }: SectionTitleProps) {
  return (
    <div className={`${centered ? "text-center" : "text-left"} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}
