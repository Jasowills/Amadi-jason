import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // sonar-sdk lazily imports html2canvas, a peer it never declares. In the
  // previous build it was installed, so Rollup resolved the dynamic import
  // and bundled it; now that the dependency is gone, mark the lazy import
  // external so the SDK's own catch branch handles the missing peer at
  // runtime (it falls back to window.html2canvas, then skips screenshots).
  build: {
    rollupOptions: {
      external: ['html2canvas'],
    },
  },
  server: {
    port: 5174,
  },
})
