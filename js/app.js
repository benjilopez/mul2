/**
 * Mul2 NodeJS Server
 * @authors Denny Hörtz, Benjamin Lopez, Toni Kluth
 * @created 4.11.2015
 * @type {*|exports|module.exports}
 */
var express = require('express');
var app = express();
var path = require("path");
var fs = require('fs');

/**
 * Allow static request to /public folder
 */
app.use('/public', express.static(path.join(__dirname, '..', '/public')));

/**
 * retrieve the current servertime as timestamp
 */
app.get("/time", function(req, res){
    res.setHeader('content-type', 'text/plain');
    res.send(Date.now().toString());
});

/**
 * Get a sample text file with read time
 */
app.get("/file", function(req, res){

    var startedTime = Date.now();

    fs.readFile(path.join(__dirname, '..', '/public/files/sample.txt'), 'utf8', function(err, contents) {

        res.setHeader('content-type', 'text/plain');
        res.send(contents + "\nFile was read in " + (Date.now() - startedTime) + "ms.")
    });
});

/**
 * Catch all request
 */
app.use('*', function (req, res) {
    res.send('<!DOCTYPE html>' +
        '<html lang="de">' +
        '<head><meta charset="utf-8"></head>' +
        '<body><h1>Hello World</h1></body>' +
        '</html>'
    );
});

/**
 * Start listening to a specific port
 * @type {http.Server}
 */
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("'Hello World' app is ready and listening at http://%s:%s", host, port);
    console.log("" + path.join(__dirname, '..', '/public'));
});