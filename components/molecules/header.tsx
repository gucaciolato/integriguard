import Logo from "../atoms/logo"
import Navigation from "./navigation"
import MobileNavigation from "./mobile-navigation"

interface HeaderProps {
  navItems?: Array<{
    label: string
    href: string
    highlight?: boolean
  }>
  currentPath?: string
}

export default function Header({ navItems, currentPath }: HeaderProps) {
  return (
    <header className="w-full border-b border-gray-100/50 bg-white/30 backdrop-blur-sm sticky top-0 z-50 dark:bg-black/50 dark:border-gray-800/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo href="/" />
        <div className="hidden md:block">
          <Navigation items={navItems} currentPath={currentPath} />
        </div>
        <MobileNavigation items={navItems} currentPath={currentPath} />
      </div>
    </header>
  )
}
