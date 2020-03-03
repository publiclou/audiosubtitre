const speech = require('@google-cloud/speech');
const fs = require('fs');
const recorder = require('node-record-lpcm16');
const client = new speech.SpeechClient({
    keyFilename: '../key/audiosubtitre-268923-9922eaeacb64.json'
});

const gcsUri = 'gs://lou-audio/test.flac';
const filename = '../test.mp3';
const encoding = 'FLAC';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const config = {
    encoding: encoding,
    // sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    audioChannelCount: 2,
    enableSeparateRecognitionPerChannel: true
};

const audio = {
    uri: gcsUri,
    // content: gcsUri
};
// const audio = {
//     content: fs.readFileSync(filename).toString('base64'),
// };

const request = {
    config: config,
    audio: audio,
};

async function main() {
    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    // const [operation] = await client.longRunningRecognize(request);
    const [operation] = await client.longRunningRecognize(request);
    // console.log(operation);
    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();
    console.log(response);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: ${transcription}`);
}

main()