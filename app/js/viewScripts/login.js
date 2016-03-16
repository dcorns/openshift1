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
  var btnLogin = document.getElementById('btnLogin');

  btnLogin.addEventListener('click', function(){
      doAjax.ajaxPostJson('/login', {email: emailIn.value, password: passwordIn.value}, function(err, data){
        if(err){
          alert('Login Failed: ' + err);
          console.dir(err);
          sessionStorage.setItem('email', emailIn.value);
          window.location = '#/register';
        }
        else{
          localStorage.setItem('DRCToken', data.token);
          window.location = '#/posts';
        }
      });
  });
};