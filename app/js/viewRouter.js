/**
 * router.js
 * Created by dcorns on 5/25/15.
 * takes in a view object like the one created with grunt-add-view and if it has javascript file by the same name in the controllers object, it will run it.
 */
'use strict';
module.exports = function(views, controllers){
  function loadRoute(route, pEl){
    var el = pEl || 'main-content';
    var view = route.substr(route.lastIndexOf('/') + 1);
    document.getElementById(el).innerHTML = views[view];
    if(controllers[view]){
      controllers[view]();
    }
  }
  return loadRoute;
};