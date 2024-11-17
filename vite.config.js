import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import sass from 'sass';
import path from "path"

// Vite configuration
// export default defineConfig({
//   plugins: [react()],
//   css: {
//     preprocessorOptions: {
//       sass: {
//         additionalData: `@import "src/styles/variables.scss";`,
//       },
//     },
//   },
// });

// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
    // css: {
    //     preprocessorOptions: {
    //       sass: {
    //         additionalData: `@import "src/styles/variables.scss";`,
    //       },
    //     },
    //   },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
