/**
 * profileCurrent
 * Created by dcorns on 5/23/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
const doAjax = require('do-ajax');
module.exports = function profileCurrent(){
  let myProfile = JSON.parse(localStorage.getItem('myProfile'));
  let currentList = document.getElementById('currentItemsList');
  let startDate = document.getElementById('startDate');
  let activity = document.getElementById('activity');
  let endDate = document.getElementById('endDate');
  let addItem = document.getElementById('addItem');
  let updateItem = document.getElementById('updateItem');
  let removeItem = document.getElementById('removeItem');
  
  console.dir(myProfile);
  if(myProfile.current){
    console.dir(myProfile.current);
  }
};