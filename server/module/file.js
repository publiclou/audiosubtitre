const fs = require('fs');

function file() { }
file.prototype.toBase64 = function (file) {
    return fs.readFileSync(file).toString('base64');
}
module.exports = file