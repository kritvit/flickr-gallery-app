
import dotenv from 'dotenv';
dotenv.config();
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import eslintPlugin from 'vite-plugin-eslint';
import viteStylelint from '@amatlash/vite-plugin-stylelint';

const { UI_PORT = 3000, API_PORT = 3001, } = process.env;

export default defineConfig({
  resolve: {
    alias: {
      '@scripts': '/src/common/scripts',
      '@styles': '/src/common/styles',
      '@components': '/src/components',
      '@assets': '/src/assets'
    }
  },
  plugins: [
    legacy({
      targets: ['defaults']
    }),
    eslintPlugin({
      cache: false
    }),
    viteStylelint({
      include: [
        'src/**/*.scss'
      ]
    })
  ],
  server: {
    port: UI_PORT,
    proxy: {
      '/api': {
        target: `http://localhost:${API_PORT}`,
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: UI_PORT,
  }
});
