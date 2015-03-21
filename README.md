## Utilex

[![NPM][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Utilex is a module that provides extra functions.

### Installation

```
npm install utilex
```

### Usage

```javascript
var utilex = require('utilex');
```

#### args

Returns command line arguments

```javascript
// command: node app.js --arg1 arg1Val --arg2 -arg3 arg3Val arg4 arg5 -c test/data-simple.json
utilex.args();
// {
//   "arg1": "arg1Val",
//   "arg2": "",
//   "arg3": "arg3Val",
//   "arg4": "",
//   "arg5": "",
//   "c": "test/data-simple.json"
// }
```

#### consoleClear

Clears console

```javascript
node -e 'require("./lib/utilex").consoleClear()'
```

#### dirIsWritable

Checks whether given directory is writable or not

```javascript
utilex.dirIsWritable(__dirname);
// true
```

#### download

Downloads file

```javascript
utilex.download('http://www.google.com/images/srpr/logo11w.png', './google-logo.png', function(err, fp) {
  if(err) console.log(err);
  console.log(fp + ' is downloaded.');
});
// done!
```

#### jsonLoad

Loads JSON file

```javascript
utilex.jsonLoad('test/data-simple.json');
// { testKey: 'testVal' }
```

#### strLen

Returns the length of given string

```javascript
utilex.strLen('Hello 世界');
// 8
utilex.strLen('Hello 世界', true);
// 12
```

#### tasker

Returns a tasker for handling async events

```javascript
var tasker = utilex.tasker();

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

Returns an unique id

```javascript
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