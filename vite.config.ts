import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		outDir: 'build',
		emptyOutDir: true
	},
	server: {
		port: 5173,
		host: true
	}
});
