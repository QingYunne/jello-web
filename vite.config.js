import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '~': '/src'
    }
  },
  server: {
    host: '0.0.0.0', // Cho phép truy cập từ network
    port: 5173, // Port mặc định của Vite
    strictPort: true
  }
})
