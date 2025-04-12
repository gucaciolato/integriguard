import Link from "next/link"
import { Mail, Github, Linkedin, Instagram, Globe, ExternalLink } from "lucide-react"
import XIcon from "./x-icon"
import WhatsappIcon from "./whatsapp-icon"

type SocialType = "whatsapp" | "x" | "instagram" | "linkedin" | "github" | "email" | "twitter" | "website" | "other"

interface SocialIconProps {
  type: SocialType
  href: string
  size?: number
}

export default function SocialIcon({ type, href, size = 20 }: SocialIconProps) {
  // Mapeamento de tipos para componentes de ícone
  const getIcon = () => {
    switch (type) {
      case "whatsapp":
        return <WhatsappIcon size={size} />
      case "x":
      case "twitter": // Manter compatibilidade com "twitter"
        return <XIcon size={size} />
      case "instagram":
        return <Instagram size={size} />
      case "linkedin":
        return <Linkedin size={size} />
      case "github":
        return <Github size={size} />
      case "email":
        return <Mail size={size} />
      case "website":
        return <Globe size={size} />
      default:
        return <ExternalLink size={size} />
    }
  }

  return (
    <Link
      href={href}
      className="text-gray-600 hover:text-blue-500 transition-colors"
      aria-label={`Visite ${type}`}
      target={type !== "email" ? "_blank" : undefined}
      rel={type !== "email" ? "noopener noreferrer" : undefined}
    >
      {getIcon()}
    </Link>
  )
}
