import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // 将 /api 请求转发到 Express 后端（PostGIS 空间分析）
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      // 将 /geoserver 请求转发到 GeoServer，避免前端跨域问题
      '/geoserver': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
