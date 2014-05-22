## Utilex

[utilex](http://github.com/cmfatih/utilex) is a Node.js module for 
providing extra functions for node.js applications.  

[![Build Status][travis-image]][travis-url] | [![NPM][npm-image]][npm-url]
---------- | ----------

### Installation

For latest release
```
npm install utilex
```

For HEAD
```
git clone https://github.com/cmfatih/utilex.git
```

### Usage

#### Test
```
npm test
```

#### Examples

```javascript
var utilex = require('utilex');

utilex.tidyTime();
// 2014-01-25 14:05:22

utilex.tidyTime(new Date(1388638740000));
// 2014-01-01 23:59:00

utilex.tidyLog('Tidy log...');
// { time: '2014-01-25 14:08:39', message: 'Tidy log...' }

utilex.tidyLen('Hello 世界');
// 8

utilex.tidyLen('Hello 世界', true);
// 12

utilex.tidyArgs();
// command: node ./test/test-all.js --arg1 arg1Val --arg2 -arg3 arg3Val arg4 arg5 -c test/config-test.json
//
// {"arg1":"arg1Val","arg2":"","arg3":"arg3Val","arg4":"","arg5":"","c":"test/config-test.json"}

utilex.tidyConfig();
// command arg: -c test/config-test.json
// config-test.json: {"testKey": "testVal"}
//
// {"file":"test/config-test.json","config":{"testKey":"testVal"}}

utilex.pathSep;
// /

utilex.pathCur;
// /srv/var/utilex

utilex.envMode;
// process.env: NODE_ENV
// development

utilex.dirIsWritable(__dirname);
// true

utilex.httpGetFile('http://nodejs.org/images/logo.svg', './nodejs-logo.svg').then(function() {
  console.log('done!');
}, function(err) {
  console.log(err);
});
// done!
```

### Changelog

For all notable changes see [CHANGELOG.md](https://github.com/cmfatih/utilex/blob/master/CHANGELOG.md)

### License

Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/utilex)  
Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.

[npm-url]: http://npmjs.org/package/utilex
[npm-image]: https://badge.fury.io/js/utilex.png

[travis-url]: https://travis-ci.org/cmfatih/utilex
[travis-image]: https://travis-ci.org/cmfatih/utilex.svg?branch=master