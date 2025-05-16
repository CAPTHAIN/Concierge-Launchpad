import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser'
    }
  },
  build: {
    target: 'esnext'
  },
  define: {
    global: {}
  },
  server: {
    port: 3000
  }
})
