const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
function file() { }
file.prototype.toBase64 = function (file) {
    return fs.readFileSync(file).toString('base64');
}

file.prototype.deleteFile = function (file_path) {
    return fs.unlinkSync(file_path)
}

file.prototype.convertToFLAC = function (input_file, output_file, channel = 2) {
    return new Promise((resolve, reject) => {
        ffmpeg(input_file).format('flac').output(output_file).noVideo()
            .audioChannels(channel)
            .on('end', function () {
                resolve()
            }).on('error', function (err) {
                reject(err.message)
            })
            .run()
    })
}

module.exports = file