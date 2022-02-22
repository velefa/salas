// Add an HTTP Header
// If the response from the HTTP server is supposed to be displayed as HTML, 
// you should include an HTTP header with the correct content type:

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Hello World!</h1>');
  res.write('<h3>Hello World!</h3>');
  res.write(req.url);
  res.end();
}).listen(8080);


// The function passed into the http.createServer() has a req argument that 
// represents the request from the client, as an object (http.IncomingMessage object).
// This object has a property called "url" which holds the part of the url that 
// comes after the domain name:
// http://localhost:8080/summer


var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('demofile.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);