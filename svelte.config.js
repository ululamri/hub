import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

function normalizeBasePath(value) {
  if (!value || value === '/') return '';
  const path = value.startsWith('/') ? value : `/${value}`;
  return path.replace(/\/$/, '');
}

const hubBasePath = normalizeBasePath(process.env.PUBLIC_HUB_BASE_PATH ?? '');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: 'index.html'
    }),
    paths: {
      base: hubBasePath
    },
    prerender: {
      entries: ['*']
    }
  }
};

export default config;
