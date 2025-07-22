// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  site: 'https://nachosizle.github.io',
  base: '/Japan-2025-Trip',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [alpinejs()]
});