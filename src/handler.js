var fs = require('fs');
var querystring = require('querystring');

function handler(request, response) {
  var endpoint = request.url;
  console.log('tell me endpoint', endpoint);
  var method = request.method;
  // console.log('method', method);
  console.log('directory', __dirname);

  if (endpoint === "/") {
    // console.log('tell me dirname',__dirname);
    fs.readFile(__dirname + '/../public/index.html',
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
    console.log("I am here");
    response.writeHead(200, {
      "Content-type": "text/html"
    });
    response.write('node url');
    response.end();

  } else if (endpoint === '/girls') {
    response.writeHead(200, {
      "Content-type": "text/html"
    });
    response.write('girls url');
    response.end();

  } else if (endpoint === '/create-post') {
    var allTheData = '';
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
    fs.readFile(__dirname + '/../public' + request.url,
      function(error, file) {
        if (error) {
          console.log(error);
          return;
        }
        //console.log('file content', mime.getType(request.url))
        var extension = request.url.split('.')[1];
        const extensionType = {
          'html': 'text/html',
          'css': 'text/css',
          'js': 'application/javascript',
          'ico': 'image/x-icon',
          'png': 'png',
          'jpg': 'jpeg/Sophia'
        };

        console.log('extension', extension);
        console.log('extension type', extensionType[extension]);
        response.writeHead(200, {
          "Content-type": extensionType[extension]
        });
        response.end(file);
      });

  }
}

module.exports = handler;
