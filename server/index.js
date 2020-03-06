var express = require('express');
var app = express();
var app_root = require('app-root-path');
const AudioController = require('./controller/audioController');

let audioController = new AudioController()
app.get('/', function (req, res) {
    res.end();
});
app.get('/audio', audioController.convert)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});