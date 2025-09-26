import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/stock_manager_log_in_ui/', // tem de ser o nome do teu repositório no GitHub
})
