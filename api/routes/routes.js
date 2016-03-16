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
    let user = {email:req.params.email.toLowerCase(), accessLevel: 'user'};
    auth.encrypt(req.params.password, function(err, data){
      if(err){
        playErr(res, err);
      }else{
        user.hash = data;
        corngoose.dbDocInsert({email:req.params.email.toLowerCase()}, user, 'users', function(err, data){
          if(err){
            playErr(res, err);
          }else{
            user.tokenAddress = req.connection.remoteAddress;
            let token = auth.makeToken(user, 10, process.env.DRCAUTH);
            res.status(201);
            res.contentType = 'json';
            res.send({token:token});
          }
        });
      }
    });

  });

  app.post('/login', function (req, res, next){
    res.contentType = 'json';
    let email, password;
    try{
      email = req.params.email.toLowerCase(); password = req.params.password;
    }
    catch(e){
      res.status(400);
      res.send(e);
    }
    corngoose.dbDocFind({email:email}, 'users', function(err, data){
      if(err){
        res.status(404);
        res.send(err);
      }
      else{
        let user = {email: data[0].email, accessLevel: data[0].accessLevel, tokenAddress: req.connection.remoteAddress};
        auth.authenticate({password: password}, {passHash: data[0].hash}, function(err, data){
          if(err){
            console.dir(err);
            res.status(401);
            res.send(err);
          }
          console.dir(user);
          let token = auth.makeToken(user, 10, process.env.DRCAUTH);
          console.log(token);
          res.status(201);
          res.send({token: token});
        });
      }
    });
  });

  app.post('/tokenAccess', function(req, res, next){
    res.contentType = 'json';
    let DRCTech = req.params.DRCTech, userAccess, remoteAddress = req.connection.remoteAddress;
    userAccess = auth.decodeToken(DRCTech, process.env.DRCAUTH);
    if(userAccess){
      if(userAccess.remoteAddress === remoteAddress){
        //Now what about expiration date
      }
    }
  });
};

function playErr(res, err){
  console.error(err);
  res.status(500);
  res.contentType = 'json';
  res.send(err);
}