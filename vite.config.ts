// vite.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    env: {
      ELASTICSEARCH_NODE: 'http://localhost:9200',
    },
    coverage: {
      provider: 'istanbul', // or 'c8'
      exclude: ['**/sample/**'],
    },
  },
})
