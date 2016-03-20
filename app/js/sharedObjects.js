/**
 * sharedObjects
 * Created by dcorns on 3/20/16
 * Copyright © 2016 Dale Corns
 * Add all objects that are shared by multiple functions here. This will usually be dom objects that persist across views
 * Since I want to require at the top of module it uses an init function to run after the dom is loaded.
 */
'use strict';
module.exports = function(app){

  let sharedObjects = {
    init: function init(){
      getToggleElements(this.toggleElements);
    },
    toggleElements: []
  };
  if(app){
    if(typeof app === 'object' && app !== null){
      app.sharedObjects = sharedObjects;
      return app.sharedObjects;
    }
  }
  else{
    return sharedObjects;
  }
  
}();

function getToggleElements(ary){
  const btnLogin = document.getElementById('btnLogin');
  const btnLogOut = document.getElementById('btnLogOut');
  const btnProfile = document.getElementById('btnProfile');
  ary.push(btnLogin, btnLogOut, btnProfile);
}