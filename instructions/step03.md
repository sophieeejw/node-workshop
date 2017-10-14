# Step 3 - Communicate with the server

Now that we've built the server, we need to communicate with it. We're going to control the server with **handler functions**.

### What is a handler function?

When a request reaches the server, we need a way of responding to it. In comes the **handler** function. The handler function is just a function which receives requests and handles them, hence the name.

The handler function always takes a `request` and `response` object and sends the response back to the client along with some information. You can decide what to send back in your response.

```js
function handler (request, response) {
  // deal with request and sending response
}
```

## 1. Create your own handler function.

We are now making a handler function with a custom message in our response. You can write any message you want.

**Add the following code to `server.js`**


```js
const http = require('http');

const message = 'I am so happy to be part of the Node Girls workshop!';

function handler (request, response) {

}

const server = http.createServer();

server.listen(3000, function () {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});


```

## 2. Tell your handler function what to do

We want our handler function to send our message in a response. To do that we will use one of the methods on `response` object, which is: ```response.write()```. You can find more about `response.write()` [here](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_response_write_chunk_encoding_callback)

Every response has a header, which contains information about the response.  That header information is given to the browser, so it can understand what it's receiving. We can add information to the header using `response.writeHead()`. The `writeHead` takes 2 parameters: status code and header object.

**Add these line to the handler function**

```js
function handler (request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(message); // response body
  response.end(); // finish response
}

```

## 3. Pass the handler function to your server

The createServer() method takes a handler function as an argument.

**Pass your handler function to createServer method**

```js
const server = http.createServer(handler);

```

## 4. Rerun your server and go to your favourite browser

You need to restart your server so it reflects the changes you've made.  In your terminal, `ctrl + c`
 will stop the server.  You can restart it by running `node server.js` again.

**Type in your browser** `localhost:3000`

If you see your message in the browser, **congratulations** you just sent your first response from the server.

---
## [**next step >>>**](step04.md)
---
### Keywords:
* status code
* response.writeHead()