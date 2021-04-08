const util = require('util');

function encodingExists(encoding) {
  try {
    new util.TextDecoder(encoding);
    return true;
  } catch (_error) {
    return false;
  }
}

module.exports = {
  TextDecoder: util.TextDecoder,
  TextEncoder: util.TextEncoder,
  encodingExists,
};
