var express = require('express');

var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
 res.json('hallo world server');

});

app.listen(process.env.PORT || 8080);

exports.app = app;