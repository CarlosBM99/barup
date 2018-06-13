var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('This server will pass the sorting algorithm to the cluster along the necessary parameters');
}).listen(8080);