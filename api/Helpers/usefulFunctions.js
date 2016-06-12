/**
 * usfulFunctions
 * Created by dcorns on 6/10/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
module.exports = (function usefulFunctions(){
  return{
    breakUpString: function breakUpString(str, numberOfChars, aryIn){
      if(!(typeof str === 'string')) throw new TypeError('The first argument must be a string');
      if((typeof numberOfChars !== 'number') || isNaN(numberOfChars)) throw new TypeError('The second argument must be an integer');
      if(Math.floor(numberOfChars) !== numberOfChars || Math.abs(numberOfChars) !== numberOfChars) throw new TypeError('The second argument must be an integer');
      var ary = aryIn || [];
      if(!Array.isArray(ary)) return [];
      while(str.length > 0){
        ary.push(str.slice(0, numberOfChars > str.length ? str.length: numberOfChars));
        str = str.substr(numberOfChars);
      }
      return ary;
    }
  }
})();