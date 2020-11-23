/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "b635");
/******/ })
/************************************************************************/
/******/ ({

/***/ "24fb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "2dba":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "b635":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__("2dba");
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./style.css
var cjs_js_style = __webpack_require__("d0b0");

// CONCATENATED MODULE: ./style.css

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(cjs_js_style["a" /* default */], options);



/* harmony default export */ var style = (cjs_js_style["a" /* default */].locals || {});
// CONCATENATED MODULE: ./src/routes.js

const MAIN_SCREEN = document.querySelector('.mainScreen');
const FIN_SCREEN = document.querySelector('.finishedScreen');
const routes = {
  'main': '/',
  'finished': '/finished'
};
// CONCATENATED MODULE: ./src/finished.js

const CONSOLE_BTN = document.querySelector('.consoleBtn');
const RESTART_BTN = document.querySelector('.restart');
const FIN_TIME = document.querySelector('.finalTime');
const FIN_SCORE = document.querySelector('.finalScore');
let currUrl = document.URL;
RESTART_BTN.addEventListener('click', restartGame);
const locationObserver = new MutationObserver(function () {
  if (history.state !== null) {
    renderFinal();
  }
});
locationObserver.observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true
});

window.onpopstate = function () {
  MAIN_SCREEN.classList.remove('hidden');
  FIN_SCREEN.classList.add('hidden');
};

function renderFinal() {
  console.log('renderFinal');
  console.log('finalscore', history.state.finalScore);
  console.log('finaltime', history.state.finalTime);
  FIN_SCORE.textContent = history.state.finalScore;
  FIN_TIME.textContent = history.state.finalTime;
}

function restartGame() {
  history.back();
  window.location.pathname = '/';
}
// CONCATENATED MODULE: ./src/index.js




