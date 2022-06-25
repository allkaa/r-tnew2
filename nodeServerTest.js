'use strict';
//file:///home/akaarna/react-tutorial/build/index.html

/*
Dirs:
images
pages
scripts
styles
*/

//let methodType = 'get'; // 'post' or 'get' for secure server.
//let formNameIni = 'submitFormAK-Ini';
//let formName = 'submitFormAK';
let dirName = 'build'; // React build dir.
//let dirName = 'arch';
let formNameIni = 'index.html';
let formName = 'submitFormAK';

//const http = require('http');
const https = require('https');
const urlLegacy = require('url'); // Legacy url module.
//const { URL } = require('url'); // ES6 url module
const fs = require('fs');
// The querystring module provides utilities for parsing and formatting URL query strings.
const qs = require('querystring');
//const formidable = require('formidable');
const {userInfo} = require('./appWeb.js');

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
//const hostname = 'localhost';
// https://unl.test:8081
const hostname = 'unl.test';
//const port = process.env.PORT; //  Windows - default port is 1337 for WebApp and 1542 for ConsoleApp;
const port = 8081; // for Linux must be set manually;

dtVar = new Date();
console.log('before https.createServer() ' + dtVar.getSeconds() + "." + dtVar.getMilliseconds());

///*
const options = {
  pfx: fs.readFileSync('./unl.test.pfx'), // '../../unl_works.pfx'
  passphrase: 'unl'
};
//*/

