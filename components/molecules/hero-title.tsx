import Logo from "../atoms/logo"

interface HeroTitleProps {
  title: string
  subtitle?: string
}

export default function HeroTitle({ title, subtitle }: HeroTitleProps) {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <Logo size="large" />
      </div>
      <h1 className="mt-12 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{title}</h1>
      {subtitle && <p className="mt-6 text-lg leading-8 text-gray-600">{subtitle}</p>}
    </div>
  )
}
