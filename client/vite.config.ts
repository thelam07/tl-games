import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// import.meta.dirname: duong dan thu muc chua file config nay

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@shared': new URL('../shared', import.meta.url).pathname,
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  server: {
    port: 5173,
    // Goi /api/... o client -> Vite chuyen tiep sang server 3000.
    // Nho vay khong dinh loi CORS luc dev, va khong phai viet full URL trong code.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    fs: { allow: ['..'] }, // cho phep doc file ngoai thu muc client (thu muc shared)
  },
});
