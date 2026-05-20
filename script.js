const pages = [...document.querySelectorAll(".page")];
const buttons = [...document.querySelectorAll("[data-next]")];
const typewriter = document.querySelector("#typewriter");
const canvas = document.querySelector("#heartCanvas");
const ctx = canvas.getContext("2d");

const letter = [
  "小雨宝宝：",
  "今天是520，是日期都说我爱你的一天。",
  "我喜欢你笑起来的样子，喜欢你认真说话的样子，也喜欢你偶尔撒娇、偶尔小脾气的样子。因为那都是我宝宝，是我心里独一份的可爱。",
  "有时候我也会想，世界这么大，时间这么快，我们能遇见彼此、靠近彼此，真的很幸运。所以我不想只在520这一天说爱你，我想在以后很多很多个平常的日子里，用行动慢慢告诉你：你一直都很重要。",
  "我想陪你吃很多顿饭，走很多段路，看很多次日落。想在你开心的时候比你还开心，在你难过的时候认真抱抱你，在你累的时候让你知道，你不是一个人。",
  "如果未来有很多不确定，那我确定的一件事就是：我会一直站在老婆你这边。偏爱你，保护你，认真听你说话，也把你稳稳放在心上。",
  "我不敢说自己每一件事都能做到完美，但我会一直学着更懂你、更珍惜你、更好地爱你。因为你值得很多很多温柔，也值得被坚定地选择。",
  "今天的喜欢是你，明天的想念是你，以后很长很长的日子，我的答案也还是你。",
  "我真的很爱你呀～mua"
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
      typingTimer = setTimeout(tick, 28);
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
