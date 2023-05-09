const http = require('http');
const net = require('net');
const url = require('url');
/*
const server = new http.Server();

Single target proxy
server.on('request', function (request, socket) {
  http.request({
   host: 'www.google.co.in',
   method: 'GET',
   port: 80,
   path: '/' 
  }, function (response) {
    response.pipe(socket);
  }).end();
});

server.listen(8080);

server.on('error', function (err) {
  console.log(err);
})
*/

/**
 * Multiple target proxy - tunneling.
 * 
 * Involves a proxy acting as intermediary between client and remote server
 */
const proxy = new http.Server();

proxy.on('connect', function (request, clientSocket, head) {
  const reqData = url.parse('http://', )
});

