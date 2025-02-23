import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RasamIot',
    short_name: 'RasamIot',
    description: 'Factory data monitoring and reporting',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
        {
            src: '/favicon.ico',
            sizes: 'any',
            type: 'image/x-icon',
        },
    ],
  }
}