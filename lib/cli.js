var Test    = require('./test'),
    fs      = require('fs'),
    path    = require('path'),
    program = require('commander');

var cli = module.exports = function(argv) {
  var inFormats  = Object.keys(Test.parsers).join(','),
      outFormats = Object.keys(Test.stringifiers).join(',');

  program
    .version(cli.PACKAGE.version)
    .option('-i, --in [format]', 'Input format [' + inFormats + ']')
    .option('-o, --out [format]', 'Output format [' + outFormats + ']')
    .parse(argv);

  if (program.args.length != 2)
    program.emit('help'); // TODO: Need custom help w/ info on src & dest args

  var destFile   = program.args[1],
      destFormat = program.out || path.extname(destFile).slice(1),
      srcFile    = program.args[0],
      srcFormat  = program.in || path.extname(srcFile).slice(1),
      srcString  = fs.readFileSync(srcFile),
      test       = Test.parse(srcString, srcFormat);

  fs.writeFileSync(destFile, test.stringify(destFormat));
};

cli.PACKAGE = (function() {
  return JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8'));
})();
