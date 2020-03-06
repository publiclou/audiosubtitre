
const audioConvert = require('../module/speechtotext');
const File = require('../module/file');

module.exports = class audioController {
    constructor() {
    }
    async convert(req, res, next) {
        let file = new File()
        let file_content = file.toBase64('../output.flac')
        let result = await audioConvert('FLAC', 'en-US', file_content)
        res.send(result)
    }
}



