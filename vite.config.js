import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tic-tac-toe',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '@components': fileURLToPath(new URL('src/components', import.meta.url)),
      '@services': fileURLToPath(new URL('src/services', import.meta.url)),
      '@shared': fileURLToPath(new URL('src/shared', import.meta.url)),
      '@stores': fileURLToPath(new URL('src/stores', import.meta.url)),
    }
  }
})
