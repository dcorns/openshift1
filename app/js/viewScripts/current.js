/**
 * current
 * Created by dcorns on 2/9/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var doAjax = require('../doAjax.js');
module.exports = function current(){
  doAjax.ajaxGetJson('/current', function(data){
    console.dir(data);
  });
};

