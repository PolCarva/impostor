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
  // Metadatos básicos
  title: {
    default: "El Impostor - El Juego del Verano 2026",
    template: "%s | El Impostor - El Juego del Verano 2026",
  },
  description: "¡El juego del verano 2026! Juego de fiesta gratis donde un impostor debe descubrir la palabra secreta. Perfecto para amigos y familia.",
  
  // Keywords para SEO
  keywords: [
    // Principales - Juego del verano 2026
    "juego del verano 2026",
    "el juego del verano 2026",
    "verano 2026",
    "juego verano 2026",
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
    // Relacionados - manteniendo algunos de juego de fiesta
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
    "juego del verano 2026 impostor",
    "juego tipo among us con palabras",
    "juego para jugar en grupo",
    "juego de preguntas impostor",
    "quien es el impostor juego",
    // Español
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

  // Open Graph para redes sociales
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["es_AR", "es_MX", "es_CO", "es_CL", "es_UY"],
    url: siteUrl,
    siteName: "El Impostor - El Juego del Verano 2026",
    title: "El Impostor - ¡El Juego del Verano 2026!",
    description: "¡El juego del verano 2026! Descubre quién es el impostor en este juego de fiesta gratis donde un jugador debe descubrir la palabra secreta sin ser descubierto. Perfecto para grupos de amigos, familia y reuniones. ¡Diversión garantizada para todos!",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "El Impostor - El Juego del Verano 2026 - Encuentra al impostor entre tus amigos",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@pablocarvalho",
    creator: "@pablocarvalho",
    title: "El Impostor - ¡El Juego del Verano 2026!",
    description: "¡El juego del verano 2026! Descubre quién es el impostor en este juego de fiesta gratis perfecto para grupos de amigos y familia. ¿Podrás encontrar al impostor?",
    images: {
      url: `${siteUrl}/og.png`,
      alt: "El Impostor - El Juego del Verano 2026 - Encuentra al impostor",
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

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // WebSite Schema
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "El Impostor - El Juego del Verano 2026",
      description: "El juego del verano 2026. El mejor juego de fiesta gratis. Encuentra al impostor entre tus amigos.",
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
      name: "El Impostor",
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
      name: "El Impostor",
      alternateName: ["Impostor Game", "Juego del Impostor", "The Impostor"],
      description: "El juego del verano 2026. Juego de fiesta donde un jugador es el impostor y debe descubrir la palabra secreta sin ser descubierto. Perfecto para grupos de amigos, familia y fiestas.",
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
        minValue: 3,
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
      name: "El Impostor - Juego del Verano 2026 | Encuentra al Impostor",
      description: "¡El juego del verano 2026! Juega gratis al Impostor, el mejor juego de fiesta y reuniones. Un jugador es el impostor y debe descubrir la palabra secreta sin ser descubierto.",
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
    // FAQPage Schema para SEO
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué es el juego del Impostor?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El Impostor es un juego de fiesta donde todos los jugadores reciben una palabra secreta, excepto uno: el impostor. El impostor debe descubrir cuál es la palabra sin ser descubierto, mientras los demás intentan identificarlo.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuántos jugadores se necesitan para jugar al Impostor?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Se necesitan mínimo 3 jugadores para jugar al Impostor. El juego es más divertido con grupos de 5 a 10 personas, y puede jugarse con hasta 20 jugadores.",
          },
        },
        {
          "@type": "Question",
          name: "¿El juego del Impostor es gratis?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "¡Sí! El Impostor es completamente gratis. No necesitas descargar nada, solo abre la página web y comienza a jugar con tus amigos.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo se juega al Impostor?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cada jugador mira su carta en secreto. Todos excepto el impostor ven la palabra secreta. Por turnos, cada jugador da una pista sobre la palabra. Después de las rondas, todos votan para descubrir quién es el impostor.",
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

        {/* Cargar CSS de forma no bloqueante usando script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var link = document.createElement('link');
                link.rel = 'preload';
                link.href = '/_next/static/css/app/layout.css';
                link.as = 'style';
                link.onload = function() {
                  this.rel = 'stylesheet';
                };
                document.head.appendChild(link);
              })();
            `
          }}
        />

        {/* Preload recursos críticos para mejor LCP */}
        <link rel="preload" href="/og.png" as="image" type="image/jpeg" />

        {/* Preload chunks críticos de Next.js */}
        <link rel="modulepreload" href="/_next/static/chunks/webpack.js" />
        <link rel="modulepreload" href="/_next/static/chunks/main.js" />

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
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com;" />
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />

        {/* Dublin Core Metadata */}
        <meta name="DC.title" content="El Impostor - El Juego del Verano 2026" />
        <meta name="DC.creator" content="Pablo Carvalho" />
        <meta name="DC.subject" content="Juego del verano 2026, juego de fiesta, juego de palabras, impostor, party game" />
        <meta name="DC.description" content="El juego del verano 2026. Juego de fiesta gratis donde un jugador es el impostor" />
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
        
        {/* SEO content for crawlers - visible but styled minimally */}
        <div className="sr-only">
          <h1>El Impostor - Juego del Verano 2026 | Encuentra al Impostor</h1>
          <p>
            El Impostor es el juego del verano 2026. El mejor juego de fiesta gratis online. Juega con tus amigos y familia
            a encontrar al impostor. Un jugador es el impostor y debe descubrir la palabra secreta
            sin ser descubierto. Perfecto para reuniones, fiestas de cumpleaños, y momentos con amigos.
            Similar a Among Us pero con palabras. Disponible gratis, sin descargas, directamente en tu navegador.
            Juego de deducción social para grupos de 3 a 20 jugadores. El juego del verano 2026 es perfecto
            para jugar en grupo, ideal para fiestas y reuniones familiares. Descubre quién es el impostor
            mientras intentas adivinar la palabra secreta. Juego de palabras interactivo y divertido.
          </p>
          <nav>
            <a href="/">Inicio - El Impostor - El Juego del Verano 2026</a>
          </nav>
        </div>
        
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
