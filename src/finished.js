import { routes, MAIN_SCREEN, FIN_SCREEN } from './routes';
const CONSOLE_BTN = document.querySelector('.consoleBtn');
const RESTART_BTN = document.querySelector('.restart');
const TIMER = document.querySelector('.time');
const SCORE = document.querySelector('.score');

CONSOLE_BTN.addEventListener('click', consoleFunc);

document.addEventListener('open', getPathname);

RESTART_BTN.addEventListener('click', restartGame);

// pushState가 되었을 때, (location.pathname이 바뀌면?) 
// pathname을 파싱해서 가져오고 
// classList 에서  pathname + Screen을 뺀다. 

function getPathname() {
  console.log(location.pathname.slice());
}

window.onpopstate = function() {
  MAIN_SCREEN.classList.remove('hidden');
  FIN_SCREEN.classList.add('hidden');
};

function consoleFunc() {
  SCORE.textContent = history.state.finalScore;
  TIMER.textContent = history.state.finalTime;
  console.log(SCORE)
}

// 다시시작 버튼 누르면, 뒤로 돌아가기 popState
// 
function restartGame() {
  console.log('window', window.location.pathname);
}
