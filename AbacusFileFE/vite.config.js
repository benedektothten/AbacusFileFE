import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://abacus-files-a2fvfefqh6gxh0d0.northeurope-01.azurewebsites.net',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
