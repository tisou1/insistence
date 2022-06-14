// import { defineConfig } from 'vite'
// import preact from '@preact/preset-vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [preact()]
// })


/// <reference types="vitest" />

import * as path from 'path'
import { defineConfig } from 'vite'
//热更新模块插件
import preact from '@preact/preset-vite'
//文件路由
import Unocss from 'unocss/vite'
//click to component

export default defineConfig({
  resolve:{
    alias: {
      '~/': `${path.resolve(__dirname,'src')}/`,
    }
  },
  plugins: [
    preact(),
    Unocss(),
  ],
  test: {
    environment: 'jsdom',
    include: ['test/**/*.test.{ts,js}'],
  }
})