import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Ou tout autre port que vous utilisez
    strictPort: true,
    host: true, // Cela permet de lier à toutes les adresses IP
  },
})
