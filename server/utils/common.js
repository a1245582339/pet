const crypto = require('crypto');

const passwordMd5Fn = (password) => {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}
const isEmptyArray = (array) => array.length === 0 ? true : false ;
module.exports = {
    passwordMd5Fn,
    isEmptyArray
}

