import Logo from "../atoms/logo"
import SocialLinks from "./social-links"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-100/50 py-8 bg-white/30 backdrop-blur-sm relative z-10 dark:bg-black/50 dark:border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <SocialLinks />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">© {currentYear}</span>
            <Logo size="small" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
