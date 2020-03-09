const speech = require('@google-cloud/speech');
const app_root = require('app-root-path');

require('dotenv').config({ path: `${app_root}/.env` });
const client = new speech.SpeechClient({
    keyFilename: `${app_root}/key/${process.env['KEY_NAME']}`
});

module.exports = async function convert(config, content) {
    const request = {
        config: config,
        audio: {
            content: content,
        },
    };

    const [operation] = await client.longRunningRecognize(request);
    const [response] = await operation.promise();
    const transcription = await response.results
    // .map(result => result.alternatives[0].transcript)
    // .join('\n');
    return transcription;
}
