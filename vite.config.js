import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JSX'], // Añade esta línea si es necesario

  server: {
    host: '0.0.0.0', // Escuchar en todas las interfaces de red
    port: 3000, // Puerto en el que se ejecutará el servidor
  },
});
