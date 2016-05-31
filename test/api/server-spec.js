/**
 * server-spec.js
 * Created by dcorns on 5/31/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var request = require('supertest');
describe('server', function(){
  var server;
  beforeEach(function(){
    //in order to have a new server instance created each time we must bust the cache otherwise node will not require it a second time, it will just use the cached version
    delete require.cache[require.resolve('../../server')];
    server = require('../../server');
  });
  //pass done to server close so it waits for the previous server instance to stop
  afterEach(function(done){
    server.close(done);
  });
  it('it responds to /', function testGetRoot(done){
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('it with 404 when path is not valid', function testGetRoot(done){
    request(server)
      .get('/monkey')
      .expect(404, done);
  });

});