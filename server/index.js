const express = require('express');
const app = express();
const AudioController = require('./controller/audioController');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting storage
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

let audioController = new AudioController()

app.get('/', function (req, res) {
    res.end();
});

app.post('/audio', upload.single('audio'), audioController.convert)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});