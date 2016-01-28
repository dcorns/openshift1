/**
 * exampleLinks
 * Created by dcorns on 1/11/16
 * Copyright © 2016 Dale Corns
 * Used With Skills View and by skills.js
 */
'use strict';
var doAjax = require('./doAjax.js');
module.exports = function(skill, el, exampleObj, btnReturn, btnReturnFunction){

  var h = document.createElement('h3'),
    exampBtns = document.createElement('nav'),
    exampleList = getExampleList(skill, exampleObj);
  el.textContent = '';

  if(exampleList.length < 1){
    h.textContent = 'There are currently no examples listed for ' + skill;
    el.appendChild(h);
    return;
  }

  addSkillNameHeading();
  addExamples();

  exampBtns.addEventListener('click', function(e){
    var exampleDetails = e.target.dataset;
    btnReturn.removeEventListener('click', btnReturnFunction);
    btnReturn.addEventListener('click', backToFileList);
    exampleDetails.fileName = e.target.textContent;
    el.textContent = '';
      getExample(exampleDetails.rawTextLink, function(err, rawText){
        if(err){
          alert('Error loading text from ' + e.target.rawTextLink);
          return;
        }
        makeCodePage(el, rawText, exampleDetails, exampleObj);
      });
  });

  function backToFileList(){
    el.textContent = '';
    addSkillNameHeading();
    el.appendChild(exampBtns);
    btnReturn.removeEventListener('click', backToFileList);
    btnReturn.addEventListener('click', btnReturnFunction);
  }

  function addSkillNameHeading(){
    h.textContent = 'Code Examples for ' + skill + ' Skills';
    el.appendChild(h);
  }

  function addExamples(){
    var count = 0, len = exampleList.length;
    for(count; count < len; count++){
      var d = document.createElement('div');
      var btn = document.createElement('button');
      btn.textContent = exampleList[count].fileName;
      btn.alt = exampleList[count].fileName;
      btn.dataset.rawTextLink = exampleList[count].rawTextLink;
      btn.dataset.repoID = exampleList[count].repoID;
      d.appendChild(btn);
      var p = document.createElement('p');
      var specString = '';
      for (var spec of exampleList[count].specificsID){
        specString = specString + exampleObj.specifics[spec] + ', '
      }
      specString = specString.slice(0, specString.lastIndexOf(','));
      p.innerText = specString;
      d.appendChild(p);
      exampBtns.appendChild(d);
    }
    el.appendChild(exampBtns);
  }

};

function getExampleList(skill, exampleList){
  var xmp = [], skill = exampleList.technologies.indexOf(skill);
  for(var f of exampleList.examples){
    for(var ex of f.technologiesID){
      if(skill === ex) xmp.push(f);
    }
  }
  return xmp;
}

function getExample(fileName, cb){
  doAjax.ajaxGet(fileName, function(err, data){
    if(err) cb(err, null);
    else cb(null, data);
  });
}

//function buildLink(repoName, cb){
//  var lnk = document.createElement('a');
//  lnk.innerHTML = repoName;
//  getExample(repoName, function(err, data){
//    if(!err){
//      //lnk.href = data.html_url;
//      lnk.innerText = data;
//      cb(lnk);
//    }
//  });
//}

function makeCodePage(el, rawText, details, db){
  var codeArticle = document.getElementById('code-article'),
    codeContainer = document.getElementById('code-container'),
    theCode = document.getElementById('the-code'),
    fileName = document.getElementById('file-name'),
    pRepo = document.getElementById('parent-repo');
  if(codeArticle){
    codeArticle.innerText = rawText;
    el.appendChild(codeArticle);
  }
  else{
    codeArticle = document.createElement('article');
    codeContainer = document.createElement('pre');
    theCode = document.createElement('code');
    pRepo = document.createElement('a');
    fileName = document.createElement('h3');
    codeArticle.id = 'code-article';
    codeContainer.id = 'code-container';
    theCode.id = 'the-code';
    pRepo.id = 'parent-repo';
    fileName.id = 'file-name';

    pRepo.textContent = ' Repo: ' + db.repos[details.repoID].name;
    pRepo.href = db.repos[details.repoID].href;
    fileName.textContent = details.fileName;

    codeArticle.appendChild(fileName);
    codeArticle.appendChild(pRepo);

    theCode.innerText = rawText;
    codeContainer.appendChild(theCode);
    codeArticle.appendChild(codeContainer);
    el.appendChild(codeArticle);
  }
}

//function getRepoFromId(repoID, db){
//  return db.repos[repoID];
//}