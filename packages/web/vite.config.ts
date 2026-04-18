import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig, type UserConfig } from 'vite'

export default defineConfig(({ mode }): UserConfig => {
  const enableSourcemap = mode === 'development' || process.env.VITE_SOURCEMAP === 'true'

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: process.env.PORT ? Number(process.env.PORT) : 5173,
      open: false,
    },
    build: {
      sourcemap: enableSourcemap,
      target: 'es2023',
    },
  }
})
