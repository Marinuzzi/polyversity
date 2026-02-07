import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Per subdomain: polyversity.marinuzzi.it → basePath vuoto
// Per path: marinuzzi.it/polyversity → BASE_PATH=/polyversity npm run build
const basePath = process.env.BASE_PATH || '';

export default defineConfig({
  site: 'https://polyversity.marinuzzi.it',
  base: basePath,
  vite: {
    define: {
      'import.meta.env.BASE_PATH': JSON.stringify(basePath),
      'import.meta.env.PUBLIC_USE_EXTERNAL_FORM': JSON.stringify(process.env.PUBLIC_USE_EXTERNAL_FORM === 'true'),
      'import.meta.env.PUBLIC_EXTERNAL_FORM_URL': JSON.stringify(process.env.PUBLIC_EXTERNAL_FORM_URL || ''),
      'import.meta.env.PUBLIC_APPLY_ENDPOINT': JSON.stringify(process.env.PUBLIC_APPLY_ENDPOINT || '/api/apply'),
      'import.meta.env.PUBLIC_VIDEO_PURCHASE_URL': JSON.stringify(process.env.PUBLIC_VIDEO_PURCHASE_URL || ''),
    },
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
