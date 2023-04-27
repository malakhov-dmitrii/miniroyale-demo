import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
