/*
 * Utilex
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/utilex)
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

/* jslint node: true */
'use strict';

var fs     = require('fs'),
    path   = require('path'),
    http   = require('http'),
    crypto = require('crypto');

// Init the module
exports = module.exports = (function() {

  // Returns tidy arguments
  var appArgs = function appArgs() {

    if(!process.argv.length) {
      return {};
    }

    var args  = process.argv,
        argsF = {},
        currentArg,
        currentParam,
        paramFlag,
        posBegin,
        posEnd;

    for(var i = 0, len = args.length; i < len; i++) {
      currentArg = ('' + args[i]).trim();

      if(currentArg) {
        if(currentArg.indexOf('-') === 0) {
          paramFlag = false;
          posBegin  = (currentArg.indexOf('--') === 0) ? 2 : 1;
          posEnd    = currentArg.length;

          if(posEnd > posBegin) {
            currentParam = currentArg.substring(posBegin, posEnd);
            argsF[currentParam] = '';
            paramFlag = true;
          }
        } else {
          if(paramFlag === true) {
            argsF[currentParam] = currentArg;
            currentParam = null;
            paramFlag = false;
          } else {
            argsF[currentArg] = '';
          }
        }
      }
    }

    return argsF;
  };

  // Returns date time
  var datetime = function datetime(date) {
    var pDate = (typeof date === 'object' && date.toISOString) ? date : new Date();
    return new Date(pDate.toISOString().replace('Z', '+0' + (pDate.getTimezoneOffset()/60) + ':00')).toISOString().replace('T', ' ').substr(0, 19);
  };

  // Clears console
  var consoleClear = function consoleClear() {
    if(typeof console !== 'undefined') console.log('\u001B[2J\u001B[0;0f');
  };

  // Returns the length of the given string
  var strLen = function strLen(str, isByteLen) {
    if(typeof str !== undefined) {
      if(isByteLen === true) {
        return ~-encodeURI(str).split(/%..|./).length;
      } else {
        return str.length;
      }
    }

    return 0;
  };

  // Checks whether the given directory is writable or not
  var dirIsWritable = function dirIsWritable(dirPath) {

    var fp = dirPath + path.sep + 'file.tmp' ;

    if(!fs.existsSync(dirPath)) return false; // Check dir

    try {
      fs.writeFileSync(fp); // Write to the dir
      try {
        fs.unlinkSync(fp); // Remove the temp file
        return true;
      } catch(e) {
        return false;
      }
    } catch(e) {
      return false;
    }

    return false;
  };

  // Gets a file
  // TODO: Just rewrite this
  var httpGetFile = function httpGet(getUrl, filePath, callback) {
    if(!getUrl || !filePath)
      return false;
    if(typeof callback !== 'function')
      callback = function callback(err, result) { return err || result; };

    // Get and save
    http.get(getUrl, function(res) {
      if(res.statusCode === 200) {
        var ws = res.pipe(fs.createWriteStream(filePath));

        ws.on('finish', function() {
          return callback(null, filePath);
        });
        ws.on('error', function(err) {
          return callback(err);
        });
      } else {
        res.destroy();
        return callback('Bad response (' + res.statusCode + ')');
      }
    }).on('error', function(err) {
      return callback(err);
    });
  };

  // Loads a JSON file
  var jsonLoad = function jsonLoad(filePath) {
    if(typeof filePath === 'string' && fs.existsSync(filePath)) {
      try {
        return JSON.parse(fs.readFileSync(filePath));
      } catch(e) {
        return false;
      }
    }

    return false;
  };

  // Simulates an asynchronous function
  var asyncFunc = function asyncFunc(input, options, callback) {
    if(typeof options === 'function')
      callback = options;
    if(typeof callback !== 'function')
      callback = function callback(err) { return err; };
    if(!options || typeof options !== 'object')
      options = {};
    if(!options.delay || isNaN(options.delay))
      options.delay = Math.floor((Math.random() * 200));

    setTimeout(function() {
      return callback({input: input, execTime: options.delay});
    }, options.delay);
  };

  // Returns a tasker
  var tasker = function() {
    var tasks = [];

    // Adds a task
    var add = function add(anything) {
      tasks.push(anything);
    };

    // Runs tasks
    var run = function run(cbEach, cbDone) {
      var next = function next() {
        var task = tasks.shift();
        if(!task) { return cbDone(); }
        return cbEach(task, next);
      };
      next();
    };

    // Return
    return {
      add: add,
      run: run
    };
  };

  // Returns a unique id
  var uid = function() {
    return crypto.randomBytes(20).toString('hex');
  }

  // Return
  return {
    appArgs:       appArgs,
    asyncFunc:     asyncFunc,
    consoleClear:  consoleClear,
    datetime:      datetime,
    dirIsWritable: dirIsWritable,
    httpGetFile:   httpGetFile,
    jsonLoad:      jsonLoad,
    strLen:        strLen,
    tasker:        tasker,
    uid:           uid
  };
})();