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
      alert('No profile data found locally. Internet required to load profile data. Or you are not authorized for a profile account');
    }
    else{
      myData = data;
      console.dir(myData);
    }

  }, token);
  var btnAbout = getById('btnaboutme');
  var btnCurrent = getById('btncurrent');
  var btnExamples = getById('btnexamples');
  var btnRepos = getById('btnrepos');
  var btnPosts = getById('btnposts');
  var btnProjects = getById('btnprojects');
  var btnExternalLinks = getById('btnexternallinks');
  var btnCompetencies = getById('btncompetencies');
  
  btnAbout.addEventListener('click', function(){
    viewRouter('#/profileAboutMe', 'profile-content');
    aboutMeControl();
  });
  btnCurrent.addEventListener('click', function(){
    viewRouter('#/profileCurrent', 'profile-content');
  });
  btnExamples.addEventListener('click', function(){
    viewRouter('#/profileExamples', 'profile-content');
  });
  btnRepos.addEventListener('click', function(){
    viewRouter('#/profileRepos', 'profile-content');
  });
  btnPosts.addEventListener('click', function(){
    viewRouter('#/profilePosts', 'profile-content');
  });
  btnProjects.addEventListener('click', function(){
    viewRouter('#/profileProjects', 'profile-content');
  });
  btnExternalLinks.addEventListener('click', function(){
    viewRouter('#/profileExternalLinks', 'profile-content');
  });
  btnCompetencies.addEventListener('click', function(){
    viewRouter('#/profileCompetencies', 'profile-content');
  });
  
  function getById(btnId){
    return document.getElementById(btnId);
  }
  function aboutMeControl(){
    alert('aboutMe');
  }
};