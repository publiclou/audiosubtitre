const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

module.exports = class file {
    toBase64(file) {
        return fs.readFileSync(file).toString('base64')
    }
    deleteFile(file) {
        fs.exists(file, function (exists) {
            if (exists) {
                fs.unlinkSync(file)
            }
        })
    }
    convertToAudioFormat(input, output, channel, format) {
        return new Promise((resolve, reject) => {
            ffmpeg(input).format(format).output(output).noVideo().audioChannels(channel)
                .on('end', () => {
                    resolve()
                }).on('error', (err) => {
                    reject(err.message)
                }).run()
        })
    }
}