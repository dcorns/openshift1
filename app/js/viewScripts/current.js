/**
 * current
 * Created by dcorns on 2/9/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var doAjax = require('../doAjax.js');
module.exports = function current(){
  doAjax.ajaxGetJson('/current', function(err,data){
    if(err){
      alert('There was a problem receiving current data!');
      console.error(err);
      return;
    }
    console.dir(data);
  });
};

