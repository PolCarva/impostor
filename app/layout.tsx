import type React from "react"
import type { Metadata, Viewport } from "next"
import { Pangolin } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from "@/components/google-analytics"
import "./globals.css"

// Fuente Pangolin - perfecta para estética doodly y hand-drawn
const pangolin = Pangolin({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pangolin",
  display: "swap",
})

// URL base del sitio - cambiar en producción
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://impostor.gratis"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1625" },
  ],
}

export const metadata: Metadata = {
  // Metadatos básicos - estrategia alineada con impostor.me, diferenciador: 100% gratis sin publicidad
  title: {
    default: "Juego Impostor Online Gratis - Jugar a El Impostor con Amigos | 100% Gratis Sin Publicidad",
    template: "%s | Juego Impostor Online Gratis Sin Publicidad",
  },
  description: "Juego Impostor online gratis, sin publicidad. El juego viral de TikTok e Instagram. Juega a El Impostor con amigos: mecánica de roles ocultos, partidas rápidas de deducción. 100% gratis, sin descargas.",
  
  // Keywords para SEO - competir con impostor.me y long-tail "gratis sin publicidad"
  keywords: [
    // Principales - mismos que impostor.me para competir
    "juego impostor online gratis",
    "jugar a el impostor con amigos",
    "el impostor gratis",
    "impostor gratis",
    "juego impostor gratis",
    "impostor juego gratis",
    "jugar impostor gratis",
    "impostor online gratis",
    // Diferenciador: gratis sin publicidad
    "impostor gratis sin publicidad",
    "juego impostor gratis sin publicidad",
    "el impostor sin publicidad",
    "juego impostor 100 por ciento gratis",
    // Viral / TikTok / Instagram
    "juego viral tiktok",
    "juego viral instagram",
    "quien es el impostor juego",
    "impostor",
    "juego del impostor",
    "el impostor",
    "impostor juego",
    "impostor game",
    // Variaciones
    "juego impostor online",
    "juego del impostor gratis",
    "impostor juego de palabras",
    "impostor juego de mesa",
    "impostor party game",
    // Reuniones / grupos (como impostor.me)
    "juego para reuniones online",
    "juego de fiesta",
    "juego para grupos",
    "juego de palabras",
    "juego social",
    "party game",
    "juego para amigos",
    "juego para reuniones",
    "juego de adivinanzas",
    // Long tail
    "juego del impostor para fiestas",
    "juego tipo among us con palabras",
    "juego para jugar en grupo",
    "juego de preguntas impostor",
    "juegos de fiesta gratis",
    "juegos para grupos grandes",
    "juegos para reuniones familiares",
    "juegos de mesa online gratis",
    // Categorías
    "juego de roles",
    "juego de deducción",
    "juego interactivo",
    "juego multiplayer local",
  ],

  // Autores y creadores
  authors: [{ name: "Pablo Carvalho", url: "https://pablocarvalho.dev" }],
  creator: "Pablo Carvalho",
  publisher: "Pablo Carvalho",

  // Robots e indexación
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // URL canónica
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "es": "/",
      "es-ES": "/",
      "es-AR": "/",
      "es-MX": "/",
      "es-CO": "/",
      "es-CL": "/",
      "es-UY": "/",
    },
  },

  // Open Graph para redes sociales - alineado con impostor.me, diferenciador gratis sin publicidad
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["es_AR", "es_MX", "es_CO", "es_CL", "es_UY"],
    url: siteUrl,
    siteName: "Juego Impostor Online Gratis - El Impostor con Amigos",
    title: "Juego Impostor Online Gratis - Jugar a El Impostor con Amigos | 100% Gratis Sin Publicidad",
    description: "El juego viral de TikTok e Instagram. ¿Quién es el impostor? Juega a El Impostor con amigos: 100% gratis, sin publicidad, sin descargas. Mecánica de roles ocultos y partidas rápidas de deducción.",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Juego Impostor Online Gratis - Jugar a El Impostor con Amigos | 100% Gratis Sin Publicidad",
        type: "image/png",
      },
    ],
  },

  // Twitter Card - competir con impostor.me
  twitter: {
    card: "summary_large_image",
    site: "@pablocarvalho",
    creator: "@pablocarvalho",
    title: "Juego Impostor Online Gratis - Jugar a El Impostor con Amigos | 100% Gratis Sin Publicidad",
    description: "El juego viral de TikTok e Instagram. ¿Quién es el impostor? Juega con amigos: 100% gratis, sin publicidad. Partidas rápidas de deducción en el navegador.",
    images: {
      url: `${siteUrl}/og.png`,
      alt: "Juego Impostor Online Gratis - Jugar a El Impostor con Amigos | 100% Gratis Sin Publicidad",
    },
  },

  // Íconos y favicons - el SVG usa currentColor y se adapta al tema automáticamente
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
  },

  // Manifest para PWA
  manifest: "/manifest.json",

  // Categoría y clasificación
  category: "games",
  classification: "Game, Party Game, Word Game",

  // Otros metadatos
  applicationName: "El Impostor",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // App links para móvil
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "El Impostor",
  },

  // Verificación de sitios (descomentar cuando tengas los códigos)
  // verification: {
  //   google: "tu-codigo-de-google",
  //   yandex: "tu-codigo-de-yandex",
  //   bing: "tu-codigo-de-bing",
  // },

  // Otros
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "msapplication-TileColor": "#fafafa",
    "msapplication-config": "/browserconfig.xml",
  },
}

