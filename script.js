// Created Using Easy HTML v1.4.8
// https://play.google.com/store/apps/details?id=ak.andro.easyhtml

const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let score = 0;
let playerX = window.innerWidth / 2;

document.addEventListener("mousemove", (e) => {
  playerX = e.clientX;
  player.style.left = `${playerX - 25}px`;
});

function createFallingItem() {
  const item = document.createElement("div");
  const isBall = Math.random() < 0.7;
  item.className = isBall ? "ball" : "bomb";
  item.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
  game.appendChild(item);

  let top = 0;
  const interval = setInterval(() => {
    top += 5;
    item.style.top = `${top}px`;

    const itemRect = item.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      itemRect.bottom >= playerRect.top &&
      itemRect.left < playerRect.right &&
      itemRect.right > playerRect.left
    ) {
      if (item.classList.contains("ball")) {
        score++;
      } else {
        score = 0;
      }
      scoreDisplay.textContent = `النقاط: ${score}`;
      item.remove();
      clearInterval(interval);
    }

    if (top > window.innerHeight) {
      item.remove();
      clearInterval(interval);
    }
  }, 20);
}

setInterval(createFallingItem, 1000);