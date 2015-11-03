var express = require('express');
var app = express();

// Route anlegen
app.get('/', function (req, res) {
    res.send('<!DOCTYPE html>' +
        '<html lang="de">' +
        '<head><meta charset="utf-8"></head>' +
        '<body><h1>Hello World!</h1></body>' +
        '</html>'
    );
});

// accept POST request on the homepage
app.post('/', function (req, res) {
    res.send('<!DOCTYPE html>' +
        '<html lang="de">' +
        '<head><meta charset="utf-8"></head>' +
        '<body><h1>Hello World!</h1></body>' +
        '</html>'
    );
});

app.put('/', function (req, res) {
    res.send('<!DOCTYPE html>' +
        '<html lang="de">' +
        '<head><meta charset="utf-8"></head>' +
        '<body><h1>Hello World!</h1></body>' +
        '</html>'
    );
});

app.delete('/user', function (req, res) {
    res.send('<!DOCTYPE html>' +
        '<html lang="de">' +
        '<head><meta charset="utf-8"></head>' +
        '<body><h1>Hello World!</h1></body>' +
        '</html>'
    );
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("'Hello World' app is ready and listening at http://%s:%s", host, port);
});