/*
 * Utilex
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/utilex)
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
/* jslint node: true */
'use strict';

var mFS   = require('fs'),  // fs module
    mPath = require('path') // path module
;

// Init the module
exports = module.exports = function() {

  // Init vars
  var tidyClear,    // clear console - function
      tidyTime,     // tidy time stamp - function
      tidyLog,      // tidy log message - function
      tidyArgs,     // tidy arguments - function
      tidyConfig,   // tidy config - function
      pathSep,      // system path separator - function
      pathCur,      // current path - function
      envMode,      // environment mode - function

      args          = process.argv, // arguments
      argsCnt       = args.length,  // arguments count
      argsF         = {},           // arguments for provide

      tidyConfigF   // config for provide
  ;

  // Init arguments
  if(argsCnt > 2) {
    
    // Init vars
    var tArgCur,
        tPrmCur,
        tPrmTrig,
        tPosB,
        tPosE
    ;

    for(var i = 2; i < argsCnt; i++) {
      tArgCur = ('' + args[i]).trim();

      if(tArgCur) {
        if(tArgCur.indexOf('-') === 0) {
          tPrmTrig  = false;
          tPosB     = (tArgCur.indexOf('--') === 0) ? 2 : 1;
          tPosE     = tArgCur.length;

          if(tPosE > tPosB) {
            tPrmCur = tArgCur.substring(tPosB, tPosE);

            argsF[tPrmCur]  = '';
            tPrmTrig        = true;
          }
        }
        else {
          if(tPrmTrig === true) {
            argsF[tPrmCur]  = tArgCur;
            tPrmCur         = null;
            tPrmTrig        = false;
          }
          else {
            argsF[tArgCur]  = '';
          }
        }
      }
    }
  }

  // Returns tidy time stamp
  tidyTime = function tidyTime() {
    return new Date(new Date().toISOString().replace("Z", "+0" + (new Date().getTimezoneOffset()/60) + ":00")).toISOString().replace("T", " ").substr(0, 19);
  };

  // Returns or output tidy log message
  tidyLog = function tidyLog(iStr, iOut) {
    var returnRes         = {"time": tidyTime(), "message": null};
        returnRes.message = (iStr && typeof console !== "undefined") ? iStr : null;

    return (iOut === undefined || iOut === true) ? console.log(returnRes) : returnRes;
  };

  // Clear console
  tidyClear = function tidyClear() {
    console.log('\u001B[2J\u001B[0;0f');
  };

  // Returns tidy arguments
  tidyArgs = function tidyArgs() {
    return argsF;
  };

  // Returns tidy config
  tidyConfig = function tidyConfig() {

    // Check vars
    if(tidyConfigF !== undefined) {
      return tidyConfigF;
    }

    // Init vars
    var configData,   // config data
        configError,  // config error
        configFile,   // config file

        args          = this.tidyArgs() // arguments
    ;

    // Read config file
    configFile        = (args.c || args.configFile) || null;

    if(configFile) {
      if(mFS.existsSync(configFile)) {
        try {
          configData  = JSON.parse(mFS.readFileSync(configFile));
        }
        catch(e) {
          configError = 'Invalid configuration file! (' + configFile + ') (' + e + ')';
        }
      }
      else {
        configError   = 'Configuration file could not be read! (' + configFile + ')';
      }
    }
    else {
      configError     = 'Missing configuration file!';
    }

    // Return
    tidyConfigF = {
      error: configError,
      file: configFile,
      config: configData
    };

    return tidyConfigF;
  };

  // Returns system path separator
  pathSep = function pathSep() {
    return mPath.sep;
  }();

  // Returns current path
  pathCur = function pathCur() {
    return mFS.realpathSync('.');
  }();

  // Returns environment mode
  envMode = function envMode() {
    return (process.env.NODE_ENV !== undefined) ? process.env.NODE_ENV : null;
  }();

  // Return
  return {
    tidyTime: tidyTime,
    tidyLog: tidyLog,
    tidyClear: tidyClear,
    tidyArgs: tidyArgs,
    tidyConfig: tidyConfig,
    pathSep: pathSep,
    pathCur: pathCur,
    envMode: envMode
  };
}();