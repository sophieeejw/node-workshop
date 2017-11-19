var http = require('http');
var fs = require('fs');

var message = "We are so happy to be part of the Node Girls workshop";

function handler(request, response){
  var endpoint = request.url;
  console.log(endpoint);
  var method = request.method;
  console.log('method', method);
  console.log('type of request', typeof(request));

  if (endpoint === "/") {
    response.writeHead(200, {"Content-Type":"text/html"});
    fs.readFile(__dirname + '/public/index.html',
    function(error, file) {
      if (error) {
        console.log(error);
        return;
      }

      response.end(file);
    });
  }

  else if (endpoint === '/node') {
    response.writeHead(200, {"Content-type":"text/html"});
    response.write('node url');
    response.end();
  } else if (endpoint === '/girls') {
    response.writeHead(200, {"Content-type":"text/html"});
    response.write('girls url');
    response.end();
  } else {
    response.writeHead(200, {"Content-type":"text/html"});
    response.write(message);
    response.end();
  }
}

var server = http.createServer(handler);

server.listen(3000, function() {
console.log("Server is listening on port 3000. Ready to accept requests!");
});
