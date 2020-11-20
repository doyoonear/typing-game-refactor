const INPUT = document.querySelector('#write');
const WORD = document.querySelector('.word');
const TIMER = document.querySelector('.time');
const START_BTN = document.querySelector('.start');
const TEMP_BTN = document.querySelector('.temp');
const WORD_CON = document.querySelector('.wordContainer');
const docFrag = document.createDocumentFragment(); // fragment 생성
let wordList = [];
let randomArr = [];
let randomNum = Math.floor(Math.random() * 12); 
let intervalId = null;


window.addEventListener('load', getData, false);
INPUT.addEventListener('keyup', checkVal, false);

async function getData() {
  let url = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
  let response = await fetch(url);
  if (response.ok) { 
    wordList = await response.json();
    console.log('word', wordList);
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

START_BTN.onclick = function toggle() {
  if(START_BTN.textContent === '시작') {
    return startGame();
  }
  if(START_BTN.textContent === '초기화') {
    return resetGame();
  }
}

// 시작 버튼을 눌러 게임을 시작했을 때 함수. second -1씩
export async function startGame() { 
  await getData();
  WORD.textContent = wordList[randomNum].text;
  TIMER.textContent = wordList[randomNum].second;
  START_BTN.textContent = '초기화';
  intervalId = window.setInterval(() => {
    TIMER.textContent -= 1;
    if(Number(TIMER.textContent) === 0) {
      return nextWord();
    }
  }, 1000);
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
    for(let i = 0; i < wordList.length; i++) {
      if(i !== randomNum){ 
        randomNum = i; 
        return randomNum;
      }
    }
  }
  else {
    return randomNum;
  }
}

// 단어 10개 채웠는지 체크, 엔터쳤을 때 일치하는지 체크
export function checkVal(e) {
  let match = (INPUT.value.toLowerCase() === WORD.textContent.toLowerCase());
  console.log(match);
  if(e.keyCode === 13 && match) {
    nextWord();
  }
  e.stopPropagation;
  return null;
}

// input창을 비우고, 글자와 초를 새로운걸로 바꾼다. 사용한 인덱스는 arr에 담는다. 
export async function nextWord() {
  await getNum();
  if(randomArr.length <= 10) {
    INPUT.value = '';
    WORD.textContent = wordList[randomNum].text;
    TIMER.textContent = wordList[randomNum].second;
    return randomArr.push(randomNum);
  }
  else {
    return endGame();
  }
}

// 10개를 다 풀었을 때, 게임 종료 후 완료 페이지로 이동
export function endGame() {
  clearInterval(intervalId);
  console.log('endGame');
}





