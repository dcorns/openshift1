/**
 * profileAboutMe
 * Created by dcorns on 3/22/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
module.exports = function profileAboutMe(){
  let myProfile = JSON.parse(localStorage.getItem('myProfile'));
  let aboutMeText = document.getElementById('aboutMeText'), aboutMeSave = document.getElementById('aboutMeSave');
  aboutMeSave.addEventListener('click', function(){
    myProfile.about = aboutMeText.value;
    window.localStorage.setItem('myProfile', JSON.stringify(myProfile));
  });
};