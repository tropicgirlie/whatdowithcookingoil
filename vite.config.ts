import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'OilCycle',
        short_name: 'OilCycle',
        description: 'Find where to recycle your used cooking oil in Ireland.',
        theme_color: '#1f6b3a',
        background_color: '#f6f5f0',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Cache the points JSON aggressively so the app works offline.
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/points'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'oilcycle-points',
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
          {
            urlPattern: /^https:\/\/tile\.openstreetmap\.org\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'osm-tiles',
              expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Proxy API calls to the local wrangler dev worker on :8787
      '/api': 'http://localhost:8787',
    },
  },
})
