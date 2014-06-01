/*
 * Utilex
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/utilex)
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
/* jslint node: true */
'use strict';

var fs   = require('fs'),
    path = require('path'),
    http = require('http'),
    q    = require('q');

// Init the module
exports = module.exports = function() {

  var datetime,      // time stamp - function
      conClear,      // clear console - function
      conLog,        // console log - function
      args           = process.argv, // arguments
      argsCnt        = args.length,  // arguments count
      argsF          = {},           // arguments for provide
      appArgs,       // app arguments - function
      appConfig,     // app configuration - function
      appConfigF,    // configuration for providing
      strLen,        // string length - function
      pathSep,       // system path separator - function
      pathCur,       // current path - function
      envMode,       // environment mode - function
      dirIsWritable, // checks directory for write access - function
      httpGetFile;   // gets the file on given URL - function

  // Check arguments
  if(argsCnt > 2) {
    var currentArg,
        currentParam,
        paramFlag,
        posBegin,
        posEnd;

    for(var i = 2; i < argsCnt; i++) {
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
  }

  // Returns date time
  datetime = function datetime(date) {
    var pDate = (typeof date === 'object' && date.toISOString) ? date : new Date();
    return new Date(pDate.toISOString().replace('Z', '+0' + (pDate.getTimezoneOffset()/60) + ':00')).toISOString().replace('T', ' ').substr(0, 19);
  };

  // Returns or output log message for console
  conLog = function conLog(str, output) {

    var result = {'time': datetime(), 'message': str};

    if(typeof console === 'undefined') return result;

    if(output === undefined || output === true) {
      console.log(result);
    } else if(output === 'JSON') {
      console.log(JSON.stringify(result));
    } else if(output === 'JSONT') {
      console.log(JSON.stringify(result, null, 2));
    }

    return result;
  };

  // Clear console
  conClear = function conClear() {
    if(typeof console !== 'undefined') console.log('\u001B[2J\u001B[0;0f');
  };

  // Returns tidy arguments
  appArgs = function appArgs() {
    return argsF;
  };

  // Returns the length of the given string
  strLen = function strLen(str, isByteLen) {
    if(typeof str !== undefined) {
      if(isByteLen === true) {
        return ~-encodeURI(str).split(/%..|./).length;
      } else {
        return str.length;
      }
    }

    return 0;
  };

  // Returns tidy config
  appConfig = function appConfig() {
    if(appConfigF !== undefined) return appConfigF;

    var configData,
        configError,
        configFile,
        args = this.appArgs();

    // Read the config file
    configFile = (args.c || args.configFile) || null;

    if(configFile) {
      if(fs.existsSync(configFile)) {
        try {
          configData  = JSON.parse(fs.readFileSync(configFile));
        } catch(e) {
          configError = 'Invalid configuration file! (' + configFile + ') (' + e + ')';
        }
      } else {
        configError   = 'Configuration file could not be read! (' + configFile + ')';
      }
    } else {
      configError     = 'Missing configuration file!';
    }

    // Return
    appConfigF = {error: configError, file: configFile, config: configData};

    return appConfigF;
  };

  // Returns system path separator
  pathSep = function pathSep() {
    return path.sep;
  }();

  // Returns current path
  pathCur = function pathCur() {
    return fs.realpathSync('.');
  }();

  // Returns environment mode
  envMode = function envMode() {
    return (process.env.NODE_ENV !== undefined) ? process.env.NODE_ENV : 'development';
  }();

  // Checks whether the given directory is writable or not
  dirIsWritable = function dirIsWritable(dirPath) {

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

  // Saves the given url to the given file
  httpGetFile = function httpGet(getUrl, filePath) {
    if(!getUrl || !filePath) return false;

    var deferred = q.defer();

    // Get and save
    http.get(getUrl, function(res) {
      if(res.statusCode === 200) {
        var ws = res.pipe(fs.createWriteStream(filePath));
        ws.on('finish', function() {
          deferred.resolve(filePath);
        });
        ws.on('error', function(err) {
          deferred.reject(err);
        });
      } else {
        res.destroy();
        deferred.reject('Bad response (' + res.statusCode + ')');
      }
    }).on('error', function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  };

  // Return
  return {
    datetime: datetime,
    conClear: conClear,
    conLog: conLog,
    appArgs: appArgs,
    appConfig: appConfig,
    strLen: strLen,

    pathSep: pathSep,
    pathCur: pathCur,
    envMode: envMode,
    dirIsWritable: dirIsWritable,
    httpGetFile: httpGetFile,

    // support for earlier releases
    tidyTime: datetime,
    tidyLog: conLog,
    tidyClear: conClear,
    tidyArgs: appArgs,
    tidyConfig: appConfig,
    tidyLen: strLen
  };
}();