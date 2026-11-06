
// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [react()],

  vite: {
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
