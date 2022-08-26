// nodeServerUNL viewport svg 1020
//'use strict'; // is unnecessary inside of modules.
// Using special formName  /formAKchk?q=123-12345678-1234567 /formAKval?q=123-12345678-1234567 or /formAKpay?q=xxx
//file:///home/akaarna/react-tutorial/build/index.html

/*
Standard dirs should be:
images
pages
scripts
styles
*/

/*
Can be started as parent in build subdir:

  >node ..\nodeServerUNL.js

*/

//let typeProj =  ''; // 'build';
const dirName = 'build'; // React build dir as root dir.
//let dirName = ''; // root dir.
//let methodType = 'get'; // 'post' or 'get' for secure server.
//let formNameIni = 'submitFormAK-Ini';
//let formName = 'submitFormAK';
//let dirName = 'arch'; // root dir
const formNameIni = 'index.html';
//let formNameIni = 'indexForm.html';

const fs = require('fs');

// Exclude refs to addon thru versions incompatible for test only.
//let addon;
let linux = false;
try {
  let dir = fs.opendirSync('./build');
  let dirEnt;
  while (true) {
    dirEnt = dir.readSync();
    if (dirEnt === null) break;
    if (dirEnt.name === 'addon.node') { // asset-manifest.json for test, for real addon.node
      linux = true;
      break;
    }
  }
  dir.closeSync();
  console.log(`NO error reading ./build dir`)
} catch (error) {
  console.log(`Error reading ./build dir`)
  linux = false;
}

console.log('Debian linux type: ' + linux);
/*
if (linux) { // Debian linux addon.node.
  addon = require('./build/addon');
}
else {
  addon = require('./addon'); // Windows addnon.node
}
*/

//const https = require('https');
const http = require('http');
//const { StrictMode } = require('react');
//const urlLegacy = require('url'); // Legacy url module.
//const { URL } = require('url'); // ES6 url module
// The querystring module provides utilities for parsing and formatting URL query strings.
//const qs = require('querystring'); // used as let objBody = qs.parse(body, "\r\n", "=");
//const formidable = require('formidable');
//const {userInfo} = require('./appWeb.js');

let dtVar = new Date();
console.log('Server starts ' + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
/*
//var envObj = process.env;
for (let prop in process.env) {
  //console.log(prop + ": " + process.env[prop]);
}
dtVar = new Date();
console.log('==================================== ' + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
*/

// https://localhost:8081
const hostname = 'localhost';
// https://unl.test:8081
//const hostname = 'unl.test';
//const port = process.env.PORT; //  Windows - default port is 1337 for WebApp and 1542 for ConsoleApp;
const port = 8080; // for Linux must be set manually;

dtVar = new Date();
console.log('Before https.createServer() ' + dtVar.getSeconds() + "." + dtVar.getMilliseconds());

const server = http.createServer();

server.on('error', (err) => {
  var dtVar = new Date();
  //throw err;
  console.log(`httpsServer 'error' event - error code: ==> ` + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
  console.log(err.code);
  console.log('httpsServer error stack:');
  console.log(err.stack);
});

/*
server.on('connection', (socket) => {
  var dtVar = new Date();
  console.log(`httpsServer 'connection' event - client connected at + ==> ` + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
  console.log(socket.remoteAddress + ' ' + socket.remoteFamily + ' ' + socket.remotePort);
});
*/

server.on('request', (req, res) => { // request is <http.IncomingMessage>, response is <http.ServerResponse>
  console.log(`req.url =>` + req.url)
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(`Requst req.url ==>` + req.url);
  res.end();
  req.on('error', (err) => {
    // This prints the error message and stack trace to `stderr`.
    console.log(`httpsServer request 'error' event - error stack: ==> ` + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
    console.error(err.stack);
  });
  res.on('error', (err) => {
    console.log(`httpsServer response 'error' event - error code: ==> ` + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
    console.error(err);
  });
}) // end of server.on('request'...)

dtVar = new Date();
console.log('After https.createServer ' + dtVar.getSeconds() + "." + dtVar.getMilliseconds());

// Begin accepting connections on the specified port and hostname.
// If hostname is omitted, server will accept connections on the unspecified IPv6 address (::) when IPv6 is available,
// or the unspecified IPv4 address (0.0.0.0) otherwise.
server.listen(port, hostname, () => {
  // Place holders in template literals are indicated by the $ (Dollar sign) and curly braces e.g. (${expression}).
  //console.log(`Server running and listening at https://${hostname}:${port}/ ` + dtVar.getSeconds() + "." + dtVar.getMilliseconds()); // ${expression} is place holders in template literal enclosed by the back-tick (` `) (grave accent) characters.
  console.log(`Server running and listening at http://${hostname}:${port}/ ` + dtVar.getSeconds() + "." + dtVar.getMilliseconds()); // ${expression} is place holders in template literal enclosed by the back-tick (` `) (grave accent) characters.
});

dtVar = new Date();
console.log('End Server main PROGAM path after server.listen(port, hostname, callback) ' + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
// <============================================= END of main PROGRAM =============================================================>