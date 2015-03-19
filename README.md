## Utilex

[![NPM][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Utilex is a module that provides extra functions.

### Installation

```
npm install utilex
```

### Usage

#### appArgs

```javascript
var utilex = require('utilex');

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

#### appConfig

```javascript
var utilex = require('utilex');

utilex.appConfig();
// command arg: -c test/config-test.json
// config-test.json: {"testKey": "testVal"}
//
// {"file":"test/config-test.json","config":{"testKey":"testVal"}}
```

#### asyncFunc

```javascript
var utilex = require('utilex');

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

#### datetime

```javascript
var utilex = require('utilex');

utilex.datetime();
// 2015-01-15 20:00:00
utilex.datetime(new Date(1421370000000));
// 2015-01-15 20:00:00
```

#### dirIsWritable

```javascript
var utilex = require('utilex');

utilex.dirIsWritable(__dirname);
// true
```

#### httpGetFile

```javascript
var utilex = require('utilex');

utilex.httpGetFile('http://www.google.com/images/srpr/logo11w.png', './google-logo.png', function(err, fp) {
  if(err) console.log(err);
  console.log('done!');
});
// done!
```

#### jsonLoad

```javascript
var utilex = require('utilex');

utilex.jsonLoad('test/config-test.json');
// { testKey: 'testVal' }
```

#### strLen

```javascript
var utilex = require('utilex');

utilex.strLen('Hello 世界');
// 8
utilex.strLen('Hello 世界', true);
// 12
```

#### tasker

```javascript
var utilex = require('utilex');

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

#### uid

```javascript
var utilex = require('utilex');

utilex.uid();
// '43cdacfded3a47298b32bfa47269fdd2b55b33d6'
```

### License

Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.

[npm-url]: http://npmjs.org/package/utilex
[npm-image]: https://badge.fury.io/js/utilex.png

[travis-url]: https://travis-ci.org/cmfatih/utilex
[travis-image]: https://travis-ci.org/cmfatih/utilex.svg?branch=master