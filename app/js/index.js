/**
 * index
 * Created by dcorns on 12/31/15
 * Copyright © 2015 Dale Corns
 */
'use strict';
//Main JS File
var slideShow = require('./slideShow');
var slides = require('./models/slides');
var doAjax = require('doAjax');
var pageScripts = require('./pageScripts');
var pages = require('./build/views');
var route = require('./viewRouter')(pages, pageScripts);//(view, controller)
//Create object for globals
var app = {};

slideShow.loadImages(slides);
slideShow.swap();
slideShow.play(500);
const btnLogin = document.getElementById('btnLogin');
const btnLogOut = document.getElementById('btnLogOut');
checkForToken(btnLogOut, btnLogin);
//var mainContent = document.getElementById('main-content');
var header = document.getElementById('top');
//default view
route('#/current');

header.addEventListener('mouseover', function(){
  slideShow.play(3000);
});

function firstDo(){
  //Handle Refresh by checking session storage for last href and redirecting if it exists
  var lastHref = window.sessionStorage.getItem('href');
  var netAction = window.sessionStorage.getItem('netAction');
  if (lastHref) {
    //dgApp.loadRoute(lastHref);
    route(lastHref);
  }
  else {//load home template
    lastHref = '#/current';
    window.sessionStorage.setItem('href', lastHref);
    window.history.pushState(null, null, lastHref);
    //dgApp.loadRoute(lastHref);
    route(lastHref);
  }
  //Add event handlers for 'a' tags
  var links = document.getElementsByTagName('a');
  var idx = 0, ln = links.length;
  for (idx; idx < ln; idx++) {
    links[idx].addEventListener('click', function (e) {
      window.sessionStorage.setItem('href', this.href);
      window.history.pushState(null, null, this.href);
      e.preventDefault();
      route(this.href);
    });
  }
  //Add front and back button handler
  window.addEventListener('popstate', function () {
    window.sessionStorage.setItem('href', location.href);
    route(location.href);
  });
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
});

function winready(f){
  var preOnload = window.onload;
  if(typeof preOnload !== 'function'){
    window.onload = f;
  }
  else{
    window.onload = function() {
      preOnload();
      f();
    }
  }
}

function checkForToken(btnOff, btnOn){
  const DRCToken = localStorage.getItem('DRCToken');
  if(DRCToken){
    doAjax.ajaxPostJson('/tokenAccess',{DRCToken: DRCToken}, function(err, data){
      if(err) console.error(err);
      else{
        btnOff.classList.toggle('hide');
        btnOn.classList.toggle('hide');
      }
    });
  }
}

winready(firstDo());