/**
 * logout
 * Created by dcorns on 3/18/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
module.exports = function logout(){
  window.localStorage.removeItem('DRCToken');
  if(window.localStorage.getItem('DRCToken')){
    alert('Token failed deletion, delete DRCToken manually from localStorage to logout!');
  }
  else{
    const btnLogin = document.getElementById('btnLogin');
    const btnLogOut = document.getElementById('btnLogOut');
    btnLogOut.classList.toggle('hide');
    btnLogin.classList.toggle('hide');
  }
};