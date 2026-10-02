import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the build works under a sub-path (GitHub Pages: /Project-3-Mustang/)
  base: './',
})
