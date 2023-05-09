const http = require('http');
const fs = require('fs');

/*
// This reads a file synchronously and sends it as an attachment - ie download.

const server = http.createServer(function (req, res) {
  const json = fs.readFileSync('./log.json', 'utf8');
  console.log(json);
  res.writeHead(200, 'OK', {
    'Content-Type': 'application/json',
    'Content-Disposition': 'attachment; "filename=log.json"'
  })
  res.write(json);
  res.end();
});
*/

// Read a file as a stream, and pipe it to response.
const server = http.createServer(function (req, res) {
  const stream = fs.createReadStream('./log.json', 'utf8');

  res.writeHead(200, 'OK', {
    'Content-Type': 'application/json',
    'Content-Disposition': 'attachment; "filename=log.json"'
  })

  stream.pipe(res);
})

server.listen(8080);