export default async function handler(req, res) {
  try {
    // req.query.path is an array of all path segments after /api/proxy
    const path = req.query.path ? '/' + req.query.path.join('/') : '';
    const targetUrl = `http://129.151.230.246:9000${path}`;

    const response = await fetch(targetUrl);
    const buffer = await response.arrayBuffer();

    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
    res.status(response.status).send(Buffer.from(buffer));
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
  }
}
