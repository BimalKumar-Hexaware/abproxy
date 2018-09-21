/*var httpProxy = require('http-proxy');
httpProxy.createProxyServer({target:'http://172.25.142.36:8080'}).listen(443, function() {
	console.log("proxy listening on port 443");
});
var httpProxy = require('http-proxy');
httpProxy.createProxyServer({target:'http://172.25.142.36:8880'}).listen(3412, function() {
	console.log("proxy listening ojn port 3412");
});
//var https = require('https');
*/

var httpProxy = require('http-proxy');
var fs = require('fs');
var https = require('https');
var port = 3412;
var proxy = new httpProxy.createProxyServer({});

before: var start_time = 0;



var options = {
  key: fs.readFileSync("./09102018/cch1udpsda1.key"),
  cert: fs.readFileSync("./09102018/certnew.cer"),
  ca: [
          fs.readFileSync('./09102018/certnew_root.cer'),
          //fs.readFileSync('Bundle.cer')
          fs.readFileSync('./09102018/certnew.cer')
  ]
};

var proxyServer = https.createServer(options, function (req, res) {

	const { headers } = req;
	const userAgent = headers['user-agent'];
	console.log("User-agent - ",userAgent);

    var start_time = new Date().getTime();

    proxy.web(req, res, { target: 'http://172.25.142.36:8080' });

    res.on('finish', function() {
       console.log("The request was proxied in " + (new Date().getTime() - start_time) + "ms");
    });
});
proxyServer.listen(port, function() {
	console.log("Proxy listening on port "+port);
});



