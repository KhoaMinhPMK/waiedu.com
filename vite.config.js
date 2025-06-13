import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html'
      }
    }
  },  server: {
    // Cho phép dev server lắng nghe trên mọi host
    host: '0.0.0.0',
    port: 3000,
    // Tắt auto open browser vì sẽ dùng domain public
    open: false,
    // Cho phép tất cả domains để Cloudflare tunnel hoạt động
    allowedHosts: ['localhost', '127.0.0.1', 'waiedu.live', '.waiedu.live'],
    // Cấu hình để hỗ trợ proxy
    proxy: {},
    // Cho phép CORS
    cors: true,
    // HMR qua websocket
    hmr: {
      port: 3000,
      host: 'localhost'
    }
  },
  css: {
    devSourcemap: true
  }
})
