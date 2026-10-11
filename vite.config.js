import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration — React plugin enables fast refresh + JSX transforms.
export default defineConfig({
  plugins: [react()],
});