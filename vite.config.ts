import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
	base: '/edb/',
	plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
	build: { outDir: 'build' },
	server: { open: false, port: 3000 }
});
