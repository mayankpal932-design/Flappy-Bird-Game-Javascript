const bird = document.getElementById('bird');
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');

let birdTop = 250;
let gravity = 2;
let isGameOver = false;
let score = 0;

document.addEventListener('keydown', () => {
  if (!isGameOver) birdTop -= 50;
});

function createPipe() {
  const pipeGap = 370;
  const pipeTopHeight = Math.floor(Math.random() * 300) + 50;
  const pipeBottomHeight = 600 - pipeTopHeight - pipeGap;
  const pipeX = 400;

  const topPipe = document.createElement('div');
  topPipe.classList.add('pipe', 'top');
  topPipe.style.height = pipeTopHeight + 'px';
  topPipe.style.left = pipeX + 'px';

  const bottomPipe = document.createElement('div');
  bottomPipe.classList.add('pipe', 'bottom');
  bottomPipe.style.height = pipeBottomHeight + 'px';
  bottomPipe.style.left = pipeX + 'px';

  game.appendChild(topPipe);
  game.appendChild(bottomPipe);

  let passed = false;

  function movePipes() {
    if (isGameOver) return;

    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(pipe => {
      let currentLeft = parseInt(pipe.style.left);
      pipe.style.left = currentLeft - 1 + 'px';

      if (currentLeft < -60) {
        pipe.remove();
      }

      // Collision Detection
      const birdRect = bird.getBoundingClientRect();
      const pipeRect = pipe.getBoundingClientRect();
      if (
        birdRect.left < pipeRect.left + pipeRect.width &&
        birdRect.left + birdRect.width > pipeRect.left &&
        birdRect.top < pipeRect.top + pipeRect.height &&
        birdRect.top + birdRect.height > pipeRect.top
      ) {
        gameOver();
      }

      if (!passed && currentLeft + 60 < 100) {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
        passed = true;
      }
    });
  }

  const pipeInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(pipeInterval);
    } else {
      movePipes();
    }
  }, 20);
}

function gameOver() {
  isGameOver = true;

  const gameOverDiv = document.getElementById('game-over');
  const finalScoreSpan = document.getElementById('final-score');

  finalScoreSpan.textContent = score;
  gameOverDiv.style.display = 'block';
  document.getElementById('restart-btn').addEventListener('click', () => {
    location.reload();
  });
}

function applyGravity() {
  if (isGameOver) return;
  birdTop += gravity;
  bird.style.top = birdTop + 'px';

  if (birdTop > 560 || birdTop < 0) {
    gameOver();
  }
}

setInterval(() => {
  applyGravity();
}, 20);

setInterval(() => {
  if (!isGameOver) createPipe();
}, 2000);