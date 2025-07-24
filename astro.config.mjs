import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import solid from '@astrojs/solid-js';
import VitePWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://nachosizle.github.io',
  base: '/Japan-2025-Trip/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    solid(),
    VitePWA({
      includeAssets: ['favicon.svg', 'robots.txt', 'offline.html', 'icons/icon-192x192.png', 'icons/icon-512x512.png'],
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
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,json,txt,woff2}'],
        navigateFallback: '/Japan-2025-Trip/offline.html',
        runtimeCaching: [
          {
            urlPattern: /\/assets\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
            },
          },
        ],
        // Habilitar eventos de push
        skipWaiting: true,
        clientsClaim: true,
      }
    })
  ]
});