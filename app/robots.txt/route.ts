import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `# robots.txt para El Impostor Gratis - Juego del Verano 2026 Online
# https://impostor.gratis

# Permitir todos los crawlers
User-agent: *
Allow: /

# Sitemap
Sitemap: https://impostor.gratis/sitemap.xml

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Google Images
User-agent: Googlebot-Image
Allow: /

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Yandex
User-agent: Yandex
Allow: /
Crawl-delay: 2

# DuckDuckGo
User-agent: DuckDuckBot
Allow: /

# Baidu
User-agent: Baiduspider
Allow: /
Crawl-delay: 2

# Archivos que no necesitan indexación
Disallow: /api/
Disallow: /_next/static/
Disallow: /_next/image

# Host preferido
Host: https://impostor.gratis
`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache por 24 horas
    },
  })
}




