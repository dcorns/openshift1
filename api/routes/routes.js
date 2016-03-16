/**
 * routes
 * Created by dcorns on 2/9/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var restify     = require('restify'),
  corngoose   = require('corngoose'),
  auth = require('cornorize');

module.exports = function(app){
  app.get('/status', function (req, res, next)
  {
    res.send("{status: 'ok'}");
  });

  app.get(/\/(css|js|img|icon|small-slides)\/?.*/, restify.serveStatic({directory: './static/'}));

  app.get('/current', function (req, res, next){
    corngoose.getCollection('currentActivities', function(err, data){
      res.status(200);
      res.contentType = 'json';
      res.send(data);
    });
  });

  app.get('/skills', function (req, res, next){
    corngoose.getCollection('competencies', function(err, data){
      res.status(200);
      res.contentType = 'json';
      res.send(data);
    });
  });

  app.get('/examples', function (req, res, next){
    corngoose.getCollection('examples', function(err, data){
      res.status(200);
      res.contentType = 'json';
      res.send(data);
    });
  });

  app.get('/repos', function (req, res, next){
    corngoose.getCollection('repos', function(err, data){
      res.status(200);
      res.contentType = 'json';
      res.send(data);
    });
  });

  app.post('/newAccount', function (req, res, next){
    auth.encrypt(req.params.password, function(err, data){
      if(err){
        playErr(res, err);
      }else{
        const hash = data;
        corngoose.dbDocInsert({email:req.params.email},{email:req.params.email, password: hash},'users', function(err, data){
          if(err){
            playErr(res, err);
          }else{
            res.status(201);
            res.contentType = 'json';
            res.send(data);
          }
        });
      }
    });

  });

  app.post('/login', function (req, res, next){
    console.log(req.params);
    res.contentType = 'json';
    let email, password;
    try{
      email = req.params.email; password = req.params.password;
    }
    catch(e){
      res.status(400);
      res.send(e);
    }
    corngoose.dbDocFind({email:email}, 'users', function(err, data){
      if(err){
        res.status(404);
        res.send(err);
      }else{
        auth.authenticate({password: password}, {passHash: data.password}, function(err, data){
          if(err){
            res.status(401);
            res.send(err);
          }
          let token = auth.makeToken(data, 10, process.env.DRCAUTH);
          res.status(200);
          res.send({token: token});
        });
      }
    });
  });
};

function playErr(res, err){
  console.error(err);
  res.status(500);
  res.contentType = 'json';
  res.send(err);
}