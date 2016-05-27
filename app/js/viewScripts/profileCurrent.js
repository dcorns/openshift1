/**
 * profileCurrent
 * Created by dcorns on 5/23/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
const doAjax = require('do-ajax');
let current;
module.exports = function profileCurrent(){
  let myProfile = JSON.parse(localStorage.getItem('myProfile'));
  // current = myProfile.current;
  current = [{start: new Date(), activity: 'Test Activity', end: new Date()}];
  let els = document.querySelectorAll('#profile-content > [id]');
  for (var ii = 0; ii < els.length; ii++){
    configureEl(els[ii]);
  }
};

const configureEl = (el) => {
  switch (el.id){
    case 'currentItemsList':
      if(current && current.length > 0){
        addTableRows(el, current);
      }
      break;
    case 'startDate':
      break;
    case 'activity':
      break;
    case 'endDate':
      break;
    case 'addItem':
      break;
    case 'updateItem':
      break;
    case 'removeItem':
      break;
    default:
      break;
  }
}

//Take an array of data objects and create table headers based on keys and data table rows based on values and insert data into rows, then append to tblNode
let addTableRows = (tblNode, tblData) => {
  const len = tblData.length;
  //create headers based on property names
  let tblHeader = document.createElement('tr');
  let dataKeys = [];
  for (var prop in tblData[0]){
    if(tblData[0].hasOwnProperty(prop)){
      let th = document.createElement('th');
      dataKeys.push(prop);
      th.textContent = prop[0].toUpperCase() + prop.slice(1);
      tblHeader.appendChild(th);
    }
  }
  tblNode.appendChild(tblHeader);
  for(var i2 = 0; i2 < len; i2++){
    let tr = document.createElement('tr');
    for(var i3 = 0; i3 < dataKeys.length; i3++){
      let td = document.createElement('td');
      td.textContent = tblData[i2][dataKeys[i3]];
      tr.appendChild(td);
    }
    tblNode.appendChild(tr);
  }
}