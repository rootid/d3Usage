
var path = require('path');
var express = require('express');
var app = express() ;

var dloader = require('./lib/dataloader.js');

app.set('port', process.env.PORT || 3000);


app.use('/',express.static(__dirname + '/public'));

app.get('/home', function(req, res) { 
    res.type('text/html; charset=utf-8');
    res.send('Data visualization service');
});

app.get('/about', function(req, res) {
    res.type('text/html; charset=utf-8');
    res.send('<h3> About process visualization </h3>');
});


app.get('/data', function(req, res) {
    res.type('text/html; charset=utf-8');
    res.send(dloader.getDataset());
});

app.get('/plot', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    //res.setHeader('Cache-Control', 'no-cache');
    res.send(dloader.getDataset());
});


app.get('/memplot', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    //res.setHeader('Cache-Control', 'no-cache');
    res.send(dloader.getMemData());
    //res.send("meminfo");
});

// custom 404 page
app.use(function(req, res, next) { 
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});


app.listen(app.get('port'), 
        function() {
            console.log( 'Express started on http://localhost:' +
                app.get('port') + '; press Ctrl-C to terminate.' );
        });
