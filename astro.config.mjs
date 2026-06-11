// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Absolute URLs for hreflang/canonical/OG. Keep in sync with the deployed origin.
  site: 'https://ai-adoption-tools.vercel.app',
  integrations: [react()],
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
