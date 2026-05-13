import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';

export default defineConfig({
  srcDir: './app/src',
  output: 'server',
  adapter: cloudflare(),
  session: {
    driver: 'memory',
  },
});
