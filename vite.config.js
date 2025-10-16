import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mp4'],
  server: {
    proxy: {
      '/auth': 'http://127.0.0.1:8000',
      '/payments': 'http://127.0.0.1:8000',
      '/entrenamiento': 'http://127.0.0.1:8000',
      '/nutricion': 'http://127.0.0.1:8000',
    }
  }
})
