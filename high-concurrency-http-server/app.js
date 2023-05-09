'use strict'

const redis = require('redis');
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const port = 8080;
const redisClient = redis.createClient();
const app = express();
const connections = {};

app.use(cookieParser());

app.get('/cookie-monster', function (req, res) {
  res.end(req.cookies.node_cookie);
});


app.get('/poll', function(request, response){
  console.log('hello');
  var id = request.cookies.node_poll_id;
  if(!id) {
      return;
  }
  connections[id] = response;
});


app.get('/', function(request, response) {
  fs.readFile('./ui.html', function(err, data) {
      response.cookie('node_poll_id', Math.floor(Math.random() * 10e10));
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(data);
  });
});


var broadcast = function(msg) {
  var conn;
  for(conn in connections) {
      connections[conn].end(msg);
  }
}

process.stdin.on('data', function(data) {
  console.log(connections);
  var msg = data;
  console.error(msg.toString());
  msg && broadcast(msg.toString());
});


app.listen(port);
