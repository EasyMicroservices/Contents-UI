import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'EContent',
      // the proper extensions will be added
      fileName: 'EContent'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
