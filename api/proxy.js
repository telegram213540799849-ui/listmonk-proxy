import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const targetUrl = `http://129.151.230.246:9000${req.url}`;
    const response = await fetch(targetUrl);
    const body = await response.arrayBuffer();

    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
    res.status(response.status).send(Buffer.from(body));
  } catch (err) {
    res.status(500).send('Proxy error');
    console.error(err);
  }
}
