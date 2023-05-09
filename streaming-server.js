const fs = require('fs');
const http = require('http');
const zlib = require('zlib');

/*
http.createServer((req, res) => {
  res.writeHead(200, { 'content-encoding': 'gzip'});
  fs.createReadStream(__dirname+'/index.html').pipe(zlib.createGzip()).pipe(res);
}).listen(8000)
*/

let server = new http.Server();

server.listen(8080);

server.on('connection', function (socket) {
  console.log("Client arrived: " + new Date());
  socket.on("end", function() {
      console.log("Client left: " + new Date());
  });
});

server.on('request', function (req, res) {
  req.on("readable", function() {
    console.log(req.read())
  });
})

server.setTimeout(2000, function (socket) {
  socket.write("too slow!", "utf8");
  socket.end()
})