// JSON-LD Structured Data - estrategia SEO alineada con impostor.me, diferenciador: 100% gratis sin publicidad
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // WebSite Schema
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Juego Impostor Online Gratis - Jugar a El Impostor con Amigos",
      description: "Juego Impostor online gratis, sin publicidad. El juego viral de TikTok e Instagram. Juega a El Impostor con amigos: 100% gratis, sin descargas.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "es",
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    // Organization Schema
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "El Impostor Gratis",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.svg`,
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://pablocarvalho.dev",
      ],
    },
    // VideoGame/SoftwareApplication Schema
    {
      "@type": "VideoGame",
      "@id": `${siteUrl}/#game`,
      name: "Juego Impostor Online Gratis",
      alternateName: ["El Impostor Gratis", "Impostor Gratis Sin Publicidad", "Juego del Impostor Gratis", "Impostor Game Free", "The Impostor Free"],
      description: "Juego Impostor online gratis, sin publicidad. El juego viral de TikTok e Instagram. Mecánica de roles ocultos y partidas rápidas de deducción. 100% gratis, sin publicidad, sin descargas. Juega a El Impostor con amigos.",
      url: siteUrl,
      image: `${siteUrl}/og.png`,
      author: {
        "@type": "Person",
        name: "Pablo Carvalho",
        url: "https://pablocarvalho.dev",
      },
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      genre: ["Party Game", "Word Game", "Social Deduction", "Casual"],
      gamePlatform: ["Web Browser", "Mobile Web"],
      applicationCategory: "Game",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "100% gratis, sin publicidad",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "150",
        bestRating: "5",
        worstRating: "1",
      },
      numberOfPlayers: {
        "@type": "QuantitativeValue",
        minValue: 4,
        maxValue: 20,
      },
      playMode: ["MultiPlayer", "CoOp"],
      inLanguage: "es",
      isAccessibleForFree: true,
      isFamilyFriendly: true,
    },
    // WebPage Schema
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Juego Impostor Online Gratis - Jugar a El Impostor con Amigos | 100% Gratis Sin Publicidad",
      description: "El juego viral de TikTok e Instagram. ¿Quién es el impostor? Juega a El Impostor con amigos: 100% gratis, sin publicidad. Mecánica de roles ocultos, partidas rápidas de deducción.",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#game`,
      },
      inLanguage: "es",
      potentialAction: {
        "@type": "PlayAction",
        target: siteUrl,
      },
    },
    // FAQPage Schema - preguntas alineadas con impostor.me, respuestas destacando 100% gratis sin publicidad
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué es El Impostor?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Es un juego de deducción social donde todos reciben una palabra secreta excepto uno: el Impostor. El objetivo es descubrirlo antes de que él descubra la palabra.",
          },
        },
        {
          "@type": "Question",
          name: "¿Necesito instalar algo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. El juego funciona directamente en el navegador de tu móvil, tablet o PC. Solo necesitas conexión a internet.",
          },
        },
        {
          "@type": "Question",
          name: "¿Es gratis?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí, 100% gratuito y sin publicidad. Sin compras ocultas. A diferencia de otras versiones, aquí juegas sin anuncios.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuántos jugadores pueden jugar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mínimo 4 jugadores son necesarios para que la dinámica funcione bien. Recomendamos grupos de entre 4 y 10 personas.",
          },
        },
        {
          "@type": "Question",
          name: "¿Podemos jugar a distancia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "¡Claro! Podéis usar una videollamada (Zoom, Meet, Discord) para hablar y veros las caras, y usar esta web para gestionar las cartas y votaciones.",
          },
        },
        {
          "@type": "Question",
          name: "¿Dónde puedo ver las reglas completas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Las reglas están explicadas en la propia web. Cómo se juega: Recibe tu palabra (todos excepto el Impostor la ven), Describe y Debate (cada uno da pistas, el Impostor finge), Vota y Gana (expulsáis al sospechoso; si atrapan al Impostor ganan los amigos, si escapa gana él).",
          },
        },
      ],
    },
    // BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: siteUrl,
        },
      ],
    },
  ],
}

