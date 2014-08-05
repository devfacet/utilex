## Utilex
[![NPM][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

[utilex](http://github.com/cmfatih/utilex) is a Node.js module for providing extra functions.  

### Installation

```
# For latest release
npm install utilex

# For HEAD
git clone https://github.com/cmfatih/utilex.git
cd utilex
npm install
```

### Usage

#### Test
```
npm test
```

#### Examples

```javascript
var utilex = require('utilex');

utilex.datetime();
// 2014-01-25 14:05:22

utilex.datetime(new Date(1388638740000));
// 2014-01-01 23:59:00

utilex.conLog('Tidy log...');
// { time: '2014-01-25 14:08:39', message: 'Tidy log...' }

utilex.strLen('Hello 世界');
// 8

utilex.strLen('Hello 世界', true);
// 12

utilex.appArgs();
// command: node ./test/test-all.js --arg1 arg1Val --arg2 -arg3 arg3Val arg4 arg5 -c test/config-test.json
//
// {"arg1":"arg1Val","arg2":"","arg3":"arg3Val","arg4":"","arg5":"","c":"test/config-test.json"}

utilex.appConfig();
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

utilex.httpGetFile('http://nodejs.org/images/logo.svg', './nodejs-logo.svg', function(err, fp) {
  if(err) console.log(err);

  console.log('done!');
});
// done!

utilex.jsonLoad('test/config-test.json');
// { testKey: 'testVal' }

utilex.packageJSON('package.json');
// { name: 'utilex', ... }
```

### Changelog

For all notable changes see [CHANGELOG.md](https://github.com/cmfatih/utilex/blob/master/CHANGELOG.md)

### License

Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.

[npm-url]: http://npmjs.org/package/utilex
[npm-image]: https://badge.fury.io/js/utilex.png

[travis-url]: https://travis-ci.org/cmfatih/utilex
[travis-image]: https://travis-ci.org/cmfatih/utilex.svg?branch=master