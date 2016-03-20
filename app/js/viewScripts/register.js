/**
 * register
 * Created by dcorns on 3/13/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var doAjax = require('do-ajax');
var help = require('../helperMethods');

module.exports = function register(){
  var emailIn = document.getElementById('emailIn');
  var passwordIn = document.getElementById('passwordIn');
  var confirmPassword = document.getElementById('confirmPassword');
  var btnSaveAccount = document.getElementById('saveAccount');
  emailIn.value = sessionStorage.getItem('email');

  btnSaveAccount.addEventListener('click', function(){
    if(passwordIn.value !== confirmPassword.value){
      alert('Passwords do not match');
    }
    else{
      doAjax.ajaxPostJson('/newAccount', {email: emailIn.value, password: passwordIn.value}, function(err, data){
        if(err) alert('Account Creation Failed: ' + err);
        else{
          const btnLogin = document.getElementById('btnLogin');
          const btnLogOut = document.getElementById('btnLogOut');
          help.toggleClass([btnLogOut, btnLogin], 'hide');
          sessionStorage.removeItem('email');
          localStorage.setItem('DRCToken', data.token);
          window.location = '#/posts';
        }
      });
    }
  });
};