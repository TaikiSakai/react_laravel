import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import route from '@generouted/react-router'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  }
})
