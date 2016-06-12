/**
 * usefulFunctions-spec
 * Created by dcorns on 6/10/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var expect = require('chai').expect;
describe('usefulFunctions', function(){
  var uf;
  beforeEach(function(){
    uf = require('../../api/Helpers/usefulFunctions');
  });
  describe('breakUpString', function () {
    describe('Validation-breakUpString', function(){
      it('Throws an error if the first argument in not a string', function(){
        expect(function(){uf.breakUpString()}).to.throw(TypeError);
        expect(function(){uf.breakUpString(0)}).to.throw(TypeError);
        expect(function(){uf.breakUpString({})}).to.throw(TypeError);
        expect(function(){uf.breakUpString([])}).to.throw(TypeError);
      });
      it('Throws an error if the second argument is not an positive integer', function(){
        expect(function(){uf.breakUpString('str')}).to.throw(TypeError);
        expect(function(){uf.breakUpString('str', {})}).to.throw(TypeError);
        expect(function(){uf.breakUpString('str', [])}).to.throw(TypeError);
        expect(function(){uf.breakUpString('str', 'str')}).to.throw(TypeError);
        expect(function(){uf.breakUpString('str', 5.4)}).to.throw(TypeError);
        expect(function(){uf.breakUpString('str', -5)}).to.throw(TypeError);
      });
      it('It returns an empty array if the third argument is not undefined and not an array', function(){
        expect(uf.breakUpString('str', 8, 0)).to.be.a('array');
        expect(uf.breakUpString('str', 8, '')).to.be.a('array');
        expect(uf.breakUpString('str', 8, {})).to.be.a('array');
      });
    });
    describe('Working-breakUpString', function(){
      it('Returns an array of strings from the first argument, each with a length less than or equal to second argument', function(){
        var x = uf.breakUpString('What is the Meaning of Life?', 9);
        expect(x.length).to.equal(4);
        expect(x[0].length).to.equal(9);
        expect(x[1].length).to.equal(9);
        expect(x[2].length).to.equal(9);
        expect(x[3].length).to.equal(1);
      });
    });

  });
});