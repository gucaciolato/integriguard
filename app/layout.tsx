import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ContactModalProvider } from "@/hooks/use-contact-modal"
import ContactModal from "@/components/molecules/contact-modal"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IntegriGuard - Segurança Digital",
  description: "Proteção digital completa para sua empresa",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ContactModalProvider>
          {children}
          <ContactModal />
        </ContactModalProvider>
      </body>
    </html>
  )
}