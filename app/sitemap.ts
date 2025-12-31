import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://impostor.pablocarvalho.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()
  
  return [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          es: siteUrl,
          'es-ES': siteUrl,
          'es-AR': siteUrl,
          'es-MX': siteUrl,
          'es-CO': siteUrl,
          'es-CL': siteUrl,
          'es-UY': siteUrl,
        },
      },
    },
  ]
}





