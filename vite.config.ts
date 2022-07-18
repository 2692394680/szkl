import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  base: './',
  server: {
    cors: true,
    proxy: {},
    host: '0.0.0.0'
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true;@import(reference) "${resolve('src/styles/variables.less')}";`
        }
      }
    }
  }
})
