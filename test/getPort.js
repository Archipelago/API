#!/usr/bin/env node

let net = require('net');

let server = new net.createServer();
server.listen(function() {
  console.log(server.address().port);
  process.exit(0);
});
