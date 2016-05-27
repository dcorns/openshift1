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
  //current = myProfile.current;
  current = [{start: new Date(), activity: 'Test Activity', end: new Date()}];
  let els = document.querySelectorAll('#profile-content > [id]');
  for (var ii = 0; ii < els.length; ii++){
    configureEl(els[ii]);
  }
};
//Declare all functions scoped Variables
let tbl, startDate, activity, endDate;
//initialize functionality for dom nodes
const configureEl = (el) => {
  switch (el.id){
    case 'currentItemsList':
      tbl = el;
      if(current && current.length > 0){
        prepTable(tbl, current);
      }
      break;
    case 'startDate':
      startDate = el;
      break;
    case 'activity':
      activity = el;
      break;
    case 'endDate':
      endDate = el;
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
let prepTable = (tblNode, tblData) => {
  const len = tblData.length;
  //create headers based on property names
  let tblHeader = document.createElement('tr');
  let dataKeys = [];
  for (var prop in tblData[0]){
    if(tblData[0].hasOwnProperty(prop)){
      dataKeys.push(prop);
      addHeaderRowCell(prop, tblHeader);
    }
  }
  tblNode.appendChild(tblHeader);
    for(var i2 = 0; i2 < len; i2++){
      addTableData(tblData[i2], dataKeys, tblNode);
    }
}

//ads a table row to tblNode containing obj data who's keys match the provided dataKeys
let addTableData = (obj, dataKeys, tblNode) => {
  let tr = document.createElement('tr');
  for(var i3 = 0; i3 < dataKeys.length; i3++){
    let td = document.createElement('td');
    td.textContent = obj[dataKeys[i3]];
    tr.appendChild(td);
  }
  tblNode.appendChild(tr);
}

//Capitalize the first letter of headerText and add th node with the headerText to rowNode
let addHeaderRowCell = (headerText, rowNode) => {
  let th = document.createElement('th');
  th.textContent = headerText[0].toUpperCase() + headerText.slice(1);
  rowNode.appendChild(th);
}
