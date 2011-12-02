var parser = require('./parser'),
    stringifier = require('./stringifier');

var Test = module.exports = function(_test) {
  this._test = _test;
};

/**
 * Parses the given test format and returns a Test object
 */
Test.parse = function(str, format) {
  if (!(format in parser))
    throw 'Parser ' + format + ' not found!';
  return new Test(parser[format](str));
};

Test.prototype = {
  /**
   * Stringifies test object into the given format
   */
  stringify: function(format) {
    if (!(format in stringifier))
      throw 'Stringifier ' + format + ' not found!';
    return stringifier[format](this._test.suites);
  }
};

Test.parsers      = parser;
Test.stringifiers = stringifier;
