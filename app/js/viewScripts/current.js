/**
 * current
 * Created by dcorns on 2/9/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var doAjax = require('../doAjax.js');
module.exports = function current(){
  var tblActivity = document.getElementById('tbl-activity');
  doAjax.ajaxGetJson('/current', function(err,data){
    if(err){
      alert('There was a problem receiving current data!');
      console.error(err);
      return;
    }
    buildActivityTable(data, tblActivity);
  });
};

function appendActivity(aObj, tbl){
  var row = document.createElement('tr');
  var startDate = document.createElement('td');
  var activity = document.createElement('td');
  var date = new Date();
  date.setDate(aObj.startDate);
  startDate.innerText = date.toLocaleDateString();
  activity.innerText = aObj.activity;
  row.appendChild(activity);
  row.appendChild(startDate);
  tbl.appendChild(row);
}
function buildActivityTable(data, tbl){
  var len = data.length;
  var c = 0;
  for(c; c < len; c++){
    if(!(data[c].endDate)){
      appendActivity(data[c], tbl);
    }
  }
}