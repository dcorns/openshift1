/**
 * pageScripts
 * Created by dcorns on 1/13/16
 * Copyright © 2016 Dale Corns
 * Provides all the views with their logic
 */
'use strict';

module.exports = (function(app) {
  return{
    skills: require('./viewScripts/skills'),
    current: require('./viewScripts/current'),
    login: require('./viewScripts/login')(app),
    register: require('./viewScripts/register')(app),
    logout: require('./viewScripts/logout')(app)
  }
})();