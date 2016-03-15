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
  var btnLogin = document.getElementById('btnLogin');
  var btnJoin = document.getElementById('btnJoin');

  btnLogin.addEventListener('click', function(){
      doAjax.ajaxPostJson('/login', {email: emailIn.value, password: passwordIn.value}, function(err, data){
        if(err) alert('Login Failed');
        else{
          alert('Logged In');
          console.dir(data);
        }
      });
  });

  btnJoin.addEventListener('click', function(e){
    //change to register view
    window.location = '/#/register';
  });
};