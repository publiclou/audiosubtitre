const speech = require('@google-cloud/speech');
const app_root = require('app-root-path');

require('dotenv').config({ path: `${app_root}/.env` });
const client = new speech.SpeechClient({
    keyFilename: `${app_root}/key/${process.env['KEY_NAME']}`
});

module.exports = class speechtotext {
    async longReconize(request) {
        const [operation] = await client.longRunningRecognize(request);
        const [response] = await operation.promise();
        const transcription = await response.results
        return transcription;
    }
}
