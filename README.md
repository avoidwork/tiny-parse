# tiny-parse

[![build status](https://secure.travis-ci.org/avoidwork/tiny-parse.svg)](http://travis-ci.org/avoidwork/tiny-parse)

URL parsing with coercion of `query`

### Example

```javascript
"use strict";

const parse = require("tiny-parse");

console.log(parse("http://localhost/?abc=true").query.abc === true); // true
console.log(parse("http://localhost/?abc=true", false).query.abc === true); // false
```

### API
*parse(arg, coerce=true)*
Parses the input, accepts a URL or `http.ClientRequest` 

## License
Copyright (c) 2018 Jason Mulligan
Licensed under the BSD-3 license.
