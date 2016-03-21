/**
 * routes
 * Created by dcorns on 2/9/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var restify     = require('restify'),
  corngoose   = require('corngoose'),
  auth = require('cornorize');
const secret = process.env.DRCAUTH;

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
            let token;
            try{
              token = auth.makeToken(user, 10, process.env.DRCAUTH);
              res.status(201);
              res.contentType = 'json';
              res.send({token:token});
            }
            catch(e){
              e.newAccount = 'Failed to create token';
              console.error(e);
              res.status(500);
              res.send({error: e});
            }
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
      console.log('error caught!');
      res.status(400);
      res.send(e);
    }
    corngoose.dbDocFind({email:email}, 'users', function(err, data){
      if(err){
        console.log('error retrieving login user');
        res.status(404);
        res.send(err);
      }
      else{
        let user = {email: data[0].email, accessLevel: data[0].accessLevel, tokenAddress: req.connection.remoteAddress};
        auth.authenticate({password: password}, {passHash: data[0].hash}, function(err, data){
          if(err){
            console.log('error in login authenticate');
            console.dir(err);
            res.status(401);
            res.send(err);
          }
          let token;
          try{
            token = auth.makeToken(user, 10, process.env.DRCAUTH);
            res.status(201);
            res.send({token: token});
          }
          catch(e){
            e.login = 'Failed to create token';
            console.error(e);
            res.status(500);
            res.send({error: e});
          }
        });
      }
    });
  });

  app.post('/tokenAccess', function(req, res, next){
    res.contentType = 'json';
    let DRCToken = req.params.DRCToken, userAccess, remoteAddress = req.connection.remoteAddress;
    userAccess = auth.decodeToken(DRCToken, process.env.DRCAUTH);
    if(userAccess.expires){//token is valid
      if(userAccess.resources.tokenAddress === remoteAddress){
        res.status(201);
        res.send({tokenExpires:userAccess.expires});
      }
      else{
        console.dir(userAccess);
        res.status(401);
        res.send({error: 'invalid token address'});
      }
    }
    else{
      res.status(401);
      res.send({error: 'Invalid Token'});
    }
  });

  app.get('/myProfile', function(req, res, next){
    res.contentType = 'json';
    const token = req.headers.authorization;
    let access = auth.decodeToken(token, secret);
    //access = {resources, {email,acessLevel,tokenAddress}, expires}
    corngoose.dbDocFind({email:access.resources.email}, 'users', function(err, data){
      if(err) {
        playErr(res, err);
      }
      else{
        //check for profile data
        if('profileId' in data){
          corngoose.dbDocFind({profileId: data.profileId}, 'profiles', function(err, data){
            if(err){
              playErr(res, err);
            }
            else{
              res.status(200);
              res.send(data[0]);
            }
          })
        }
        else{
          //create new data collection
          corngoose.getCollection('profiles', function(err, data){
            if(err){
              playErr(res, err);
            }
            else{
              let profileId = 'profile' + data.length;
              let profile = {
                profileId: profileId,
                about: {},
                current: [],
                examples: [],
                repos: [],
                posts: [],
                projects: [],
                externalLinks: {},
                competencies: {technologies:[], specifics:[], tools:[]}
              };
              corngoose.dbDocInsert({profileId: profileId}, profile, 'profiles', function(err, pData){
                if(err){
                  playErr(res, err);
                }
                else{
                  corngoose.dbDocUpdate({email: access.resources.email}, {profileId: profileId}, 'users', function(err, data){
                    if(err){
                      playErr(res, err);
                    }
                    else{
                      res.status(200);
                      res.send(pData);
                    }
                  })
                }
              });
            }
          });
        }
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