(function () {
  const TIMER = document.querySelector('.time');
  const WORD = document.querySelector('.word');
  const INPUT = document.querySelector('.write');
  const START_BTN = document.querySelector('.start');
  let SCORE = document.querySelector('.score');
  let score = SCORE.textContent;
  let wordList = [];
  let spentSecArr = [];
  let orgLength = 0;
  let randomIdx = 0;
  let totalCount = 0;
  let Interval = null;
  START_BTN.addEventListener('click', toggle);
  TIMER.addEventListener('DOMSubtreeModified', function () {
    timeOver();
  });
  INPUT.addEventListener('keyup', checkVal);
  const observer = new MutationObserver(list => {
    if (START_BTN.textContent === '초기화') {
      checkEndGame();
    }
  });
  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
  }); // 실행: getData함수 실행해서 wordList를 받아옴
  // 실행: 버튼 텍스트를 바꾸는 renderBtn 함수, setInterval timerOn 함수 실행
  // 실행: 랜덤 숫자를 받아서 타이머, 제시단어 변경하는 renderNext 함수 실행

  async function startGame() {
    console.log('startGame');
    await getData('https://my-json-server.typicode.com/kakaopay-fe/resources/words');
    renderBtn();
    timerOn();
    renderWord(wordList);
    return;
  }

  async function getData(url) {
    let response = await fetch(url);
    wordList = await response.json();
    orgLength = wordList.length;
    return wordList;
  } // 게임 리셋


  function endGame() {
    clear();
    renderReset();
    goToFinished();
  } // 실행: 시작 버튼을 눌렀을 때 버튼 텍스트에 따라서 함수 실행


  function toggle() {
    if (START_BTN.textContent === '시작') {
      return startGame();
    }

    if (START_BTN.textContent === '초기화') {
      return endGame();
    }
  } // 실행: 푼 문제수가 10개가 되면 calcTime, endGame 함수 실행


  function checkEndGame() {
    totalCount = splicedCount(orgLength, wordList.length);

    if (totalCount === 10) {
      endGame();
      return true;
    }

    return false;
  } // 실행: clearInterval


  function clear() {
    clearInterval(Interval);
  } // 실행: pushState로 완료 페이지로 이동


  function goToFinished() {
    history.pushState({
      'finalScore': SCORE.textContent,
      'finalTime': calcTime(spentSecArr)
    }, null, routes['finished']);
    MAIN_SCREEN.classList.add('hidden');
    FIN_SCREEN.classList.remove('hidden');
    return null;
  } // 연산: 인덱스에 해당하는 time을 받아서 -1 씩 하면서 0이 되면 끝


  function timerOn() {
    return Interval = window.setInterval(() => {
      TIMER.textContent -= 1;
    }, 1000);
  } // 실행


  function timeOver() {
    if (Number(TIMER.textContent) === 0) {
      removeUsed(wordList, randomIdx);
      renderScore(SCORE.textContent - 1);
      renderResult();
    }
  }

  function renderResult() {
    renderWord(wordList);
  } // 연산: wordList 의 배열 길이에 맞춘, 랜덤 숫자 생성


  function makeRandom(length) {
    randomIdx = Math.floor(Math.random() * length);
    return randomIdx;
  } // 연산: 새로만든 랜덤 숫자를 인덱스로 받아서 splice로 원 배열에서 없애버린다. 


  function removeUsed(list, index) {
    list.splice(index, 1);
    return list;
  } // 연산: 엔터쳤을 때 일치하는지 확인


  function checkVal(e) {
    let match = INPUT.value.toLowerCase() === WORD.textContent.toLowerCase();

    if (e.keyCode === 13 && match) {
      let spentSec = getSpentSec(wordList, randomIdx, TIMER.textContent);
      storeSpentSec(spentSec);
      removeUsed(wordList, randomIdx);
      renderResult();
      return true;
    }

    if (e.keyCode === 13 && !match) {
      INPUT.value = '';
      return false;
    }
  } // 렌더: score를 리턴


  function renderScore(newScore) {
    SCORE.textContent = newScore;
    return SCORE.textContent;
  } // 렌더: 다음 문제의 정보를 렌더한다. 


  function renderWord(list) {
    let randomIdx = makeRandom(list.length);
    INPUT.value = '';
    WORD.textContent = list[randomIdx].text;
    TIMER.textContent = list[randomIdx].second;
  } // 렌더: 제시단어 변경하는동안 렌더하는 함수, 버튼 텍스트 변경


  function renderBtn() {
    START_BTN.textContent = '초기화';
    return null;
  } // 렌더: 단어, 타이머, 버튼 텍스트 리셋 


  function renderReset() {
    INPUT.value = '';
    START_BTN.textContent = '시작';
    WORD.textContent = '문제 단어';
    TIMER.textContent = 10;
    return null;
  } // 연산: 푼 문제수를 계산해서 리턴


  function splicedCount(orgLength, mutatedLength) {
    return orgLength - mutatedLength;
  } // 연산: 현재 TIMER 남은 시간을 가져와서 계산


  function getSpentSec(list, idx, leftSec) {
    const spentSec = list[idx].second - leftSec;
    return spentSec;
  } // 연산: spentSecArr에 소요시간 저장


  function storeSpentSec(spentSec) {
    spentSecArr.push(spentSec);
    return spentSecArr;
  } // 연산: 평균 소요시간 계산


  function calcTime(spentSecArr) {
    if (0 < spentSecArr.length) {
      const secSum = spentSecArr.reduce(function (acc, curr) {
        return acc + curr;
      });
      const time = secSum / totalCount;
      const avgTime = Math.round(time);
      return avgTime;
    }

    return null;
  }
})();

/***/ }),

/***/ "d0b0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("24fb");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, "* {\n  box-sizing: border-box;\n  font-family: sans-serif;\n  color: #191d21;\n}\n\ninput,\nbutton {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n}\n\ninput:focus,\nbutton:focus {\n  outline: none;\n}\n\np {\n  text-align: center;\n}\n\n.write {\n  display: inline-block;\n  width: 100%;\n  height: 40px;\n  border: 2px solid #191d21;\n  border-radius: 0.1rem;\n  text-align: center;\n  font-weight: 400;\n  font-size: 15px;\n}\n\nbutton {\n  display: inline-block;\n  width: 100%;\n  height: 40px;\n  border: none;\n  border-radius: 0.1rem;\n  margin-top: 20px;\n  padding: 10px;\n}\n\n.mainBtn {\n  background-color: #ffdf00;\n}\n\n.word {\n  font-weight: 700;\n  font-size: 30px;\n}\n\n.mainScreen {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 30px;\n  width: 400px;\n}\n\n.countContainer {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  height: 30px;\n}\n\n.count {\n  font-weight: 700;\n}\n\n.finishedScreen {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 30px;\n  width: 400px;\n}\n\n.wordContainer {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.final {\n  border-bottom: 4px solid #ffdf00;\n  padding-bottom: 5px;\n  width: 190px;\n}\n\n.hidden {\n  display: none;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ })

/******/ });