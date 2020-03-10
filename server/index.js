const express = require('express');
const app = express();
const app_root = require('app-root-path');

const AudioController = require('./controller/audioController');

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting storage
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${app_root}/uploads/`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

let audioController = new AudioController()

app.get('/', function (req, res) {
    res.sendFile(`${app_root}/client/index.html`);
});
app.post('/longaudio', upload.single('audio'), audioController.longReconize)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});