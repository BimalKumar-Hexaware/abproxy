/*var httpProxy = require('http-proxy');
httpProxy.createProxyServer({target:'http://172.25.142.36:8080'}).listen(443, function() {
	console.log("proxy listening on port 443");
});
var httpProxy = require('http-proxy');
httpProxy.createProxyServer({target:'http://172.25.142.36:8880'}).listen(3412, function() {
	console.log("proxy listening ojn port 3412");
});


'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
var port = 3412;

// Restream parsed body before proxying
proxy.on('proxyReq', function (proxyReq, req, res, options) {
  if (req.body) {
    let bodyData = JSON.stringify(req.body);
    // In case if content-type is application/x-www-form-urlencoded -> we need to change to application/json
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    // Stream the content
    proxyReq.write(bodyData);
  }
});

const proxyApp = express();
proxyApp.use(bodyParser.json());
proxyApp.use(bodyParser.urlencoded({ extended: true }));
proxyApp.use(function (req, res) {
  // ... do some stuff
  // ... log your body and something else
  console.log('proxy body:', req.body)
  proxy.web(req, res, {
    target: 'http://172.25.142.36:8080'
  })
});

http.createServer(proxyApp).listen(port, () => {
  console.log('Proxy server linsten on ' + port);
});*/


var httpProxy = require('http-proxy');
//var https = require('https');
var http = require('http');
var port = 3412;
var proxy = new httpProxy.createProxyServer({});

before: var start_time = 0;
var proxyServer = http.createServer(function (req, res) {

    // now
    var start_time = new Date().getTime();

    proxy.web(req, res, { target: 'http://172.25.142.36:8080' });

    res.on('finish', function() {
       console.log("The request was proxied in " + (new Date().getTime() - start_time) + "ms");
    });
});
proxyServer.listen(port, function() {
	console.log("Proxy listening on port "+port);
});