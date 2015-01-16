## Utilex
[![NPM][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

[utilex](http://github.com/cmfatih/utilex) is a node.js module that provides extra functions.

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
```

```javascript
utilex.datetime();
// 2015-01-15 20:00:00

utilex.datetime(new Date(1421370000000));
// 2015-01-15 20:00:00
```

```javascript
utilex.conLog('Tidy log...');
// { time: '2015-01-15 20:00:00', message: 'Tidy log...' }
```

```javascript
utilex.strLen('Hello 世界');
// 8

utilex.strLen('Hello 世界', true);
// 12
```

```javascript
utilex.appArgs();
// command: node ./test/test-all.js --arg1 arg1Val --arg2 -arg3 arg3Val arg4 arg5 -c test/config-test.json
//
// {
//   "arg1": "arg1Val",
//   "arg2": "",
//   "arg3": "arg3Val",
//   "arg4": "",
//   "arg5": "",
//   "c": "test/config-test.json"
// }
```

```javascript
utilex.appConfig();
// command arg: -c test/config-test.json
// config-test.json: {"testKey": "testVal"}
//
// {"file":"test/config-test.json","config":{"testKey":"testVal"}}
```

```javascript
utilex.dirIsWritable(__dirname);
// true
```

```javascript
utilex.httpGetFile('http://nodejs.org/images/logo.svg', './nodejs-logo.svg', function(err, fp) {
  if(err) console.log(err);
  console.log('done!');
});
// done!
```

```javascript
utilex.jsonLoad('test/config-test.json');
// { testKey: 'testVal' }
```

```javascript
utilex.asyncFunc('hello', function(result) { console.log(result); });
// { input: 'hello', execTime: 95 }

[
  utilex.asyncFunc('Always', {delay: 250}, console.log),
  utilex.asyncFunc('bet', console.log),
  utilex.asyncFunc('on', console.log),
  utilex.asyncFunc('JS', console.log)
];
// { input: 'on', execTime: 125 }
// { input: 'bet', execTime: 165 }
// { input: 'JS', execTime: 175 }
// { input: 'Always', execTime: 250 }
```

```javascript
var tasker = utilex.tasker();
// Loop for async events

tasker.results = [];
tasker.add({counter: 0});
tasker.run(function(task, next) {
  tasker.results.push(++task.counter);
  if(task.counter < 10) {
    tasker.add({counter: task.counter});
  }
  next();
}, function() {
  console.log(tasker.results);
});
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
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