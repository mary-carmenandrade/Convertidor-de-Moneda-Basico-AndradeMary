const http = require('http');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile('vista.html', 'utf8', (err, data) => {
      res.end(data);
    });
  } else if (req.method === 'POST' && req.url === '/convert') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const dolares = parseFloat(body.split('=')[1]);
      const cambio = 0.92; // Tasa de cambio: 1 dólar = 0.92 euros
      const euros = dolares * cambio;
      res.end(`<p>${dolares} dolares son equivalentes a ${euros.toFixed(2)} euros.</p>`);
    });
  }
}).listen(8080);