// Loading component optimizado con CSS crítico
function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: 'oklch(0.98 0.002 0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <div className="animate-pulse">
        <div
          className="w-16 h-16 rounded-full mx-auto mb-4"
          style={{
            width: '4rem',
            height: '4rem',
            backgroundColor: 'oklch(0.205 0 0)',
            borderRadius: '50%',
            margin: '0 auto 1rem auto'
          }}
        ></div>
        <div
          className="h-4 rounded mx-auto"
          style={{
            height: '1rem',
            backgroundColor: 'oklch(0.97 0 0)',
            borderRadius: '0.25rem',
            width: '8rem',
            margin: '0 auto'
          }}
        ></div>
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" dir="ltr" suppressHydrationWarning>
      <head>
        {/* CSS crítico inline para mejor FCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html { line-height: 1.15; -webkit-text-size-adjust: 100%; }
            body {
              margin: 0;
              font-family: system-ui, -apple-system, sans-serif;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            .min-h-screen { min-height: 100vh; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .bg-background { background-color: oklch(0.98 0.002 0); }
            .p-4 { padding: 1rem; }
            .animate-pulse {
              animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: .5; }
            }
          `
        }} />
        {/* Meta Description - Asegurar que Lighthouse la detecte */}

        {/* Viewport optimizado */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />

        {/* Preconnect y preload para optimización crítica */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload font crítica para mejor LCP */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Pangolin&display=swap" as="style" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pangolin&display=swap" />

        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />


        {/* Preload recursos críticos para mejor LCP */}

        {/* Resource hints para optimizar conexiones */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Geo Tags para SEO local */}
        <meta name="geo.region" content="UY" />
        <meta name="geo.placename" content="Uruguay" />

        {/* Seguridad adicional */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://www.googletagmanager.com;" />
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />

        {/* Dublin Core Metadata - competir con impostor.me, diferenciador gratis sin publicidad */}
        <meta name="DC.title" content="Juego Impostor Online Gratis - Jugar a El Impostor con Amigos | 100% Gratis Sin Publicidad" />
        <meta name="DC.creator" content="Pablo Carvalho" />
        <meta name="DC.subject" content="juego impostor online gratis, jugar a el impostor con amigos, impostor gratis sin publicidad, juego viral tiktok instagram, juego de deducción, quien es el impostor" />
        <meta name="DC.description" content="Juego Impostor online gratis, sin publicidad. El juego viral de TikTok e Instagram. Juega a El Impostor con amigos: 100% gratis, sin descargas." />
        <meta name="DC.language" content="es" />
        <meta name="DC.type" content="InteractiveResource" />

        {/* Favicon con soporte para temas claro/oscuro - SVG se adapta automáticamente */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        {/* Nota: El SVG usa currentColor con media queries CSS internas para adaptarse al tema */}
      </head>
      <body className={`${pangolin.variable} ${pangolin.className} antialiased`}>
        {/* SVG filters for doodle effects */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
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
        
        {/* Main content with semantic markup */}
        <main id="main-content">
          {children}
        </main>
        
        {/* SEO content for crawlers - estrategia impostor.me, diferenciador: 100% gratis sin publicidad */}
        <div className="sr-only">
          <h1>Juego Impostor Online Gratis - Jugar a El Impostor con Amigos | 100% Gratis Sin Publicidad</h1>
          <p>
            Juego Impostor online gratis, sin publicidad. El juego viral de TikTok e Instagram. ¿Quién es el impostor?
            Juega a El Impostor con amigos: mecánica de roles ocultos, partidas rápidas de deducción.
            Recibe tu palabra, describe y debate, vota y gana. 100% gratis, sin publicidad, sin descargas. Sin directores de juego.
            El mejor juego para reuniones online. Compatible con móviles y navegador. Grupos de 4 a 10 personas.
          </p>
          <nav>
            <a href="/">Inicio - Juego Impostor Online Gratis - Jugar a El Impostor con Amigos</a>
          </nav>
        </div>
        
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
