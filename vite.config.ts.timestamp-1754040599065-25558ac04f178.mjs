// vite.config.ts
import { defineConfig } from "file:///Users/andikrisnatha/Documents/Web/kaespa/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/andikrisnatha/Documents/Web/kaespa/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///Users/andikrisnatha/Documents/Web/kaespa/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor": ["vue", "vue-router", "pinia"],
          "ui": ["@vueuse/core", "@vueuse/head"]
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        }
      }
    },
    // Enable minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Enable source maps in production
    sourcemap: true,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Enable assets optimization
    assetsInlineLimit: 4096,
    // Enable chunk size warning limit
    chunkSizeWarningLimit: 1e3
  },
  server: {
    // Enable HMR
    hmr: true,
    // Enable CORS
    cors: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYW5kaWtyaXNuYXRoYS9Eb2N1bWVudHMvV2ViL2thZXNwYVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FuZGlrcmlzbmF0aGEvRG9jdW1lbnRzL1dlYi9rYWVzcGEvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FuZGlrcmlzbmF0aGEvRG9jdW1lbnRzL1dlYi9rYWVzcGEvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIGRlZmluZToge1xuICAgIF9fVlVFX1BST0RfSFlEUkFUSU9OX01JU01BVENIX0RFVEFJTFNfXzogZmFsc2UsXG4gICAgX19WVUVfT1BUSU9OU19BUElfXzogdHJ1ZSxcbiAgICBfX1ZVRV9QUk9EX0RFVlRPT0xTX186IGZhbHNlXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICd2ZW5kb3InOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3BpbmlhJ10sXG4gICAgICAgICAgJ3VpJzogWydAdnVldXNlL2NvcmUnLCAnQHZ1ZXVzZS9oZWFkJ11cbiAgICAgICAgfSxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogKHtuYW1lfSkgPT4ge1xuICAgICAgICAgIGlmICgvXFwuKGdpZnxqcGU/Z3xwbmd8c3ZnKSQvLnRlc3QobmFtZSA/PyAnJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnYXNzZXRzL2ltYWdlcy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoL1xcLmNzcyQvLnRlc3QobmFtZSA/PyAnJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnYXNzZXRzL2Nzcy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdJ1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBFbmFibGUgbWluaWZpY2F0aW9uXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIEVuYWJsZSBzb3VyY2UgbWFwcyBpbiBwcm9kdWN0aW9uXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIC8vIEVuYWJsZSBDU1MgY29kZSBzcGxpdHRpbmdcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgLy8gRW5hYmxlIGFzc2V0cyBvcHRpbWl6YXRpb25cbiAgICBhc3NldHNJbmxpbmVMaW1pdDogNDA5NixcbiAgICAvLyBFbmFibGUgY2h1bmsgc2l6ZSB3YXJuaW5nIGxpbWl0XG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIC8vIEVuYWJsZSBITVJcbiAgICBobXI6IHRydWUsXG4gICAgLy8gRW5hYmxlIENPUlNcbiAgICBjb3JzOiB0cnVlXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZTLFNBQVMsb0JBQW9CO0FBQzFVLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWUsV0FBVztBQUZ1SixJQUFNLDJDQUEyQztBQUszTyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUEsRUFDZixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04seUNBQXlDO0FBQUEsSUFDekMscUJBQXFCO0FBQUEsSUFDckIsdUJBQXVCO0FBQUEsRUFDekI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFVBQVUsQ0FBQyxPQUFPLGNBQWMsT0FBTztBQUFBLFVBQ3ZDLE1BQU0sQ0FBQyxnQkFBZ0IsY0FBYztBQUFBLFFBQ3ZDO0FBQUEsUUFDQSxnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0IsQ0FBQyxFQUFDLEtBQUksTUFBTTtBQUMxQixjQUFJLHlCQUF5QixLQUFLLFFBQVEsRUFBRSxHQUFHO0FBQzdDLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGNBQUksU0FBUyxLQUFLLFFBQVEsRUFBRSxHQUFHO0FBQzdCLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsV0FBVztBQUFBO0FBQUEsSUFFWCxjQUFjO0FBQUE7QUFBQSxJQUVkLG1CQUFtQjtBQUFBO0FBQUEsSUFFbkIsdUJBQXVCO0FBQUEsRUFDekI7QUFBQSxFQUNBLFFBQVE7QUFBQTtBQUFBLElBRU4sS0FBSztBQUFBO0FBQUEsSUFFTCxNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
