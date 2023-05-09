'use strict';

var events = require('events');
var http = require('http');
var crypto = require('crypto');
var util = require('util');

var opcodes = {
    TEXT: 1,
    CLOSE: 8,
    PING: 9,
    PONG: 10
};

var WebSocketConnection = function(req, socket, upgradeHead) {
    var self = this;

    var key = hashWebSocketKey(req.headers["sec-websocket-key"]);

    socket.write(
        'HTTP/1.1 101 Web Socket Protocol Handshake \r\n' + 
        'Upgrade: WebSocket\r\n' +
        'Connection: Upgrade\r\n' +
        'sec-websocket-accept: ' + key +
        '\r\n\r\n'
    );

    socket.on("data", function (buf) {
        self.buffer = Buffer.concat([self.buffer, buf]);
        while(self._processBuffer()) {
            // 
        }
    });

    socket.on("close", function(had_error) {
        if (!self.closed) {
            self.emit("close", 1006);
            self.closed = true;
        }
    })

    this.socket = socket;
    this.buffer = new Buffer(0);
    this.closed = false;
}

util.inherits(WebSocketConnection, events.EventEmitter);

WebSocketConnection.prototype.send = function (obj) {
    var opcode, payload;

    if (Buffer.isBuffer(obj)) {
        opcode = opcodes.BINARY;
        payload = obj;
    }
    else if (typeof obj === 'string') {
        opcode = opcodes.TEXT;
        payload = new Buffer(obj, "utf8");
    }
    else {
        throw new Error('Cannot send object. Must be string or buffer');
    }

    this._doSend(opcode, payload);
}

WebSocketConnection.prototype.close = function (code, reason) {
    var opcode = opcodes.CLOSE;
    var buffer;

    if (code) {
        buffer = new Buffer(Buffer.byteLength(reason) + 2);
        buffer.writeUInt16BE(code, 0);
        buffer.write(reason, 2);
    }
    else {
        buffer = new Buffer(0);
    }

    this._doSend(opcode, buffer);
    this.closed = true;
}