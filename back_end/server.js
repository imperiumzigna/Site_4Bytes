// Server simples em NodeJS para testes

var http = require("http");
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

 var path = req. url. replace(/\/?(?:\?.*)?$/, '' )
 . toLowerCase();
 switch(path) {
 case '':
 serveStaticFile(res, '/index.html' , 'text/html' );
 break;
 default: 
 res.writeHead(404,{'Content-Type':'text/html'});
res.end('<p>Not Found<p>');
 break;
 }
}). listen(3000);
console. log('Servidor rodando na porta 3000...');