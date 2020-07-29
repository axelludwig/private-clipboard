var express = require('express');
var app = express();

const port = 8080;

app.get('/', function(req, res) {
    res.send('hello world')
});

app.listen(port);
console.log('listening on http://localhost:' + port)