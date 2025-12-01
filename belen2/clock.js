// create ticks
const ticksContainer = document.getElementById('ticks');
for (let i = 0; i < 60; i++) {
  const el = document.createElement('span');
  if (i % 5 === 0) {
    el.style.height = '18px';
    el.style.top = '6px';
  }
  el.style.transform = `translate(-50%,0) rotate(${i * 6}deg)`;
  ticksContainer.appendChild(el);
}

const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');
const digital = document.getElementById('digital-time');
const ampmEl = document.getElementById('ampm');
const dateEl = document.getElementById('date');

let use24 = false;
let showSeconds = true;

document.getElementById('format-btn').addEventListener('click', (e) => {
  use24 = !use24;
  e.target.textContent = use24 ? '24-hour' : '12-hour';
  e.target.classList.toggle('active');
  updateClock();
});

document.getElementById('toggle-sec').addEventListener('click', (e) => {
  showSeconds = !showSeconds;
  e.target.textContent = showSeconds ? 'Hide seconds' : 'Show seconds';
  e.target.classList.toggle('active');
  secondHand.style.display = showSeconds ? 'block' : 'none';
  updateClock();
});

document.getElementById('theme-btn').addEventListener('click', () => {
  document.documentElement.style.setProperty('--bg1',
    document.documentElement.style.getPropertyValue('--bg1') === '#0f2027' ? '#101317' : '#0f2027');
  document.documentElement.style.setProperty('--bg2',
    document.documentElement.style.getPropertyValue('--bg2') === '#203a43' ? '#2b0b26' : '#203a43');
});

const pad = (n) => n.toString().padStart(2, '0');

function updateClock() {
  const now = new Date();
  const ms = now.getMilliseconds();
  const s = now.getSeconds() + ms / 1000;
  const m = now.getMinutes() + s / 60;
  const h = now.getHours() + m / 60;

  const hourDeg = (h % 12) / 12 * 360;
  const minDeg = (m / 60) * 360;
  const secDeg = (s / 60) * 360;

  hourHand.style.transform = `translate(-50%,-100%) rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `translate(-50%,-100%) rotate(${minDeg}deg)`;
  secondHand.style.transform = `translate(-50%,-100%) rotate(${secDeg}deg)`;

  let hh = now.getHours();
  let ampm = 'AM';
  if (!use24) {
    ampm = hh >= 12 ? 'PM' : 'AM';
    hh = hh % 12 || 12;
  }

  const display = use24
    ? `${pad(now.getHours())}:${pad(now.getMinutes())}${showSeconds ? ':' + pad(now.getSeconds()) : ''}`
    : `${pad(hh)}:${pad(now.getMinutes())}${showSeconds ? ':' + pad(now.getSeconds()) : ''}`;

  digital.textContent = display;
  ampmEl.textContent = use24 ? '' : ampm;

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  dateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}

function tick() {
  updateClock();
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
