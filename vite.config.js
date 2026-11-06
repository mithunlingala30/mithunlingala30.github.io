import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',          // correct for mithunlingala30.github.io (user/org Pages repo)
})
