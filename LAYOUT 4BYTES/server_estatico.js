var $ = require('jquery');
var http = require('http' ),
 fs = require('fs' );
function serveStaticFile(res, path, contentType, responseCode) {
 if(! responseCode) responseCode = 200;
 fs. readFile(__dirname + path, function(err, data) {
 if(err) {
 res.writeHead(500, { 'Content-Type' : 'text/plain' });
 res.end('500 - Internal Error' );
 } else {
 res.writeHead(responseCode,
 { 'Content-Type' : contentType });
 res.end(data);
 }
 });
}
http.createServer(function(req, res){
 // normalize url by removing querystring, optional
 // trailing slash, and making lowercase
 var path = req. url. replace(/\/?(?:\?.*)?$/, '' )
 . toLowerCase();
 switch(path) {
 case '':
 serveStaticFile(res, '/index.html' , 'text/html' );
 break;
 default: 
 serveStaticFile(res, '/404.html' , 'text/plain' , 404);
 break;
 }
}). listen(3000);
console. log('Servidor rodando na porta 3000' );