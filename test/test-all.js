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
  describe('tidyTime()', function() {
    var tidyTime1 = utilex.tidyTime(),
        tidyTime2 = utilex.tidyTime(new Date(1388638740000))
    ;

    it('should return the tidy time (' + tidyTime1 + ')', function(done) {
      expect(tidyTime1).to.be.a('string');
      done();
    });

    it('should return the tidy time for the given time (' + tidyTime2 + ')', function(done) {
      expect(tidyTime2).to.be.a('string');
      done();
    });
  });

  // Test for tidy log
  describe('tidyLog()', function() {
    var tidyLog = utilex.tidyLog('A log message', false);

    it("should return a tidy log message (" + JSON.stringify(tidyLog) + ')', function(done) {
      expect(tidyLog).to.be.a('object');
      expect(tidyLog).to.have.property('time');
      expect(tidyLog).to.have.property('message');
      done();
    });
  });

  // Test for tidy arguments
  describe('tidyArgs()', function() {
    var tidyArgs = utilex.tidyArgs();

    it('should return command line arguments', function(done) {
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
  describe('tidyConfig()', function() {
    var tidyConfig = utilex.tidyConfig();

    it('should return configuration (' + JSON.stringify(tidyConfig) + ')', function(done) {
      expect(tidyConfig).to.be.a('object');
      expect(tidyConfig).to.have.property('file', 'test/config-test.json');
      expect(tidyConfig).to.have.property('config');
      expect(tidyConfig.config).to.be.a('object');
      expect(tidyConfig.config).to.have.property('testKey', 'testVal');
      done();
    });
  });

  // Test for tidy length
  describe('tidyLen()', function() {
    var helloStr      = 'Hello 世界',
        helloStrLen   = utilex.tidyLen(helloStr),
        helloStrLenB  = utilex.tidyLen(helloStr, true)
    ;

    it('should return correct string length (' + helloStr + ' / 8)', function(done) {
      expect(helloStrLen).to.be.a('number');
      expect(helloStrLen).to.be.equal(8);
      done();
    });

    it('should return correct byte length (' + helloStr + ' / 12)', function(done) {
      expect(helloStrLenB).to.be.a('number');
      expect(helloStrLenB).to.be.equal(12);
      done();
    });
  });

  // Test for dirIsWritable
  describe('dirIsWritable()', function() {
    var dirIsWritable = utilex.dirIsWritable(__dirname);

    it('should check whether the given directory is writable or not (' + dirIsWritable + ')', function(done) {
      expect(dirIsWritable).to.be.a('boolean');
      done();
    });
  });

  // Test for httpGetFile
  describe('httpGetFile()', function() {
    var fp = './nodejs-logo.svg';

    it('should get the given url', function(done) {
      utilex.httpGetFile('http://nodejs.org/images/logo.svg', fp).then(function() {
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
    it('pathSep should return platform-specific file separator (' + utilex.pathSep + ')', function(done) {
      expect(utilex.pathSep).to.be.a('string');
      done();
    });

    it('pathCur should return current path (' + utilex.pathCur + ')', function(done) {
      expect(utilex.pathCur).to.be.a('string');
      done();
    });

    it('envMode should return environment mode (' + utilex.envMode + ')', function(done) {
      expect(utilex.envMode).to.be.equal('development');
      done();
    });
  });
});