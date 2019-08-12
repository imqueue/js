# @imqueue/js

JavaScript routines used withing @imqueue framework

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

[ISC](https://github.com/imqueue/js/blob/master/LICENSE)
