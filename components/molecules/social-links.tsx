import Link from "next/link"
import SocialIcon from "../atoms/social-icon"

interface SocialLinksProps {
  className?: string
  showOnly?: string[] // Opção para mostrar apenas ícones específicos
}

export default function SocialLinks({ className = "", showOnly }: SocialLinksProps) {
  // Lista de redes sociais na ordem específica
  const socialLinks = [
    { type: "whatsapp", href: "https://wa.me/5518996578463" },
    { type: "email", href: "mailto:contato@integriguard.com.br" },
    { type: "x", href: "https://x.com/integriguard" },
    { type: "instagram", href: "https://instagram.com/integriguard" },
    { type: "linkedin", href: "https://linkedin.com/company/integriguard" },
  ]

  // Filtrar os links se showOnly for fornecido
  const linksToShow = showOnly ? socialLinks.filter((link) => showOnly.includes(link.type)) : socialLinks

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {linksToShow.map((link, index) => (
        <SocialIcon key={index} type={link.type as any} href={link.href} />
      ))}
    </div>
  )
}
