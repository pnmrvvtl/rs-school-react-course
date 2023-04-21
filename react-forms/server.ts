import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3333;

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      //read index.html
      let page = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      page = await vite.transformIndexHtml(url, page);
      //divide on parts
      const parts = page.split(`<!--react-components-ssr-->`);
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      //send as response
      const { pipe } = await render(url, {
        onShellReady() {
          res.write(parts[0]);
          pipe(res);
        },
        onAllReady() {
          res.write(parts[1]);
          res.end();
        },
      });
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
  app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
}
createServer();
