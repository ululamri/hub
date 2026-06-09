import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

function normalizeBasePath(value) {
  if (!value || value === '/') return '';
  const path = value.startsWith('/') ? value : `/${value}`;
  return path.replace(/\/$/, '');
}

function adapterFallback(basePath) {
  if (!basePath) return 'spa.html';
  return `${basePath.slice(1)}/spa.html`;
}

const hubBasePath = normalizeBasePath(process.env.PUBLIC_HUB_BASE_PATH ?? '');

const prerenderEntries = ['/', '/resources', '/missions'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: adapterFallback(hubBasePath)
    }),
    paths: {
      base: hubBasePath
    },
    prerender: {
      entries: prerenderEntries
    }
  }
};

export default config;
