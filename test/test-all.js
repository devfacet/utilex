/* jslint node: true */
/* global describe: false, it: false */
'use strict';

process.argv.push('--arg1', 'arg1Val', '--arg2', '-arg3', 'arg3Val', 'arg4', 'arg5', '-c', 'test/config-test.json');

var utilex = require('../'),
    fs     = require('fs'),
    expect = require('chai').expect;

// Tests

// Test for the module
describe('utilex', function() {

  // Test for datetime
  describe('datetime()', function() {
    var datetime1 = utilex.datetime(),
        datetime2 = utilex.datetime(new Date(1388638740000));

    it('should return the tidy time (' + datetime1 + ')', function(done) {
      expect(datetime1).to.be.a('string');
      done();
    });

    it('should return the tidy time for the given time (' + datetime2 + ')', function(done) {
      expect(datetime2).to.be.a('string');
      done();
    });
  });

  // Test for conLog
  describe('conLog()', function() {
    var conLog = utilex.conLog('A log message', false);

    it("should return a tidy log message (" + JSON.stringify(conLog) + ')', function(done) {
      expect(conLog).to.be.a('object');
      expect(conLog).to.have.property('time');
      expect(conLog).to.have.property('message');
      done();
    });
  });

  // Test for appArgs
  describe('appArgs()', function() {
    var appArgs = utilex.appArgs();

    it('should return command line arguments', function(done) {
      expect(appArgs).to.be.a('object');
      expect(appArgs).to.have.property('arg1', 'arg1Val');
      expect(appArgs).to.have.property('arg2', '');
      expect(appArgs).to.have.property('arg3', 'arg3Val');
      expect(appArgs).to.have.property('arg4', '');
      expect(appArgs).to.have.property('arg5', '');
      expect(appArgs).to.have.property('c', 'test/config-test.json');
      done();
    });
  });

  // Test for appConfig
  describe('appConfig()', function() {
    var appConfig = utilex.appConfig();

    it('should return configuration (' + JSON.stringify(appConfig) + ')', function(done) {
      expect(appConfig).to.be.a('object');
      expect(appConfig).to.have.property('file', 'test/config-test.json');
      expect(appConfig).to.have.property('config');
      expect(appConfig.config).to.be.a('object');
      expect(appConfig.config).to.have.property('testKey', 'testVal');
      done();
    });
  });

  // Test for strLen
  describe('strLen()', function() {
    var helloStr      = 'Hello 世界',
        helloStrLen   = utilex.strLen(helloStr),
        helloStrLenB  = utilex.strLen(helloStr, true);

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
    it('should get the given url', function(done) {
      utilex.httpGetFile('http://nodejs.org/images/logo.svg', './nodejs-logo.svg', function(err, fp) {
        if(err) done(err);

        fs.unlink(fp, function(err) {
          if(err) done(err);
          done();
        });
      });
    });
  });

  // Test for jsonLoad
  describe('jsonLoad()', function() {
    var jsonLoad = utilex.jsonLoad('test/config-test.json');

    it('should load and return an object', function(done) {
      expect(jsonLoad).to.be.a('object');
      expect(jsonLoad).to.have.property('testKey', 'testVal');
      done();
    });
  });

  // Test for asyncFunc
  describe('asyncFunc()', function() {
    it('should return the correct result', function(done) {
      utilex.asyncFunc('hello', function(result) {
        expect(result).to.be.a('object');
        expect(result).to.have.property('input').to.be.equal('hello');
        expect(result).to.have.property('execTime').to.be.a('number').to.be.above(0);
        done();
      });
    });

    it('should return the correct result (options)', function(done) {
      utilex.asyncFunc('hello', {delay: 99}, function(result) {
        expect(result).to.be.a('object');
        expect(result).to.have.property('input').to.be.equal('hello');
        expect(result).to.have.property('execTime').to.be.equal(99);
        done();
      });
    });
  });

});