import type React from "react"
import type { Metadata } from "next"
import { Pangolin } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Fuente Pangolin - perfecta para estética doodly y hand-drawn
const pangolin = Pangolin({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pangolin",
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
      <body className={`${pangolin.variable} ${pangolin.className} antialiased`}>
        {/* SVG filters for doodle effects */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            {/* Rough/sketchy filter - hand-drawn effect */}
            <filter id="doodle-rough" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence baseFrequency="0.06" numOctaves="2" result="noise" seed="2" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            {/* Hand-drawn wobble filter */}
            <filter id="doodle-wobble" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence baseFrequency="0.9" numOctaves="4" result="turbulence" />
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="0.8" />
            </filter>
          </defs>
        </svg>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
