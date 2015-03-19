/* jslint node: true */
/* global describe: false, it: false */
'use strict';

process.argv.push('--arg1', 'arg1Val', '--arg2', '-arg3', 'arg3Val', 'arg4', 'arg5', '-c', 'test/data-simple.json');

var utilex = require('../'),
    fs     = require('fs'),
    expect = require('chai').expect;

// Tests

describe('utilex', function() {

  describe('args()', function() {
    var args = utilex.args();

    it('should return command line arguments', function(done) {
      expect(args).to.be.a('object');
      expect(args).to.have.property('arg1', 'arg1Val');
      expect(args).to.have.property('arg2', '');
      expect(args).to.have.property('arg3', 'arg3Val');
      expect(args).to.have.property('arg4', '');
      expect(args).to.have.property('arg5', '');
      expect(args).to.have.property('c', 'test/data-simple.json');
      done();
    });
  });

  describe('asyncFunc()', function() {
    it('should run correctly', function(done) {
      utilex.asyncFunc('hello', function(result) {
        expect(result).to.be.a('object');
        expect(result).to.have.property('input').to.be.equal('hello');
        expect(result).to.have.property('execTime').to.be.a('number').to.be.above(0);
        done();
      });
    });

    it('should run correctly (options)', function(done) {
      utilex.asyncFunc('hello', {delay: 99}, function(result) {
        expect(result).to.be.a('object');
        expect(result).to.have.property('input').to.be.equal('hello');
        expect(result).to.have.property('execTime').to.be.equal(99);
        done();
      });
    });
  });

  describe('dirIsWritable()', function() {
    var dirIsWritable = utilex.dirIsWritable(__dirname);

    it('should check whether a directory is writable or not (' + dirIsWritable + ')', function(done) {
      expect(dirIsWritable).to.be.a('boolean');
      done();
    });
  });

  describe('httpGetFile()', function() {
    it('should get a file', function(done) {
      utilex.httpGetFile('http://www.google.com/images/srpr/logo11w.png', './google-logo.png', function(err, fp) {
        if(err) done(err);

        fs.unlink(fp, function(err) {
          if(err) done(err);
          done();
        });
      });
    });
  });

  describe('jsonLoad()', function() {
    var jsonLoad = utilex.jsonLoad('test/data-simple.json');

    it('should load a JSON file', function(done) {
      expect(jsonLoad).to.be.a('object');
      expect(jsonLoad).to.have.property('testKey', 'testVal');
      done();
    });
  });

  describe('strLen()', function() {
    var helloStr      = 'Hello 世界',
        helloStrLen   = utilex.strLen(helloStr),
        helloStrLenB  = utilex.strLen(helloStr, true);

    it('should return correct string length (' + helloStr + ' / 8)', function(done) {
      expect(helloStrLen).to.be.a('number').to.be.equal(8);
      done();
    });

    it('should return correct byte length (' + helloStr + ' / 12)', function(done) {
      expect(helloStrLenB).to.be.a('number').be.equal(12);
      done();
    });
  });

  describe('tasker()', function() {
    it('should run correctly', function(done) {

      var tasker = utilex.tasker();
      tasker.results = [];
      tasker.add({counter: 0});
      tasker.run(function(task, next) {
        tasker.results.push(++task.counter);
        if(task.counter < 5) {
          tasker.add({counter: task.counter});
        }
        next();
      }, function() {
        expect(tasker.results).to.be.a('array').to.be.deep.equal([1,2,3,4,5]);
        done();
      });
    });
  });

  describe('uid()', function() {
    var uid = utilex.uid();

    it('should return a unique id', function(done) {
      expect(uid).to.be.a('string');
      expect(uid).to.have.property('length', 40);
      done();
    });
  });

});