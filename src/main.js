import { routes, MAIN_SCREEN, FIN_SCREEN } from './routes';
const TIMER = document.querySelector('.time');
const WORD = document.querySelector('.word');
const INPUT = document.querySelector('.write');
const START_BTN = document.querySelector('.start');
let SCORE = document.querySelector('.score');

let wordList = [];
let randomArr = [];
let spentSecArr = [];
let failCount = 0;
let avgTime = 0;
let intervalId = null;
let randomNum = Math.floor(Math.random() * 12); 

START_BTN.addEventListener('click', toggle, false);
INPUT.addEventListener('keyup', checkVal, false);
window.addEventListener('DOMContentLoaded', getData, false);
window.addEventListener('unload', endGame, false);

async function getData() {
  let url = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
  let response = await fetch(url);
  if (response.ok) { 
    wordList = await response.json();
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

export function toggle() {
  if(START_BTN.textContent === '시작') {
    return startGame();
  }
  if(START_BTN.textContent === '초기화') {
    return resetGame();
  }
}

// 시작 버튼을 눌러 게임을 시작했을 때 함수. second -1씩
export async function startGame() { 
  let startScore = SCORE.textContent;
  WORD.textContent = '...';
  SCORE.textContent = startScore;
  START_BTN.textContent = '초기화';
  await getData();
  timerOn();
  return nextWord();
}

export function timerOn() {
  intervalId = window.setInterval(() => {
    TIMER.textContent -= 1;
    if(Number(TIMER.textContent) === 0) {
      failCount = failCount + 1;
      SCORE.textContent = SCORE.textContent - 1;
      return nextWord();
    }
  }, 1000);
}

// input창을 비우고, 글자와 초를 새로운걸로 바꾼다. 사용한 인덱스는 arr에 담는다. 
export async function nextWord() {
  await getNum();
  if(randomArr.length === 10) {
    calcTime();
    return endGame();
  }
  INPUT.value = '';
  WORD.textContent = wordList[randomNum].text;
  TIMER.textContent = wordList[randomNum].second;
  return randomArr.push(randomNum);
}

// 버튼을 눌러 게임을 중단했을 때 실행되는 함수. 랜덤배열 초기화.
export function resetGame() {
  clearInterval(intervalId);
  START_BTN.textContent = '시작';
  WORD.textContent = '문제 단어';
  TIMER.textContent = 10;
  randomArr = [];
}


// 0 에서 12의 랜덤 숫자를 wordList의 인덱스로 사용.
// 사용한 인덱스를 배열에 저장, 새로만든 랜덤 숫자가 배열에 있으면,
// 새로운 랜덤 숫자를 만들고, 중복되지 않는 숫자를 랜덤 숫자에 넣어서 
export function getNum() {
  randomNum = Math.floor(Math.random() * 12); 
  if(randomArr.includes(randomNum)) {
    // console.log('random if', randomNum);
    for(let i = 0; i < wordList.length; i++) {
      if(i !== randomNum && !randomArr.includes(i)) { 
        randomNum = i; 
        return randomNum;
      }
    }
  }
  else {
    return randomNum;
  }
}

// 엔터쳤을 때 일치하는지 체크, 시간 체크하는 함수에 실행될때의 랜덤 숫자 전달. 
export function checkVal(e) {
  let match = (INPUT.value.toLowerCase() === WORD.textContent.toLowerCase());
  if(e.keyCode === 13 && match) {
    let leftSec = TIMER.textContent;
    return checkTime(randomNum, leftSec);
  }
  e.stopPropagation;
  return null
}

// 엔터쳤을 때 일치하는지 체크, 시간 체크하는 함수에 실행될때의 랜덤 숫자 전달. 
export function checkTime(index, leftSec) {
  let spentSec = wordList[index].second - leftSec;
  spentSecArr.push(spentSec);
  return nextWord();
}

export function calcTime() {
  const secSum = spentSecArr.reduce(function(acc, curr) {
    return acc + curr;
  })
  const time = secSum / (randomArr.length - failCount);
  avgTime = Math.round(time);
  return avgTime;
} 

// 10개를 다 풀었을 때, 게임 종료 후 완료 페이지로 이동
export function endGame() {
  clearInterval(intervalId);
  START_BTN.textContent = '시작';
  WORD.textContent = '문제 단어';
  TIMER.textContent = 10;
  randomArr = [];
}

const FIN_BTN = document.querySelector('.finBtn');
FIN_BTN.addEventListener('click', push);

function push() {
  history.pushState({ 'finalScore': SCORE.textContent, 'finalTime': avgTime }, null, routes['finished']);
  MAIN_SCREEN.classList.add('hidden');
  FIN_SCREEN.classList.remove('hidden');
}


