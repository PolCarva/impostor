import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "El Impostor - Juego de Fiesta",
  description: "Juego social de palabras donde uno es el impostor",
  icons: {
    icon: [
      {
        url: "https://www.pablocarvalho.dev/img/icon.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://www.pablocarvalho.dev/img/icon.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "https://www.pablocarvalho.dev/img/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "https://www.pablocarvalho.dev/img/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
