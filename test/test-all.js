// Init reqs
/* jslint node: true */
'use strict';

var mUtilex   = require('../');

// Init vars
var gTestList = {
      TIDYCLEAR: false,
      TIDYTIME: true,
      TIDYLOG: true,
      TIDYARGS: true,
      TIDYCONFIG: true,
      PATHSEP: true,
      PATHCUR: true,
      ENVMODE: true,
      DIRISWRT: true
    }
;

// Tests
console.log('test-all.js');

// Test for tidyClear
if(gTestList.TIDYCLEAR === true) {
  console.log('This message will not be shown...');
  mUtilex.tidyClear();
  console.log('TIDYCLEAR:OK');
}

// Test for tidyTime
if(gTestList.TIDYTIME === true) {
  console.log('TIDYTIME:');
  console.log(mUtilex.tidyTime());
}

// Test for tidyLog
if(gTestList.TIDYLOG === true) {
  console.log('TIDYLOG:');
  mUtilex.tidyLog('Tidy log...');
}

// Test for tidyArgs
if(gTestList.TIDYARGS === true) {
  console.log('TIDYARGS:');
  console.log(JSON.stringify(mUtilex.tidyArgs()));
}

// Test for tidyConfig
if(gTestList.TIDYCONFIG === true) {
  console.log('TIDYCONFIG:');
  console.log(JSON.stringify(mUtilex.tidyConfig()));
}

// Test for pathSep
if(gTestList.PATHSEP === true) {
  console.log('PATHSEP:');
  console.log(mUtilex.pathSep);
}

// Test for pathCur
if(gTestList.PATHCUR === true) {
  console.log('PATHCUR:');
  console.log(mUtilex.pathCur);
}

// Test for envMode
if(gTestList.ENVMODE === true) {
  console.log('ENVMODE:');
  console.log(mUtilex.envMode);
}

// Test for dirIsWritable
if(gTestList.DIRISWRT === true) {
  console.log('DIRISWRT:');
  console.log(mUtilex.dirIsWritable(__dirname));
}