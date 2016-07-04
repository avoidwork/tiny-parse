# tiny-parse

[![build status](https://secure.travis-ci.org/avoidwork/tiny-parse.svg)](http://travis-ci.org/avoidwork/tiny-parse)

URL parsing with coercion of `query`

### Example

```javascript
"use strict";

const parse = require("tiny-parse");

console.log(parse("/?abc=true").query.abc === true); // true
```

### API
*parse()*
Parses the input, accepts a URL or `http.ClientRequest` 

## License
Copyright (c) 2016 Jason Mulligan
Licensed under the BSD-3 license.
