const pages = [...document.querySelectorAll(".page")];
const buttons = [...document.querySelectorAll("[data-next]")];
const typewriter = document.querySelector("#typewriter");
const canvas = document.querySelector("#heartCanvas");
const ctx = canvas.getContext("2d");

const letter = [
  "魏雨娜：",
  "今天是520，我想把最偏心、最认真、最温柔的话都留给你。",
  "我喜欢你笑起来的样子，也喜欢和你在一起时，时间慢慢变甜的感觉。",
  "以后我会一直站在你这边，陪你开心，陪你勇敢，也陪你把每一天过成我们的小浪漫。",
  "520快乐。叶子箫真的很爱你。"
].join("\n\n");

let typingTimer;
let hearts = [];

function setViewportHeight() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
}

function showPage(name) {
  pages.forEach((page) => {
    page.classList.toggle("is-show", page.dataset.page === name);
  });

  if (name === "letter") {
    startTyping();
  }
}

function startTyping() {
  clearTimeout(typingTimer);
  typewriter.textContent = "";
  let index = 0;

  function tick() {
    typewriter.textContent = letter.slice(0, index);
    index += 1;
    if (index <= letter.length) {
      typingTimer = setTimeout(tick, 48);
    }
  }

  tick();
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function makeHeart() {
  return {
    x: Math.random() * window.innerWidth,
    y: window.innerHeight + 30 + Math.random() * 120,
    size: 8 + Math.random() * 13,
    speed: 0.45 + Math.random() * 1.1,
    swing: Math.random() * Math.PI * 2,
    alpha: 0.45 + Math.random() * 0.45,
    color: Math.random() > 0.35 ? "#ff4f7c" : "#ffd36a"
  };
}

function drawHeart(x, y, size, color, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 18, size / 18);
  ctx.beginPath();
  ctx.moveTo(0, 6);
  ctx.bezierCurveTo(-18, -7, -9, -20, 0, -10);
  ctx.bezierCurveTo(9, -20, 18, -7, 0, 6);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function animateHearts() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  hearts.forEach((heart) => {
    heart.y -= heart.speed;
    heart.swing += 0.018;
    drawHeart(heart.x + Math.sin(heart.swing) * 14, heart.y, heart.size, heart.color, heart.alpha);
  });

  hearts = hearts.filter((heart) => heart.y > -40);
  while (hearts.length < 42) {
    hearts.push(makeHeart());
  }

  requestAnimationFrame(animateHearts);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.next));
});

window.addEventListener("resize", () => {
  setViewportHeight();
  resizeCanvas();
});
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    setViewportHeight();
    resizeCanvas();
  }, 250);
});

setViewportHeight();
resizeCanvas();
animateHearts();
