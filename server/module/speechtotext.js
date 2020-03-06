require('dotenv').config({ path: '../../.env' });
const speech = require('@google-cloud/speech');
const fs = require('fs');
const client = new speech.SpeechClient({
    keyFilename: `../../key/${process.env['KEY_NAME']}`
});

const filename = '../../output.flac';
const config = {
    encoding: 'FLAC',
    languageCode: 'en-US',
};

const audio = {
    content: fs.readFileSync(filename).toString('base64'),
};

const request = {
    config: config,
    audio: audio,
};

async function main() {
    const [operation] = await client.longRunningRecognize(request);
    const [response] = await operation.promise();
    console.log(response);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: ${transcription}`);
}

main()