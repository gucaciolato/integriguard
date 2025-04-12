import Link from "next/link"
import LogoSVG from "./logo-svg"

interface LogoProps {
  size?: "small" | "large"
  href?: string
}

export default function Logo({ size = "small", href = "/" }: LogoProps) {
  const dimensions = size === "small" ? { width: 120, height: 30 } : { width: 240, height: 60 }

  const content = (
    <LogoSVG width={dimensions.width} height={dimensions.height} className="transition-transform hover:scale-105" />
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
