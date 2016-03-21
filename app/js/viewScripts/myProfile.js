/**
 * myProfile
 * Created by dcorns on 3/21/16
 * Copyright © 2016 Dale Corns
 * Provides for individual profile data updating.
 */
'use strict';
var route = require('../clientRoutes')();
module.exports = function myProfile(app){
  var myData;
  //check for existing profile data and load if it exists
  let token = window.localStorage.getItem('DRCToken');
  route.getData('myProfile', function(err, data){
    if(err){
      alert('No profile data found locally. Internet required to load profile data.');
    }
    else{
      myData = data;
      console.dir('myData: ' + myData);
    }

  }, token);
};