import { createServer } from 'http';
import fetch from 'node-fetch';

const PORT = process.env.PORT || 3000;

createServer(async (req, res) => {
  try {
    // Change this URL to your Listmonk tracking endpoint
    const targetUrl = `http://129.151.230.246:9000${req.url}`;

    const response = await fetch(targetUrl);
    const body = await response.arrayBuffer();

    // Copy headers from the original response
    res.writeHead(response.status, {
      'Content-Type': response.headers.get('content-type') || 'application/octet-stream',
    });

    res.end(Buffer.from(body));
  } catch (err) {
    res.writeHead(500);
    res.end('Proxy error');
    console.error(err);
  }
}).listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
