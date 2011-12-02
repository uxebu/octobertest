#!/usr/bin/env node

require('../lib/cli')(process.argv, function(err) {
  var code = err ? 1 : 0;
  process.exit(code);
});
