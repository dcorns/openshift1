/**
 * profileAboutMe
 * Created by dcorns on 3/22/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
module.exports = function(){
  var vm = {
    abtm: ko.observable()
  };

  vm.abtm = myData.about;
  ko.applyBindings(vm);

};