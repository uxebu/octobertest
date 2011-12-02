# octobertest

octobertest lets you convert between different test result formats.

The current main focus is to convert a custom JSON-representable format
into JUnit.xml for jenkins.

## Usage

    octobertest -i json -o xml foo.json bar.xml

Formats will be guessed from file extensions, so this will also work:

    octobertest foo.json bar.xml

## Input format example

~~~ json
{ "suites":
  [
    {
      "name": "foo",
      "tests": [
        {
          "name": "Foo should bar the baz",
          "passed": false,
          "expected": 1337,
          "actual": 1338,
          "error": "Expected 1337 to be 1338",
          "stacktrace": "foo()\nbar()\nbaz()\n"
        }
      ]
    }
  ]
}
~~~

Would result in the following output:

~~~ xml
<?xml version="1.0" encoding="UTF-8" ?><testsuites><testsuite name="foo"><testcase name="Foo should bar the baz"><failure message="Expected 1337 to be 1338">foo()
bar()
baz()
</failure></testsuite></testsuites>
~~~