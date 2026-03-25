import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/co2': {
        target: 'https://prod.nabi.dev',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})