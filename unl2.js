//const http = require('node:http');
const http = require('http');

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on('request', (req, res) => {
  console.log(`req.url =>` + req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(`Requst req.url ==>` + req.url);
  res.end();
  //res.writeHead(200, { 'Content-Type': 'application/json' });
  //res.end(JSON.stringify({
  //  data: 'Hello World!'
  //}));
});

console.log(`Server listening on 8000`);
server.listen(8000);