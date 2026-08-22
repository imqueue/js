# @imqueue/js

[![Build Status](https://img.shields.io/github/actions/workflow/status/imqueue/js/build.yml)](https://github.com/imqueue/js/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/@imqueue/js)](https://www.npmjs.com/package/@imqueue/js)
[![Known Vulnerabilities](https://snyk.io/test/github/imqueue/js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/imqueue/js?targetFile=package.json)
[![License](https://img.shields.io/badge/license-GPL-blue.svg)](https://github.com/imqueue/js/blob/master/LICENSE)

JavaScript routines used within the @imqueue framework.

**Using an AI assistant?** Point it at [imqueue.org/llms.txt](https://imqueue.org/llms.txt)
for a machine-readable index of the docs. Current version, licence and Node floor
for every package: [imqueue.org/status.json](https://imqueue.org/status.json).

# Docs

~~~
git clone git@github.com:imqueue/js.git
npm run docs
~~~

# Usage

~~~typescript
import { js, object } from '@imqueue/js';
import isObject = js.isObject;
import get = object.get;

const obj = { { a: { b: { c: true } } } };

if (!isObject(obj)) {
    throw new TypeError('Object required!');
}

console.log(get(obj, 'a.b.c'));
~~~

## License

This project is licensed under the GNU General Public License v3.0.
See the [LICENSE](LICENSE)
