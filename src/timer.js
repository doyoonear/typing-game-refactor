
const INPUT = document.querySelector('#write');
const WORD = document.querySelector('.word');
const TIMER = document.querySelector('.time');
const START_BTN = document.querySelector('.start');
const TEMP_BTN = document.querySelector('.temp');
const WORD_CON = document.querySelector('.wordContainer');
const docFrag = document.createDocumentFragment(); // fragment 생성
const wordList = [];

START_BTN.addEventListener('click', timerOn, false);
INPUT.addEventListener('keyup', checkVal, false);
document.body.addEventListener('click', getData, false);

// fetch 에서 갯수를 제한하면 좋을 것 같다. 안되면 그냥 매번? 한번 불러오고 끝? 아마 한번만. 

export function getData() {
  fetch('https://my-json-server.typicode.com/kakaopay-fe/resources/words')
  .then(res => res.json())
  .then(res => wordList.concat(res))
  .then(res => console.log('wordList', wordList))
  // .catch(err => console.log(err));
}

// 받아온 data 중에 text는 word 로 주고, sec는 TIMER에 준다.
// 랜덤 숫자 배열 길이가 10이 되면, clearInterval
export function timerOn() {
  const intervalId = window.setInterval(() => {
    TIMER.textContent -= 1;
    if(TIMER.textContent === '0') {
      nextTimer();
    }
  }, 1000);
  return intervalId;
}

export function nextTimer() {
    TIMER.textContent = 10;
    clearInterval(timerOn());
}

// 랜덤 숫자 배열이 10이 되면 자동으로 게임 종료 후 완료 페이지로 이동 시킨다. 
export function stopGame() {
  console.log('stopGame');
}

// 사용자가 중지 버튼을 클릭했을 때 게임 리셋, 랜덤배열 초기화.
export function resetGame() {
  console.log('resetGame');
}

// 0 에서 12의 랜덤 숫자를 인덱스로 사용, 한번 사용한 단어는 제외한다. 
// 사용한 인덱스를 배열에 저장, 새로만든 랜덤 숫자가 배열에 있으면 다른 랜덤 숫자 사용
export function getNum() {
  let randomNum = Math.floor(Math.random() * (12 - 0)); 
  console.log('random',randomNum); 
  WORD.textContent = wordList[randomNum].text;
  TIMER.textContent = wordList[randomNum].text;
  return WORD;
}

// 엔터키 입력했을때 발동. 입력창 INPUT의 입력한값 제시어와 확인하여 맞으면 
// INPUT value 가 같으면 INPUT을 clear하고, 단어리스트의 다음인덱스를 가져온다.
// 같으면 점수 count를 올린다. 
export function checkVal(e) {
  if(e.keyCode === 13) {
    if(INPUT.value === WORD.textContent) {
      INPUT.value = '';
      getNum();
    }
    e.stopPropagation;
    return;
  }
  
}
