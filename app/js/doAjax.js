/**
 * doAjax
 * Created by dcorns on 1/9/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
module.exports = function(){
  return{
    ajaxGet: function ajaxGet(url, cb, token){
      var ajaxReq = new XMLHttpRequest();
      ajaxReq.addEventListener('load', function(){
        if(ajaxReq.status === 200) cb(null, ajaxReq.responseText);
        else cb(JSON.parse(ajaxReq.responseText), null);
      });
      ajaxReq.addEventListener('error', function(data){
        console.dir(ajaxReq);
        console.dir(data);
        cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
      });

      ajaxReq.open('GET', url, true);
      //ajaxReq.setRequestHeader('Content-Type', 'application/json');
      if(token){
        ajaxReq.setRequestHeader('Authorization', token);
      }
      ajaxReq.send();
    },

    ajaxGetJson: function ajaxGetJson(url, cb, token){
      var ajaxReq = new XMLHttpRequest();
      ajaxReq.addEventListener('load', function(){
        if(ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
        else cb(JSON.parse(ajaxReq.responseText), null);
      });
      ajaxReq.addEventListener('error', function(data){
        console.dir(ajaxReq);
        console.dir(data);
        cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
      });

//Must open before setting request header, so this order is required
      ajaxReq.open('GET', url, true);
      //ajaxReq.setRequestHeader('Content-Type', 'application/json');
      if(token){
        ajaxReq.setRequestHeader('Authorization', token);
      }
      ajaxReq.send();
    },
    ajaxPostJson: function ajaxPostJson(url, jsonData, cb, token){
      var ajaxReq = new XMLHttpRequest();
      ajaxReq.addEventListener('load', function(){
        if(ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
        else cb(JSON.parse(ajaxReq.responseText), null);
      });
      ajaxReq.addEventListener('error', function(data){
        console.dir(ajaxReq);
        console.dir(data);
        cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
      });

//Must open before setting request header, so this order is required
      ajaxReq.open('POST', url, true);
      ajaxReq.setRequestHeader('Content-Type', 'application/json');
      if(token){
        ajaxReq.setRequestHeader('Authorization', token);
      }
      ajaxReq.send(JSON.stringify(jsonData));
    },
    ajaxPutJson: function(url, jsonData, cb, token){
      var ajaxReq = new XMLHttpRequest();
      ajaxReq.addEventListener('load', function(){
        if(ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
        else cb(JSON.parse(ajaxReq.responseText), null);
      });
      ajaxReq.addEventListener('error', function(data){
        cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
      });

//Must open before setting request header, so this order is required
      ajaxReq.open('PUT', url, true);
      ajaxReq.setRequestHeader('Content-Type', 'application/json');
      if(token){
        ajaxReq.setRequestHeader('Authorization', token);
      }
      ajaxReq.send(JSON.stringify(jsonData));
  }
  }
}();