/**
 * skills
 * Created by dcorns on 1/18/16
 * Copyright © 2016 Dale Corns
 * Script for skills view, so expects certain dom elements to exist, automatically updates buttons and links for skills when exampleData changes.
 */
'use strict';
var examples = require('../models/exampleData');
var exampleLinks = require('../exampleLinks');
module.exports = function skills(){
  var btns = document.getElementById('lang-fram-btns'),
    exampleList = document.getElementById('example-list'),
    btnreturn = document.getElementById('btnreturn'),
    h = document.getElementById('skHeader');

  function goBackToSkillsMenu(){
    btns.classList.toggle('toggle-menu');
    h.classList.toggle('toggle-menu');
    btnreturn.classList.toggle('toggle-menu');
    exampleList.textContent = '';
  }

  btnreturn.addEventListener('click', goBackToSkillsMenu);
  addButtons('lang-fram-btns', examples.technologies);
  btns.addEventListener('click', function(e){
    btnreturn.classList.toggle('toggle-menu');
    var skill = e.target.textContent;
    btns.classList.toggle('toggle-menu');
    h.classList.toggle('toggle-menu');
    if(e.target.id === 'lang-fram-btns') skill = '';
    exampleLinks(skill, exampleList, examples, btnreturn, goBackToSkillsMenu);
  });
};

function addButtons(el, ary){
  var btnsHere = document.getElementById(el);
  btnsHere.textContent = '';
  for (var name of ary){
    var btn = document.createElement('button');
    btn.textContent = name;
    btnsHere.appendChild(btn);
  }
}