//const server = http.createServer((req, res) => { // request is <http.IncomingMessage>, response is <http.ServerResponse> ...}
const server = https.createServer(options);
//const server = http.createServer();

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
  req.on('error', (err) => {
    // This prints the error message and stack trace to `stderr`.
    console.log(`httpsServer request 'error' event - error stack: ==> ` + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
    console.error(err.stack);
  });
  res.on('error', (err) => {
    console.log(`httpsServer response 'error' event - error code: ==> ` + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
    console.error(err);
  });
  // The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays,
  // or properties from objects, into distinct variables.
  //const { method, url, headers } = req;
  //let aaa = new Object();
  // req.url if GET "/" for very initial and for next "/submitFormAK?fname=Alex&sname=Raven"
  // if POST "/submitformAK"
  let objUrl = urlLegacy.parse(req.url, true, true); // non standard object.
  // Verify that it is very first page request or rendering page after GET or POST form submit processed.
  // After POST form submit will be processed rendering page will be as GET.
  // In req.headers Object property host: "unl.test:8081"
  if ((req.method === "GET")) {
    // for req.method === "GET" objUrl.search is ? + query e.g. "?fname=Alex&sname=Raven" or Null
    // req.url = "/submitFormAK?fname=Alex&sname=Raven"
    // if req.method === "POST" then ObjUrl.search will be "" always.
    /*
    req.url = "/submitformAK?fname=al&sname=kaa"
    ObjUrl {
      href: = path: "/submitformAK?fname=al&sname=kaa"
      pathname: "/submitformAK"
      search: "?fname=al&sname=kaa"
      query: Object {fname: "al", sname: "kaa"}
    }
    */
    if (objUrl.search === null) {
      let contType = '';
      if (objUrl.pathname.endsWith('.css')) {
        contType = 'text/css';
      }
      else if (objUrl.pathname.endsWith('.js')) {
        contType = 'application/javascript';
      }
      else if (objUrl.pathname.endsWith('.png')) {
        contType = 'image/png';
      }
      else if (objUrl.pathname.endsWith('.jpg') || objUrl.pathname.endsWith('.jpeg')) {
        contType = 'image/jpeg';
      }
      else if (objUrl.pathname.endsWith('.htm') || objUrl.pathname.endsWith('.html')) {
        contType = 'text/html';
      }
      if (contType === '') {  // default formNameIni = index.html.
        contType = 'text/html';
        fs.readFile('./' + dirName + '/' + formNameIni, (err, data) => {
          if (err) {
            res.writeHead(200, { 'Content-Type': `${contType}` });
            res.write(`${dirName}/${formNameIni} not found!`);
            return res.end();
              } // throw err;
          else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
          }
        });
      }
      else {
        fs.readFile('./' + dirName + objUrl.pathname, (err, data) => { // './' + dirName  + "/path/name.type"
        if (err) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write(`${dirName + objUrl.pathname} not found!`);
          return res.end();
            } // throw err;
        else {
            res.writeHead(200, { 'Content-Type': `${contType}` });
            res.write(data);
            return res.end();
          }
        });
      }
    } // end of objUrl.search === null - no ? in GET request
    // for req.method === "GET" objUrl.search is ? + query e.g. "?fname=Alex&sname=Raven" or Null
    // req.url = "/submitFormAK?fname=Alex&sname=Raven"
    else {
      if (req.url.includes('/' + formName)) { // e.g. req.url = "/submitFormAK?fname=Alex&sname=Raven"
        //res.writeHead(200, { 'Content-Type': 'text/plain' });
        //res.write(`Form asked ${req.url} is OK!`);
        //return res.end();
        let q = objUrl.query; // formerly parsed query property object e.g. Object {fname: "Alex", sname: "Raven"}.
        fs.readFile('./' + dirName + '/pages/formAK.html', (err, data) => { // file formAK.html reading.
          if (err) throw err;
          else { // file formAK.html read OK - modify template file.
            let msgOrig = '';
            for (let i=0; i<data.length; i++) {
              msgOrig = msgOrig + String.fromCharCode(data[i]);
            }
            let msg = msgOrig.substring(0,msgOrig.indexOf(`</body>`));
            msg += 'LAST ENTERED by method ' + req.method + ':<br />';
            /*
            if (q.fname === "") msg += 'Name not entered!<br />';
            else msg += 'Name = ' + q.fname + '<br />';
            if (q.sname === "") msg += 'Surname not entered!<br />';
            else msg += 'Surname = ' + q.sname + '<br />';
            */
            msg += userInfo(q);
            msg += msgOrig.substring(msgOrig.indexOf(`</body>`));
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(msg);
            return res.end();
          } // end  of file index.html read OK - modify template file.
        }); // end of file index.html reading.
      }
      else { // no "/submitFormAK" but search is not emty e.g. "?fname=Alex&sname=Raven"
        // HACKER ATTACK OR FAULTY CLIENT.
        //req.connection.destroy();
        console.log(req.url);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(`Form request submitted by GET: ${req.url}`);
        return res.end();
      }
    }
  } // <==================== end of GET method ================================================>
  else { // <==================== POST method form submit case start ============================================>
    // POST method, if req.method === "POST" then ObjUrl.search will be Null always.
    /*
    Form request submitted by POST: /formAK with body: 
    user_name=ALEX+RAVEN%7E&user_essay=Please+write+an+essay+about+your+favorite+DOM+element.%5E&fruits=Lime&fruits=Coconut&carrots=option1&meal=option1
    */
    //let objUrl = urlLegacy.parse(req.url, true, true); // non standard object is got earlier befor GET or POST analyze.
    /*
    req.url = "/submitformAK"
    ObjUrl {
      href: = path: = pathname:  "/submitformAK"
      search: null
      query: Object {}
    }
    later body will be
    body: "fname=al\r\nsname=kaa\r\n"
    */
    let body = '';
    req.on('data', function (data) {
      body += data;
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB.
      if (body.length > 1e6) {
        // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST.
        req.connection.destroy();
      }
    });
    req.on('end', function () {
      // e.g. body = 'fname=Alex\r\nsname=Raven\r\n' for /submitFormAK
      /*
      console.log(body);
      let strVar = '';
      for (let i = 0; i < body.length; i++) {
        strVar = strVar + body.charCodeAt(i) + ",";
      }
      console.log(strVar);
      */
      //console.log(objBody);
      let objBody = qs.parse(body, "\r\n", "="); // using const qs = require('querystring') module.
      /*
        req.url = "/submitformAK"
        ObjUrl {
          href: = path: = pathname:  "/submitformAK"
          search: null
          query: Object {}
        }
        body: "fname=al\r\nsname=kaa\r\n"
        objBody: Object {fname: "al", sname: "kaa"}    }
      */
      if (req.url.includes('/' + formName)) {
        fs.readFile('./' + dirName + '/pages/formAK.html', (err, data) => { // index.html reading.
          if (err) throw err;
          else { // file index.html read OK -  modify template file.
            let msgOrig = ''; //, appWebReturn = '';
            for (let i=0; i<data.length; i++) {
              msgOrig = msgOrig + String.fromCharCode(data[i]);
            }
            let msg = msgOrig.substring(0,msgOrig.indexOf(`</body>`));
            msg += 'LAST ENTERED by method ' + req.method + ':<br />';
            /*
            if (objBody.fname == "") msg += 'Name = ' + 'not entered!' + '<br />';
            else msg += 'Name = ' + objBody.fname + '<br />';
            if (objBody.sname == "") msg += 'Surname = ' + 'not entered!' + '<br />';
            else msg += 'Surname = ' + objBody.sname + '<br />';
            */
            //let appWebReturn = userInfo(objBody);
            //msg += appWebReturn;
            msg += userInfo(objBody);
            msg += msgOrig.substring(msgOrig.indexOf(`</body>`));
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(msg);
            return res.end();
          } // end  of file index.html read OK - modify template file.
        }); // end of file index.html reading.
      } // end of if (req.url.includes('/submitFormAK'))
      else {
        // HACKER ATTACK OR FAULTY CLIENT.
        // using const qs = require('querystring') module with defaults:
        // qs.parse( body, "&", "=", { decodeURIComponent: querystring.unescape, 1000} )
        let objBody = qs.parse(body);
        console.log(objBody);
        //req.connection.destroy();
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(`Form request submitted by POST: ${req.url} with body: \r\n${body}`);
        return res.end();
      }
    }); // end req.on('end', function ()...
  } // <==================================== End of POST mtthod form submit case.  =====================================>
}) // end of server.on('request'...)

dtVar = new Date();
console.log('after https.createServer ' + dtVar.getSeconds() + "." + dtVar.getMilliseconds());

// Begin accepting connections on the specified port and hostname.
// If hostname is omitted, server will accept connections on the unspecified IPv6 address (::) when IPv6 is available,
// or the unspecified IPv4 address (0.0.0.0) otherwise.
server.listen(port, hostname, () => {
  // Place holders in template literals are indicated by the $ (Dollar sign) and curly braces e.g. (${expression}).
  console.log(`Server running and listening at https://${hostname}:${port}/ ` + dtVar.getSeconds() + "." + dtVar.getMilliseconds()); // ${expression} is place holders in template literal enclosed by the back-tick (` `) (grave accent) characters.
});

dtVar = new Date();
console.log('End Serer main PROGAM path after server.listen(port, hostname, callback) ' + dtVar.getSeconds() + "." + dtVar.getMilliseconds());
