import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Static SPA build: server hanya menyajikan file statis (dibalik Caddy).
		// fallback index.html dipakai karena app ini client-rendered penuh
		// (state device/MAC/IP dari query param, tidak butuh SSR).
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: false
		})
	}
};

export default config;
