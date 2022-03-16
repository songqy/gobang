import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: [sveltePreprocess({ typescript: true })]
    })
  ],
  server:{
    port:  Number(process.env.PORT) || 3100,
  },
});
