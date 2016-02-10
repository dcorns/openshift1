/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(6);
	__webpack_require__(4);
	__webpack_require__(10);
	__webpack_require__(8);
	__webpack_require__(11);
	__webpack_require__(5);
	__webpack_require__(9);
	module.exports = __webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * exampleLinks
	 * Created by dcorns on 1/11/16
	 * Copyright © 2016 Dale Corns
	 * Used With Skills View and by skills.js
	 */
	'use strict';
	var doAjax = __webpack_require__(1);
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * index
	 * Created by dcorns on 12/31/15
	 * Copyright © 2015 Dale Corns
	 */
	'use strict';
	//Main JS File
	var slideShow = __webpack_require__(4);
	var slides = __webpack_require__(5);
	var pageScripts = __webpack_require__(6);
	var pages = __webpack_require__(10);
	slideShow.loadImages(slides);
	slideShow.swap();
	slideShow.play(500);
	//slideShow.swap();
	var mainContent = document.getElementById('content');
	var header = document.getElementById('top');
	//default view
	//mainContent.innerHTML = pages.current;
	loadContent('btnCurrent', mainContent);
	//Page Nav Logic
	var nav = document.getElementById('page-nav');
	nav.addEventListener('click', function(e){
	  loadContent(e.target.id, mainContent);
	});

	header.addEventListener('mouseover', function(){
	  slideShow.play(3000);
	});

	function loadContent(btnId, el){
	  switch (btnId){
	    case 'btnAbout':
	      slideShow.stop();
	      el.innerHTML = pages.aboutMe;
	      break;
	    case 'btnCurrent':
	      slideShow.stop();
	      el.innerHTML = pages.current;
	      pageScripts.current();
	      break;
	    case 'btnSkills':
	      slideShow.stop();
	      el.innerHTML = pages.skills;
	      pageScripts.skills();
	      break;
	    case 'btnExamples':
	      slideShow.stop();
	      el.innerHTML = pages.examples;
	      break;
	    case 'btnAccolades':
	      slideShow.stop();
	      el.innerHTML = pages.accolades;
	      break;
	    case 'btnProjects':
	      slideShow.stop();
	      el.innerHTML = pages.projects;
	      break;
	    case 'btnPosts':
	      slideShow.stop();
	      el.innerHTML = pages.posts;
	      break;
	  }
	}

	//mobile logic
	var btnMobileMenu = document.getElementById('btnMobileMenu');
	var mobileMenu = document.getElementById('mobile-menu-items');
	btnMobileMenu.addEventListener('click', function(){
	  mobileMenu.classList.toggle('toggle-menu');
	  btnMobileMenu.classList.toggle('toggle-menu');
	});
	mobileMenu.addEventListener('click', function(e){
	  mobileMenu.classList.toggle('toggle-menu');
	  btnMobileMenu.classList.toggle('toggle-menu');
	  loadContent(e.target.id, mainContent);
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * slideShow
	 * Created by dcorns on 12/31/15
	 * Copyright © 2015 Dale Corns
	 * Given an array of image sources, display a slide show
	 */
	'use strict';
	module.exports = function(){
	  var imgs = [], count = 0;
	  var showInterval, playing = false;
	  var slideShow = document.getElementById('slide-show');
	  return{
	    loadImages: function loadImages(imgArray){
	      var len = imgArray.length, item = 0;
	      for (item; item < len; item++){
	        imgs[item] = new Image();
	        imgs[item].src = imgArray[item];
	      }
	    },
	    play: function play(tm){
	      if(!(playing)){
	        playing = true;
	        var slideTime = tm || 1000;
	        showInterval = setInterval(function(){
	          if(count > imgs.length -1) count = 0;
	          slideShow.innerHTML = '';
	          slideShow.appendChild(imgs[count]);
	          count++;
	        }, slideTime);
	      }
	    },
	    stop: function stop(imgNum){
	      if(playing){
	        if(count > imgs.length - 1) count = 0;
	        count = imgNum || count;
	        clearInterval(showInterval);
	        slideShow.innerHTML = '';
	        slideShow.appendChild(imgs[count]);
	        playing = false;
	      }
	    },
	    swap: function swap(imgNum){
	      if(!(playing)){
	        slideShow.innerHTML = '';
	        var imgIdx;
	        if (imgNum) imgIdx = imgNum;
	        else {
	          if(count > imgs.length - 1) count = 0;
	          imgIdx = count;
	          count++;
	        }
	        slideShow.appendChild(imgs[imgIdx]);
	      }
	    }
	  }
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * slides.js
	 * Created by dcorns on 1/18/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	module.exports = function(){
	  return ['small-slides/slide17.JPG', 'small-slides/slide19.JPG'];
	}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * pageScripts
	 * Created by dcorns on 1/13/16
	 * Copyright © 2016 Dale Corns
	 * Provides all the views with their logic
	 */
	'use strict';
	var skills = __webpack_require__(7);
	var current = __webpack_require__(9);
	module.exports = {
	  skills: skills,
	  current: current
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * skills
	 * Created by dcorns on 1/18/16
	 * Copyright © 2016 Dale Corns
	 * Script for skills view, so expects certain dom elements to exist, automatically updates buttons and links for skills when exampleData changes.
	 */
	'use strict';
	var examples = __webpack_require__(8);
	var exampleLinks = __webpack_require__(2);
	module.exports = function skills(){
	  var btns = document.getElementById('lang-fram-btns'),
	    exampleList = document.getElementById('example-list'),
	    btnreturn = document.getElementById('btnreturn'),
	    h = document.getElementById('skHeader');

	  function goBackToSkillsMenu(){
	    btns.classList.toggle('toggle-menu');
	    h.classList.toggle('toggle-menu');
	    btnreturn.classList.toggle('toggle-menu');
	    exampleList.textContent = '';
	  }

	  btnreturn.addEventListener('click', goBackToSkillsMenu);
	  addButtons('lang-fram-btns', examples.technologies);
	  btns.addEventListener('click', function(e){
	    btnreturn.classList.toggle('toggle-menu');
	    var skill = e.target.textContent;
	    btns.classList.toggle('toggle-menu');
	    h.classList.toggle('toggle-menu');
	    if(e.target.id === 'lang-fram-btns') skill = '';
	    exampleLinks(skill, exampleList, examples, btnreturn, goBackToSkillsMenu);
	  });
	};

	function addButtons(el, ary){
	  var btnsHere = document.getElementById(el);
	  btnsHere.textContent = '';
	  for (var name of ary){
	    var btn = document.createElement('button');
	    btn.textContent = name;
	    btnsHere.appendChild(btn);
	  }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * exampleData
	 * Created by dcorns on 1/18/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	module.exports = {
	  technologies: ['JavaScript', 'Angular', 'ES6', 'JQuery', 'Node', 'C#', '.Net', 'MSSql', 'MongoDB', 'Backbone', 'Python', 'SocketIO', 'Express'],
	  repos: [{
	    name: 'exploreSocketIO',
	    readme: 'https://raw.githubusercontent.com/dcorns/exploreSocketIO/master/README.md',
	    href: 'https://github.com/dcorns/exploreSocketIO'
	  }],
	  specifics: ['ServerSide', 'socket.on', 'socket.emit', 'express.get', 'response.sendFile'],
	  examples:[{
	    fileName: 'areYouDeaf.js',
	    rawTextLink: 'https://raw.githubusercontent.com/dcorns/exploreSocketIO/master/examples/areYouDeaf.js',
	    specificsID: [0, 1, 2, 3, 4],
	    technologiesID: [0, 11, 12],
	    repoID: 0
	  }
	  ]
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * current
	 * Created by dcorns on 2/9/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	var doAjax = __webpack_require__(1);
	module.exports = function current(){
	  var tblActivity = document.getElementById('tbl-activity');
	  doAjax.ajaxGetJson('/current', function(err,data){
	    if(err){
	      alert('There was a problem receiving current data!');
	      console.error(err);
	      return;
	    }
	    buildActivityTable(data, tblActivity);
	  });
	  console.log(new Date('01/16/2016').toDateString());
	};

	function appendActivity(aObj, tbl){
	  var row = document.createElement('tr');
	  var startDate = document.createElement('td');
	  var activity = document.createElement('td');
	  startDate.innerText = new Date(aObj.startDate).toLocaleDateString();
	  activity.innerText = aObj.activity;
	  row.appendChild(activity);
	  row.appendChild(startDate);
	  tbl.appendChild(row);
	}
	function buildActivityTable(data, tbl){
	  var len = data.length;
	  var c = 0;
	  for(c; c < len; c++){
	    if(!(data[c].endDate)){
	      appendActivity(data[c], tbl);
	    }
	  }
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	module.exports = {"aboutMe":"<h3>Journey To Software Development as a Profession</h3><p>I have always loved Technology and growing up I would disassemble things and sometimes put them back together again. I would work on cars with my Father and watch him work on old tube tv sets. (and I don\\'t mean just the cathode ray tube) When computers came out for the general public, I was fascinated and enjoyed spending hours making things with them. Writing little programs in BASIC to run on the television only to have them erased for lack of external storage. After high school I attended a technical college where I did micro processor programing using assembly code and loved it. I also learned more about electronics and have enjoyed building and experimenting around with circuits ever since. I started my career in IT back in 1981 when when IBM thought we would never need more than 64K of memory in a PC. I preferred writing software, but the jobs were more plentiful on the hardware side of things so I pursued and excelled as a hardware tech and network administrator, but I wrote software to support my efforts and those of my co-workers when possible. As the PC boom subsided I became more focused on small business network and PC support and in 2001 started my own business working for companies like Lockheed Martin and Snohomish County Washington. Just a few large clients kept me going pretty good for about seven years. It was during this time that I began to focus more on software. Creating opportunities with existing clients whenever I found a tool that they were using which I could enhance or write new tools when I saw a need. This required me to pick up some new languages quickly in order to provide something to customers at a reasonable price. In the meantime I was developing tools for my own business to help me stay on top of things. I began writing an entire service management system using .NET, C#, MSSQL and JavaScript. Since the application ran in a browser, I was able to access all aspects of the system from anywhere an Internet connection existed. It was a large undertaking and I would add functionality as I saw need, then moving on to some other aspect as that need became greater. For example I wrote modules for accounting, contact management, inventory, service tracking, asset management and whatever else could be helped through software. Unfortunately due to the size of this undertaking, I was never able to complete everything. There were some real cool features, but I kept bouncing around as needed so it never became a finished product. I would see a need and write the software to meet the need. This is really were I cut my teeth on building web application software. I think that what I produced was very unique and useful. Had I completed it, I believe it would have been a great success as a very useful tool for Technical service businesses everywhere. Sometimes I consider going back and continuing with the project, but there are so many new things to do every day. Like writing a time management app for the Windows phone. Yes I was working on and using that tool until Microsoft decided to move on to Windows 8 and required their phone developers to use Windows 8 on the desktop development machine in order to use the new tool kit. This discouraged me from moving forward writing for the Windows phone.</p><p>After this and writing custom native apps and services for clients I decided to take a full on plunge into the software industry as my primary career focus. In 2013 I graduated from the full stack JavaScript development accelerator/boot camp at Code Fellows in South Lake Union Seattle. There I learned how the industry works using agile methodologies and the tools being used by other professionals to collaborate and create scalable web applications using only JavaScript on the front and back end. Since then I have been taking Freelance work and teaching others how to do the same.</p><h4>Geography</h4><p>My Father was in the Air Force for the first 5 years of my life and then took on work in retail. So we moved a lot while I was growing up. I settled down in the Seattle area at around age 18, then went to work in the Los Angles area for about 5 years before moving back up to Seattle and have been here ever since.</p><h4>IT-less Passions</h4><p>At age 11 I wanted to be a magician and did one magic show where the neighbor hood kids were invited via radio station that did a free add for me. I grew up in church and by age 12 I was running the sound for a small church we attended and by that time had already sung a few solos and participated in choirs at the churches we attended. By age 14 I had learned to play the guitar and as a teen I began writing and performing my own songs. I have continued to sing and play guitar alone, and as a part of ensembles to this day. I have also experimented with keyboards and really like playing the trumpet when I have one. Back in the 1990\\'s I studied and performed classical guitar seriously for about five years. It was a lot of work and there was not as much opportunity to do it professionally compared to computer technology, so I abandoned it as a means of financial gain. But I am glad I did it. Music is awesome and will always be a part of my life. Fortunately both fields thrive on technical knowledge and creativity.</p><h4>Working Character</h4><p>I really like learning new things and getting better at anything I do. I do not like doing anything part of the way. I am always all in. As a consequence I have a very hard time giving up on anything I set out to do. This is good because I will work on a task undaunted by obstructions until all is achieved. On the other hand I could spend too much time getting no where on something, being unwilling to accept that I can not get it done. I believe that any thing worth doing is worth doing well. I also believe that more is accomplished with a group of people that have a common goal, than one person with passion and vision working on his/her own. So being able to infect others with one\\'s passion and vision is critical to bringing any large project to completion in a timely manner.</p>","accolades":"<h3>Accolades</h3>Accolades regarding my work can be found on my linkedin account. Additional comments may be left here if you submit and email.","current":"<h3>Current Activity</h3>\n<table id=\"tbl-activity\">\n    <tr>\n        <th>Activity</th><th>Start Date</th>\n    </tr>\n</table>","examples":"<h3>Work Examples</h3><p>Links to actual production sites to which I have contributed.</p><p>You\\'re looking at it</p>","posts":"<h3>Posts</h3>Links to or api generated content from where my posts are","projects":"<h3>Project List</h3>hopefully can be populated with Github api","skills":"<section id=\"job-skills\" class=\"job-skills\">\n    <h3 id=\"skHeader\">Languages, Frameworks and Libraries</h3>\n    <nav id=\"lang-fram-btns\"></nav><img id=\"btnreturn\" class=\"toggle-menu img-btn\" src=\"icon/return40.png\">\n    <article id=\"example-list\"></article>\n    <section><h3>IDE\\'s and Tools</h3>Sublime Text, Web Storm, Android Studio, Visual Studio, Grunt, Gulp</section>\n</section>"};

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * exampleToolsData
	 * Created by dcorns on 1/18/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	module.exports = {
	  repos: ['dalecorns.com'],
	  WebStorm: [''],
	  AndroidStudio: [''],
	  VisualStudio: [''],
	  Eclipse: [''],
	  QTCreator: [''],
	  gulp: [{filename: 'gulpfile.js', repoID: 0}],
	  grunt: ['']
	};

/***/ }
/******/ ]);