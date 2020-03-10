const speechtotext = require('../module/speechtotext');
const file = require('../module/file');

module.exports = class audioController {
    constructor() {
    }
    async longReconize(req, res, next) {
        const File = new file()
        const SpeechToText = new speechtotext()
        const file_path = req.file.path
        const output_path = `${req.file.destination}${req.file.originalname.split('.')[0]}.opus`

        // convert file
        await File.convertToAudioFormat(file_path, output_path, 1, 'opus')
        let file_content = File.toBase64(output_path)

        // setting speech to text require
        let request = {
            config: {
                encoding: 'OGG_OPUS',
                sampleRateHertz: 48000,
                languageCode: req.body.lang,
            },
            audio: {
                content: file_content
            }
        }
        let result = await SpeechToText.longReconize(request)

        // delete files
        File.deleteFile(file_path)
        File.deleteFile(output_path)

        res.send(result)
        res.end()
    }
}



