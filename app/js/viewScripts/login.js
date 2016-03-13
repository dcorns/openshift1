/**
 * createAccount
 * Created by dcorns on 3/8/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var doAjax = require('do-ajax');

module.exports = function login(){
  var emailIn = document.getElementById('emailIn');
  var passwordIn = document.getElementById('passwordIn');
  var confirmPassword = document.getElementById('confirmPassword');
  var btnSaveAccount = document.getElementById('saveAccount');
  btnSaveAccount.addEventListener('click', function(){
    if(passwordIn.value !== confirmPassword.value){
      alert('Passwords do not match');
    }
    else{
      doAjax.ajaxPostJson('/newAccount', {email: emailIn.value, password: passwordIn.value}, function(err, data){
        if(err) alert('Account Creation Failed');
        else{
          alert('Account created');
        }

        console.dir(err, data);
      });
    }
  });
};