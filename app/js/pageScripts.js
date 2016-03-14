/**
 * pageScripts
 * Created by dcorns on 1/13/16
 * Copyright © 2016 Dale Corns
 * Provides all the views with their logic
 */
'use strict';
var skills = require('./viewScripts/skills');
var current = require('./viewScripts/current');
var login = require('./viewScripts/login');
var register = require('./viewScripts/register');
module.exports = {
  skills: skills,
  current: current,
  login: login,
  register: register
};