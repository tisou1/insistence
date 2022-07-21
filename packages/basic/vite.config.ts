/// <reference types="vitest" />

import { defineConfig } from 'vite'
import myPlugin from './plugins'

export default defineConfig({
  plugins: [
    myPlugin() as any
  ],

})