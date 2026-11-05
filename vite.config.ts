import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // sonar-sdk lazily imports html2canvas, a peer it never declares. The
  // package ships the catch branch for that missing peer (fall back to
  // window.html2canvas, then skip screenshots), so production keeps the
  // import external and working as designed.
  build: {
    rollupOptions: {
      external: ['html2canvas'],
    },
  },
  server: {
    port: 5174,
  },
  optimizeDeps: {
    // Dev still has to resolve the same lazy import inside the
    // sonar-sdk/browser prebundle. Declaring both here pre-bundles them
    // together, so a cold .vite cache never emits the bare dynamic
    // import as an unresolved specifier or triggers a mid-session
    // re-optimization reload.
    include: ['sonar-sdk/browser', 'html2canvas'],
  },
})
