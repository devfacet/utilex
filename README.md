## Utilex

  [utilex](http://github.com/cmfatih/utilex) is a [node.js](http://nodejs.org) module for providing extra functions for node.js applications.  

  utilex on [npm registery](http://npmjs.org/package/utilex)

### Installation

For latest published version
```
npm install utilex
```

or for HEAD version
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
var mUtilex = require('utilex');

mUtilex.tidyTime();
// Output
/*
2014-01-25 14:05:22
*/

mUtilex.tidyLog('Tidy log...');
// Output
/*
{ time: '2014-01-25 14:08:39', message: 'Tidy log...' }
*/

mUtilex.tidyLog('Tidy log...', 'JSONT');
// Output
/*
{
  "time": "2014-01-25 14:09:33",
  "message": "Tidy log..."
}
*/

mUtilex.tidyArgs()
// Output
// command: node ./test/test-all.js --arg1 arg1Val --arg2 -arg3 arg3Val arg4 arg5 -c test/config-test.json
/*
{"arg1":"arg1Val","arg2":"","arg3":"arg3Val","arg4":"","arg5":"","c":"test/config-test.json"}
*/

mUtilex.tidyConfig()
// Output
// command: node -c test/config-test.json
// config-test.json: {"testKey": "testVal"}
/*
{"file":"test/config-test.json","config":{"testKey":"testVal"}}
*/

mUtilex.pathSep
// Output
/*
/
*/

mUtilex.pathCur
// Output
/*
/srv/var/utilex
*/

mUtilex.envMode
// Output
/*
DEV
*/
```

### Changelog

For all notable changes see [CHANGELOG.md](https://github.com/cmfatih/utilex/blob/master/CHANGELOG.md)

### License

Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/utilex)  
Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.
