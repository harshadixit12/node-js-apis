const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  fs.readFile(__dirname + '/index.html', function (err, data) {
    if (err) {
      res.statusCode = 500;
      res.end(JSON.stringify(err));
    }
    else {
      res.end(data);
    }
  })
}).listen(8000);