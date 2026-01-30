import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    https: (() => {
      try {
        // Try to load SSL certificates if they exist
        const keyPath = path.resolve(__dirname, 'localhost-key.pem');
        const certPath = path.resolve(__dirname, 'localhost.pem');
        
        if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
          return {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath),
          };
        }
      } catch (error) {
        console.log('⚠️  SSL certificates not found. Run "npm run setup-ssl" to generate them.');
      }
      return false;
    })(),
  },
  define: {
    'process.env': process.env
  }
})