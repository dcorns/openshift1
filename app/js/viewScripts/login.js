/**
 * createAccount
 * Created by dcorns on 3/8/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var doAjax = require('do-ajax');
var emailIn = document.getElementById('emailIn');
var passwordIn = document.getElementById('passwordIn');
var confirmPassword = document.getElementById('confirmPassword');
var btnSaveAccount = document.getElementById('saveAccount');
module.exports = function login(){
  btnSaveAccount.addEventListener('click', function(){
    if(passwordIn.textContent !== confirmPassword.textContent){
      alert('Passwords do not match');
    }
    else{
      doAjax.ajaxPostJson('/newAccount', {email: emailIn.textContent, password: passwordIn.textContent}, function(err, data){
        if(err) alert('Account Creation Failed');
        alert('Account created');
      });
    }

  });
};