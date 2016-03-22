/**
 * myProfile
 * Created by dcorns on 3/21/16
 * Copyright © 2016 Dale Corns
 * Provides for individual profile data updating.
 */
'use strict';
var route = require('../clientRoutes')();
var pages = require('../build/views');
var pageScripts = require('../pageScripts');
var viewRouter = require('../viewRouter')(pages, pageScripts);
module.exports = function myProfile(app){
  var myData;
  //check for existing profile data and load if it exists
  var token = window.localStorage.getItem('DRCToken');
  route.getData('myProfile', function(err, data){
    if(err){
      alert('No profile data found locally. Internet required to load profile data.');
    }
    else{
      myData = data;
      console.dir(myData);
    }

  }, token);
  var btnAbout = getById('btnAboutMe');
  var btnCurrent = getById('btnCurrent');
  var btnExamples = getById('btnExamples');
  var btnRepos = getById('btnRepos');
  var btnPosts = getById('btnPosts');
  var btnProjects = getById('btnProjects');
  var btnExternalLinks = getById('btnExternalLinks');
  var btnCompetencies = getById('btnCompetencies');
  
  btnAbout.addEventListener('click', function(){
    viewRouter('#/profileAboutMe', 'profile-content');
  });
  btnCurrent.addEventListener('click', function(){
    viewRouter('#/profileCurrent', 'profile-content');
  });
  btnCurrent.addEventListener('click', function(){
    viewRouter('#/profileExamples', 'profile-content');
  });
  btnCurrent.addEventListener('click', function(){
    viewRouter('#/profileRepos', 'profile-content');
  });
  btnCurrent.addEventListener('click', function(){
    viewRouter('#/profilePosts', 'profile-content');
  });
  btnCurrent.addEventListener('click', function(){
    viewRouter('#/profileProjects', 'profile-content');
  });
  btnCurrent.addEventListener('click', function(){
    viewRouter('#/profileExternalLinks', 'profile-content');
  });
  btnCurrent.addEventListener('click', function(){
    viewRouter('#/profileCompetencies', 'profile-content');
  });
  function getById(btnId){
    return document.getElementById(btnId);
  }
  
};