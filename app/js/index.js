/**
 * index
 * Created by dcorns on 12/31/15
 * Copyright © 2015 Dale Corns
 */
'use strict';
//Main JS File
var slideShow = require('./slideShow');
var slides = require('./models/slides');
var pageScripts = require('./pageScripts');
var pages = require('./build/views');
slideShow.loadImages(slides);
slideShow.swap();
slideShow.play(500);
//slideShow.swap();
var mainContent = document.getElementById('content');
var header = document.getElementById('top');
//default view
mainContent.innerHTML = pages.current;
//Page Nav Logic
var nav = document.getElementById('page-nav');
nav.addEventListener('click', function(e){
  loadContent(e.target.id, mainContent);
});

header.addEventListener('mouseover', function(){
  slideShow.play(3000);
});

function loadContent(btnId, el){
  switch (btnId){
    case 'btnAbout':
      slideShow.stop();
      el.innerHTML = pages.aboutMe;
      break;
    case 'btnCurrent':
      slideShow.stop();
      el.innerHTML = pages.current;
      break;
    case 'btnSkills':
      slideShow.stop();
      el.innerHTML = pages.skills;
      pageScripts.skills();
      break;
    case 'btnExamples':
      slideShow.stop();
      el.innerHTML = pages.examples;
      break;
    case 'btnAccolades':
      slideShow.stop();
      el.innerHTML = pages.accolades;
      break;
    case 'btnProjects':
      slideShow.stop();
      el.innerHTML = pages.projects;
      break;
    case 'btnPosts':
      slideShow.stop();
      el.innerHTML = pages.posts;
      break;
  }
}

//mobile logic
var btnMobileMenu = document.getElementById('btnMobileMenu');
var mobileMenu = document.getElementById('mobile-menu-items');
btnMobileMenu.addEventListener('click', function(){
  mobileMenu.classList.toggle('toggle-menu');
  btnMobileMenu.classList.toggle('toggle-menu');
});
mobileMenu.addEventListener('click', function(e){
  mobileMenu.classList.toggle('toggle-menu');
  btnMobileMenu.classList.toggle('toggle-menu');
  loadContent(e.target.id, mainContent);
});

