#!/usr/bin/env node

let http = require('http');

let data = JSON.stringify({
  login: 'root',
  password: 'foobar42'
});
let req = http.request({hostname: 'localhost',
			port: process.env.PORT || 8080,
			path: '/register',
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  'Content-Length': data.length
			}}, function(res) {
			  if (res.statusCode !== 201)
			    process.exit(1);
			});

req.write(data);
