/** @const */
var XML_HEADER = '<?xml version="1.0" encoding="UTF-8" ?>';

/**
 * Formats test suites to JUnit XML
 */
var formatSuites = module.exports = function(suites) {
  return XML_HEADER +
         '<testsuites>' +
         suites.map(formatSuite).join('') +
         '</testsuites>';
};

/**
 * Formats test suite to JUnit XML
 */
var formatSuite = function(suite) {
  return '<testsuite name="' + escapeInvalidXmlChars(suite.name) + '">' +
         suite.tests.map(formatTest).join('') +
         '</testsuite>';
}

/**
 * Formats test case to JUnit XML
 */
var formatTest = function(test) {
  var inner = '';
  if (!test.passed)
    inner = '<failure message="' + escapeInvalidXmlChars(test.error) + '">' +
            escapeInvalidXmlChars(test.stacktrace) +
            '</failure>';
  return '<testcase name="' + escapeInvalidXmlChars(test.name) + '">' +
         inner
         '</testcase>';
}

/**
 * Escapes XML characters
 */
var escapeInvalidXmlChars = function(str) {
  return str.replace(/\&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/\>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/\'/g, "&apos;");
}
