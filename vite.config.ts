import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import eslintPlugin from 'vite-plugin-eslint'
import {fileURLToPath, URL} from 'url'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    plugins: [
        eslintPlugin({cache: false}),
        vue({
            template: { transformAssetUrls }
        }),

        quasar({
            sassVariables: 'src/css/index.sass',
        }),
    ]
})
