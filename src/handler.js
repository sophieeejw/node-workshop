var fs = require('fs');
var querystring = require('querystring');

function handler(request, response) {

  const endpoint = request.url;
  console.log(endpoint);

  if (endpoint === '/') {
    fs.readFile(__dirname + '/../public/index.html',
      function(error, file) {
        if (error) {
          console.log(error);
          return;
        }
      response.writeHead(200, {'Content-Type': 'text/html'});
      //why extensionType[extension] doesnt work?

    response.end(file);
  });

} else if (endpoint === '/create/post') {
    var allTheData = '';
    request.on ('data', function (chunkOfData){
      allTheData += chunkOfData;
    });
    request.on ('end', function () {
      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.writeHead(302, {Location : "/"});
      response.end();
    });

} else {
  const extension = request.url.split('.')[1];
  const extensionType = {
    'html':'text/html',
    'css':'text/css',
    'js':'javascript/application',
    'ico':'image/x-icon',
    'png':'png',
    'jpg':'jpg/jpeg'}[extension];

  fs.readFile(__dirname + '/../public' + request.url,
    function(error, file) {
      if (error) {
        console.log(error);
        return;
      } response.writeHead(200, {'Content-Type' : extensionType});
    response.end(file);
  });


  }


}



  module.exports = handler;
