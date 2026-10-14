import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

function photoSyncPlugin() {
  return {
    name: 'photo-sync-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/sync-photos-to-disk', (req: any, res: any) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body || '{}');
              const photos = parsed.photos || {};
              const imagesDir = path.resolve(__dirname, 'public/images');
              if (!fs.existsSync(imagesDir)) {
                fs.mkdirSync(imagesDir, { recursive: true });
              }
              const savedList: string[] = [];
              for (const [key, val] of Object.entries(photos)) {
                if (typeof val === 'string' && val.startsWith('data:image')) {
                  const matches = val.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
                  if (matches) {
                    const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
                    const buffer = Buffer.from(matches[2], 'base64');
                    fs.writeFileSync(path.join(imagesDir, `${key}.${ext}`), buffer);
                    if (ext !== 'jpg') {
                      fs.writeFileSync(path.join(imagesDir, `${key}.jpg`), buffer);
                    }
                    savedList.push(key);
                  }
                }
              }
              fs.writeFileSync(path.join(imagesDir, 'manifest.json'), JSON.stringify(savedList, null, 2));
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, saved: savedList }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          res.statusCode = 404;
          res.end();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), photoSyncPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
