import { fileURLToPath, URL } from 'node:url';
import Component from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Component({
			dirs: ['src/components/app'],
			dts: true,
		}),
	],
	// mode: 'development', //default.. build시 production
	// mode: 'production', .env보다 우선순위가 높음 .env.[mode]
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
