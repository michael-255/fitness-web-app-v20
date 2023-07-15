import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({ autoImportComponentCase: 'pascal' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  /**
   * This should be your GitHub repo name. You can find it on the GitHub URL.
   * @example
   * https://github.com/my-username/my-app-repo
   * my-app-repo
   */
  base: '/fitness-web-app-v20/',
})
