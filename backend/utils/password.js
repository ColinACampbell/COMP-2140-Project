var crypto = require('crypto');

exports.createPasswordHash = (plainPassword) => {
    return crypto.createHash('md5').update(plainPassword).digest('hex');
}