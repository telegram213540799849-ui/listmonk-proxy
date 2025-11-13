export default async function handler(req, res) {
  try {
    // Catch-all path after /api/proxy
    const path = req.query.path ? '/' + req.query.path.join('/') : '';
    
    // Your Listmonk server (replace IP and port if different)
    const targetUrl = `http://129.151.230.246:9000${path}`;

    // Forward the request
    const response = await fetch(targetUrl);
    const buffer = await response.arrayBuffer();

    // Forward response headers and status
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
    res.status(response.status).send(Buffer.from(buffer));
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
  }
}
