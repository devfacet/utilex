// Init reqs
/* jslint node: true */
'use strict';

var utilex = require('../'),
    fs     = require('fs')
;

// Init vars
var testList = {
      TIDYCLEAR: false,
      TIDYTIME: true,
      TIDYLOG: true,
      TIDYARGS: true,
      TIDYCONFIG: true,
      PATHSEP: true,
      PATHCUR: true,
      ENVMODE: true,
      DIRISWRT: true,
      HTTPGETFILE: true
    }
;

// Tests
utilex.tidyLog('test-all.js');

// Test for tidyClear
if(testList.TIDYCLEAR === true) {
  utilex.tidyLog('tidyClear: This message will not be shown...');
  utilex.tidyClear();
  utilex.tidyLog('tidyClear: OK');
}

// Test for tidyTime
if(testList.TIDYTIME === true) {
  utilex.tidyLog('tidyTime: ' + utilex.tidyTime());
  utilex.tidyLog('tidyTime: ' + utilex.tidyTime(new Date(1388638740000)));
}

// Test for tidyLog
if(testList.TIDYLOG === true) {
  utilex.tidyLog('tidyLog: OK');
}

// Test for tidyArgs
if(testList.TIDYARGS === true) {
  utilex.tidyLog('tidyArgs: ' + JSON.stringify(utilex.tidyArgs()));
}

// Test for tidyConfig
if(testList.TIDYCONFIG === true) {
  utilex.tidyLog('tidyConfig: ' + JSON.stringify(utilex.tidyConfig()));
}

// Test for pathSep
if(testList.PATHSEP === true) {
  utilex.tidyLog('pathSep: ' + utilex.pathSep);
}

// Test for pathCur
if(testList.PATHCUR === true) {
  utilex.tidyLog('pathCur: ' + utilex.pathCur);
}

// Test for envMode
if(testList.ENVMODE === true) {
  utilex.tidyLog('envMode: ' + utilex.envMode);
}

// Test for dirIsWritable
if(testList.DIRISWRT === true) {
  utilex.tidyLog('dirIsWritable: ' + utilex.dirIsWritable(__dirname));
}

// Test for httpGetFile
if(testList.HTTPGETFILE === true) {
  var fp = './nodejs-logo.svg';
  utilex.httpGetFile('http://nodejs.org/images/logo.svg', fp).then(function() {
    utilex.tidyLog('httpGetFile: done!');
    fs.unlinkSync(fp);
  }, function(err) {
    utilex.tidyLog('httpGetFile: ' + err);
  });
}