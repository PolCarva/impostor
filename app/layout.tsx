import type React from "react"
import type { Metadata } from "next"
import { Nunito, Baloo_2, Grandstander } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Fuentes juguetones y redondeadas perfectas para la estética doodly
const nunito = Nunito({ 
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
})

const baloo = Baloo_2({ 
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
})

const grandstander = Grandstander({ 
  subsets: ["latin"],
  variable: "--font-grandstander",
  display: "swap",
})

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
      <body className={`${nunito.variable} ${baloo.variable} ${grandstander.variable} ${nunito.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
