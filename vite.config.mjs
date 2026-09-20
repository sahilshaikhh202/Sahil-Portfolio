import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import githubActivityHandler from './api/github-activity.js';

const githubActivityApi = () => ({
  name: 'github-activity-api',
  configureServer(server) {
    server.middlewares.use('/api/github-activity', async (request, response, next) => {
      if (request.method !== 'GET') {
        next();
        return;
      }

      const apiResponse = {
        setHeader: (name, value) => response.setHeader(name, value),
        status: (code) => {
          response.statusCode = code;
          return apiResponse;
        },
        json: (payload) => {
          response.setHeader('Content-Type', 'application/json');
          response.end(JSON.stringify(payload));
        },
      };

      await githubActivityHandler(request, apiResponse);
    });
  },
});

export default defineConfig({
  plugins: [react(), githubActivityApi()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 4173,
  }
});
