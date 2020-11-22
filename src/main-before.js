
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
export async function startGame(func) { 
  // let startScore = SCORE.textContent;
  WORD.textContent = '...';
  // SCORE.textContent = startScore;
  START_BTN.textContent = '초기화';
  await getData();
  timerOn();
  return func();
}

// 연산: 인덱스에 해당하는 time을 받아서 -1 씩 하면서 0이 되면 끝, score 를 연산 후 전달. 
// 렌더: score를 리턴
// 다음 단어를 부르는 실행기를 실행시킨다.
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


// 연산
if(randomArr.length === 10) {
  calcTime();
  return endGame();
}

// 연산 // randomArr 전역변수 아니라 객체로 input 받음? randomNum도
randomArr.push(randomNum);


// 렌더
INPUT.value = '';
WORD.textContent = wordList[randomNum].text;
TIMER.textContent = wordList[randomNum].second;


// input창을 비우고, 글자와 초를 새로운걸로 바꾼다. 사용한 인덱스는 arr에 담는다. 
export function nextWord() {
  getNum();

  

}

// 버튼을 눌러 게임을 중단했을 때 실행되는 함수. 랜덤배열 초기화.
export function resetGame() {
  clearInterval(intervalId);
  START_BTN.textContent = '시작';
  WORD.textContent = '문제 단어';
  TIMER.textContent = 10;
  randomArr = [];
}

// randomNum = Math.floor(Math.random() * 12); 

// 0 에서 12의 랜덤 숫자를 wordList의 인덱스로 사용.
// 사용한 인덱스를 배열에 저장, 새로만든 랜덤 숫자가 배열에 있으면,
// 새로운 랜덤 숫자를 만들고, 중복되지 않는 숫자를 랜덤 숫자에 넣어서 
export function getNum(randomNum) {
  
  if(randomArr.includes(randomNum)) {
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

// 연산: 엔터쳤을 때 일치하는지 체크
// 연산: 현재 TIMER 남은 시간을 가져와서 계산
// 렌더: leftSec로 저장?? -> 다른 방식 있나?  
// 실행기 : 시간 체크하는 함수에 실행될때의 랜덤 숫자 전달. 
export function checkVal(e) {
  const match = (INPUT.value.toLowerCase() === WORD.textContent.toLowerCase());
  if(e.keyCode === 13 && match) {
    const leftSec = TIMER.textContent;
    return checkTime(randomNum, leftSec);
  }
  e.stopPropagation;
  return null
}

// 시간 체크하는 함수에 
// 실행될때의 랜덤 숫자 전달. 
// 실행: 다음 단어 실행 
export function checkTime(index, leftSec) {
  const spentSec = wordList[index].second - leftSec;
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

// 10개를 다 풀었을 때, 
// 화면 초기화
// 객체 초기화
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


