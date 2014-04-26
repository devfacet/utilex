// Init reqs
/* jslint node: true */
/* global describe: false */
/* global it: false */
'use strict';

process.argv.push('--arg1', 'arg1Val', '--arg2', '-arg3', 'arg3Val', 'arg4', 'arg5', '-c', 'test/config-test.json');

var utilex = require('../'),
    fs     = require('fs'),
    expect = require('chai').expect
;

// Tests

// Test for utilex module
describe('utilex', function() {

  // Test for tidy time
  describe('tidyTime', function() {
    var tidyTime1 = utilex.tidyTime(),
        tidyTime2 = utilex.tidyTime(new Date(1388638740000))
    ;

    it('tidyTime() should return a time (' + tidyTime1 + ')', function(done) {
      expect(tidyTime1).to.be.a('string');
      done();
    });

    it('tidyTime(new Date(1388638740000)) should return a time (' + tidyTime2 + ')', function(done) {
      expect(tidyTime2).to.be.a('string');
      done();
    });
  });

  // Test for tidy log
  describe('tidyLog', function() {
    var tidyLog = utilex.tidyLog('A log message', false);

    it("tidyLog('A log message') should return a log message (" + JSON.stringify(tidyLog) + ')', function(done) {
      expect(tidyLog).to.be.a('object');
      expect(tidyLog).to.have.property('time');
      expect(tidyLog).to.have.property('message');
      done(); 
    });
  });

  // Test for tidy arguments
  describe('tidyArgs', function() {
    var tidyArgs = utilex.tidyArgs();

    it('tidyArgs() should return command line arguments', function(done) {
      expect(tidyArgs).to.be.a('object');
      expect(tidyArgs).to.have.property('arg1', 'arg1Val');
      expect(tidyArgs).to.have.property('arg2', '');
      expect(tidyArgs).to.have.property('arg3', 'arg3Val');
      expect(tidyArgs).to.have.property('arg4', '');
      expect(tidyArgs).to.have.property('arg5', '');
      expect(tidyArgs).to.have.property('c', 'test/config-test.json');
      done();
    });
  });

  // Test for tidy config
  describe('tidyConfig', function() {
    var tidyConfig = utilex.tidyConfig();

    it('tidyConfig() should return config (' + JSON.stringify(tidyConfig) + ')', function(done) {
      expect(tidyConfig).to.be.a('object');
      expect(tidyConfig).to.have.property('file', 'test/config-test.json');
      expect(tidyConfig).to.have.property('config');
      expect(tidyConfig.config).to.be.a('object');
      expect(tidyConfig.config).to.have.property('testKey', 'testVal');
      done();
    });
  });

  // Test for dirIsWritable
  describe('dirIsWritable', function() {
    var dirIsWritable = utilex.dirIsWritable(__dirname);

    it('dirIsWritable(__dirname) should run without any error (' + dirIsWritable + ')', function(done) {
      expect(dirIsWritable).to.be.a('boolean');
      done();
    });
  });

  // Test for httpGetFile
  describe('httpGetFile', function() {
    var fp = './nodejs-logo.svg';

    it('httpGetFile() should run without any error', function(done) {
      utilex.httpGetFile('http://nodejs.org/images/logo.svg', fp).then(function(path) {
        fs.unlink(fp, function(err) {
          if(!err) {
            done();
          } else {
            done(err);
          }
        });
      }, function(err) {
        done(err);
      });
    });
  });

  // Test for others
  describe('others', function() {
    var tidyConfig = utilex.pathSep;

    it('pathSep should return platform-specific file separator. (' + utilex.pathSep + ')', function(done) {
      expect(utilex.pathSep).to.be.a('string');
      done();
    });

    it('pathCur should return current path. (' + utilex.pathCur + ')', function(done) {
      expect(utilex.pathCur).to.be.a('string');
      done();
    });

    it('envMode should return environment mode. (' + utilex.envMode + ')', function(done) {
      expect(utilex.envMode).to.be.a('null');
      done();
    });
  });
});