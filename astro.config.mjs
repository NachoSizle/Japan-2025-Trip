// @ts-check

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import VitePWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://nachosizle.github.io',
  base: '/Japan-2025-Trip',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    alpinejs(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'offline.html'],
      manifest: {
        name: 'Japan 2025 Trip',
        short_name: 'JapanTrip',
        description: 'Itinerario, frases útiles y guía sin gluten para el viaje a Japón.',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        navigateFallback: '/offline.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: /^\/icons\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'icons',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },
          {
            urlPattern: /^\/(itinerario|gluten-free|frases)/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 7 }
            }
          }
        ]
      }
    })
  ]
});