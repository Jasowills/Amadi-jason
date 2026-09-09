import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    modulePreload: false,
    rollupOptions: {
      output: {
        // Isolate animation libs: only below-fold lazy chunks + deferred
        // refresh import them, so they never parse during initial load.
        manualChunks: {
          "gsap-vendor": ["gsap", "gsap/ScrollTrigger"],
        },
      },
    },
  },
  server: {
    port: 5174,
  },
})
