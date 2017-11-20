var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
// var mime = require('mime');

var message = "We are so happy to be part of the Node Girls workshop";
var allTheData = '';


const extensionType = {
  'html': 'text/html',
  'css': 'text/css',
  'js': 'application/javascript',
  'ico': 'image/x-icon',
  'png': 'png',
  'jpg': 'jpeg/Sophia'
};

function handler(request, response) {
  var endpoint = request.url;
  console.log(endpoint);
  var method = request.method;
  console.log('method', method);
  console.log('type of request', typeof(request));

  if (endpoint === "/") {

    fs.readFile(__dirname + '/public/index.html',
      function(error, file) {
        if (error) {
          console.log(error);
          return;
        }
        response.writeHead(200, {
          "Content-Type": "text/html"
        });
        response.end(file);
      });

  } else if (endpoint === '/node') {
    response.write('node url');
    response.writeHead(200, {
      "Content-type": "text/html"
    });
    response.end();

  } else if (endpoint === '/girls') {
    response.write('girls url');
    response.writeHead(200, {
      "Content-type": "text/html"
    });
    response.end();

  } else if (endpoint === '/create-post') {

    request.on('data', function(chunkOfData) {
      allTheData += chunkOfData;
    });

    request.on('end', function() {
      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.writeHead(302, {
        "Location": "/"
      });
      response.end();
    });




  } else {
    fs.readFile(__dirname + '/public' + request.url,
      function(error, file) {
        if (error) {
          console.log(error);
          return;
        }
        //console.log('file content', mime.getType(request.url))
        var extension = request.url.split('.')[1];
        console.log('extension', extension);
        console.log('extension type', extensionType[extension]);
        response.writeHead(200, {
          "Content-type": extensionType[extension]
        });
        response.end(file);
      });

  }
}







var server = http.createServer(handler);

server.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
