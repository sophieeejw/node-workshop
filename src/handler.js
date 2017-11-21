var fs = require('fs');
var querystring = require('querystring');
var posts = require('./posts.json')

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
      // console.log('tell me dirname',__dirname);
    response.end(file);
  });

} else if (endpoint === '/create/post') {
    var allTheData = '';
    var timeStamp = Date.now();
    request.on ('data', function (chunkOfData){
      allTheData += chunkOfData;
    });
    request.on ('end', function () {
      var convertedData = querystring.parse(allTheData).post;
      //here is the part!!!
      filePath = __dirname + '/posts.json';
      posts[timeStamp] = convertedData;
      //line above was the key!!
      fs.writeFile(filePath,JSON.stringify(posts),
      function(error) {
        if (error) {
          console.log('oh there is an error', error);
          return;
        }
      response.writeHead(302, {Location : "/"});
      response.end();
    });
});
//problematic part
} else if (endpoint === '/posts') {
    response.writeHead(200, {'Content-Type' : 'application/json'});
    response.end(JSON.stringify(posts));


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
