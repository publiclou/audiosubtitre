var ffmpeg = require('fluent-ffmpeg');

const audioConvert = require('../module/speechtotext');
const File = require('../module/file');

module.exports = class audioController {
    constructor() {
    }
    async convert(req, res, next) {
        // get file
        let file = new File()
        let file_path = req.file.path;
        let output_path = `${req.file.destination}${req.file.originalname.split('.')[0]}.flac`

        await file.convertToFLAC(file_path, output_path, 1)

        let file_content = file.toBase64(output_path)
        let config = {
            encoding: 'FLAC',
            languageCode: 'en-US',
        }
        let result = await audioConvert(config, file_content)

        // delete files
        file.deleteFile(file_path)
        file.deleteFile(output_path)

        res.send(result)
        res.end()
    }
}



