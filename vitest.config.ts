import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    css: { include: [/styles\.css/] },
    setupFiles: ['./src/test/setup.ts'],
  },
})
