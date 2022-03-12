
import dotenv from 'dotenv';
dotenv.config();
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import eslintPlugin from 'vite-plugin-eslint';
import viteStylelint from '@amatlash/vite-plugin-stylelint';

const { PORT = 3001 } = process.env;

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
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  }
});
