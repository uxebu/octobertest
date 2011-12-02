var assert = require('assert'),
    fs     = require('fs'),
    Test   = require('../lib/test');

var src      = fs.readFileSync(__dirname + '/asset/simple.json'),
    dest     = Test.parse(src, 'json').stringify('xml'),
    expected = fs.readFileSync(__dirname + '/asset/simple.xml');

assert.equal(dest, expected);
