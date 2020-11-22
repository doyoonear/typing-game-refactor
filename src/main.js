import { routes, MAIN_SCREEN, FIN_SCREEN } from './routes';

(function() {
  const TIMER = document.querySelector('.time');
  const WORD = document.querySelector('.word');
  const INPUT = document.querySelector('.write');
  const START_BTN = document.querySelector('.start');
  let SCORE = document.querySelector('.score');
  let wordList = [];
  let orgLength = 0;
  let randomIdx = 0;

  START_BTN.addEventListener('click', toggle);
  INPUT.addEventListener('keyup', checkVal);
  INPUT.addEventListener('watch', e => e.detail.checkEndGame());
  window.addEventListener('DOMContentLoaded', function(){ getData(
    'https://my-json-server.typicode.com/kakaopay-fe/resources/words'
  ) }, false);
  window.addEventListener('unload', checkEndGame);

  
  const eventWatch = new CustomEvent('watch', {
    bubbles: true,
    detail: { checkEndGame }
  });
  
  // form 엘리먼트는 커스텀 "watch" 이벤트를 리슨한 후 전달된 text() 메소드의 결과를 콘솔에 출력합니다
  
  
  // 사용자가 입력한대로, form 내의 textarea 는 이벤트를 디스패치/트리거하여 시작점으로 사용합니다
  // INPUT.addEventListener('awesome', e => e.target.dispatchEvent(eventAwesome));

  async function getData(url) {
    let response = await fetch(url);
    wordList = await response.json();
    orgLength = wordList.length;
    return wordList;
  }

  // 렌더: score를 리턴
  function renderScore(score) {
    score -= 1;
    return score;
  }

  // 렌더: 다음 문제의 정보를 렌더한다. 
  function renderNext(randomIdx) {
    console.log('rendernext');
    console.log(wordList);
    console.log(randomIdx);
    INPUT.value = '';
    WORD.textContent = wordList[randomIdx].text;
    TIMER.textContent = wordList[randomIdx].second;  
  }

  // 렌더: 제시단어 변경하는동안 렌더하는 함수, 버튼 텍스트 변경
  function afterStart() {
    console.log('afterstart')
    WORD.textContent = '...';
    START_BTN.textContent = '초기화';
  }

  // 렌더: 단어, 타이머, 버튼 텍스트 리셋 
  function renderReset(){
    INPUT.value = '';
    START_BTN.textContent = '시작';
    WORD.textContent = '문제 단어';
    TIMER.textContent = 10;
  }

  // 실행: 시작 버튼을 눌렀을 때 버튼 텍스트에 따라서 함수 실행
  function toggle() {
    if(START_BTN.textContent === '시작') {
      return startGame();
    }
    if(START_BTN.textContent === '초기화') {
      return resetGame();
    }
  }

  // 렌더하기 전에 어디서 기다려줘야하지? 
  // 실행: 랜덤 숫자를 받아서 타이머, 제시단어 변경하는 함수를 실행
  // 실행: setInterval 함수를 실행
  async function startGame() {
    await renderNext();
    timerOn();
    afterStart();
    return;
  }


  // removeUsed(list, randomIdx);

  // 실행: 푼 문제수가 10개가 되면 calcTime, endGame 함수 실행
  
  function checkEndGame() {
    console.log('checkendgame')
    const totalCount = splicedCount(orgLength, mutatedLength);
    if(totalCount === 10) {
      calcTime();
      renderReset();
      clear();
      return true; 
    }
    return false;
  }

  // 실행: clearInterval
  function clear() {
    clearInterval(timerOn());
  }

  // 연산: 인덱스에 해당하는 time을 받아서 -1 씩 하면서 0이 되면 끝
  function timerOn() {
    console.log('timeron')
    return window.setInterval(() => {
      TIMER.textContent -= 1;
      if(Number(TIMER.textContent) === 0) {
        renderScore(SCORE.textContent);
      }
    }, 1000);
  }

  // 연산: wordList 의 배열 길이에 맞춘, 랜덤 숫자 생성
  function makeRandom(length) {
    console.log('makerandom');
    randomIdx = Math.floor(Math.random() * length); 
    console.log('random', randomIdx);
    return randomIdx;
  }

  // 연산: 새로만든 랜덤 숫자를 인덱스로 받아서 splice로 원 배열에서 없애버린다. 
  function removeUsed(list, index) {
    list.splice(index, 1);
    console.log('spliced', list);
    return list;
  }

  // 연산: 엔터쳤을 때 일치하는지 확인
  function checkVal(e) {
    let match = (INPUT.value.toLowerCase() === WORD.textContent.toLowerCase());
    if(e.keyCode === 13 && match) {
      console.log('same') 
    }
    if(e.keyCode === 13 && !match) {
      INPUT.value = '';
    }
    return false;
  }

  // 연산: 시간이 0이 되면 score -1
  function decreaseScore(score) {
    if(TIMER.textContent === 0) {
      score -= 1;
      return score;
    }
    return score;
  }

  // 연산: 푼 문제수를 계산해서 리턴
  function splicedCount(orgLength, mutatedLength) {
    let totalCount = orgLength - mutatedLength;
    return totalCount; 
  }

  // 비교 totalCount가 10 이 되는지 감시

  // 연산: 현재 TIMER 남은 시간을 가져와서 계산
  function checkTime(index, leftSec) {
    const spentSec = wordList[index].second - leftSec;
    spentSecArr.push(spentSec);
    return;
  }

  // 연산: 평균 소요시간 계산
  function calcTime(spentSecArr) {
    const secSum = spentSecArr.reduce(function(acc, curr) {
      return acc + curr;
    })
    const time = secSum / (randomArr.length - failCount);
    avgTime = Math.round(time);
    return avgTime;
  } 

  ////////// 임시 - 삭제필요 *****
  const FIN_BTN = document.querySelector('.finBtn');
  FIN_BTN.addEventListener('click', push);

  // 실행: pushState로 완료 페이지로 이동
  function push() {
    history.pushState({ 'finalScore': SCORE.textContent, 'finalTime': avgTime }, null, routes['finished']);
    MAIN_SCREEN.classList.add('hidden');
    FIN_SCREEN.classList.remove('hidden');
  }
})();
