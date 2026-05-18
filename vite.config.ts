import { defineConfig } from 'vite';

export default defineConfig({
	base: './',
	build: {
		outDir: 'build',
		emptyOutDir: true
	},
	server: {
		port: 5173,
		host: true
	}
});
