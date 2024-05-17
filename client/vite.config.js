import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": "https://luxury-dealr.onrender.com",
      "/upload": "https://luxury-dealr.onrender.com",
    },
  },
  plugins: [react()],
});
