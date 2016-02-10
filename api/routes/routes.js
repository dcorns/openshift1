/**
 * routes
 * Created by dcorns on 2/9/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var restify     = require('restify'),
  corngoose   = require('../js/corngoose');

module.exports = function(app){
  app.get('/status', function (req, res, next)
  {
    res.send("{status: 'ok'}");
  });

  app.get(/\/(css|js|img|icon|small-slides)\/?.*/, restify.serveStatic({directory: './static/'}));

  app.get('/current', function (req, res, next){
    console.log('current called');
    corngoose.getCollection('currentActivities', function(err, data){
      res.status(200);
      res.contentType = 'json';
      res.send(data);
      console.dir(data);
    });
  });

};