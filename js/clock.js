const DAYS   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
function pad(n) { return String(n).padStart(2,'0'); }

function getMensaje(h) {
  if (h < 7)  return '🌙 Es hora de descansar. Apaga y sigue mañana';
  if (h < 12) return '☀️ Buenos días, desayuna fuerte y a darle al código';
  if (h < 14) return '💻 Echa un rato más, pero no olvides comer';
  if (h < 16) return '🍽️ Espero que hayas comido bien';
  if (h < 18) return '🌆 Buenas tardes, el último empujón';
  if (h < 22) return '⚡ Esto ya son horas extras… piensa en parar pronto';
  return '😴 Buenas noches, es hora de descansar';
}

function getDayOfYear(d) {
  return Math.floor((d - new Date(d.getFullYear(),0,0)) / 86400000);
}
function getWeek(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}

function tick() {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();

  // Reloj principal (existe en index y en clock.html)
  const ct = document.getElementById('clock-time') || document.getElementById('w-time');
  const cd = document.getElementById('clock-date') || document.getElementById('w-date');
  const cm = document.getElementById('clock-msg')  || document.getElementById('w-msg');

  if (ct) ct.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  if (cd) cd.textContent = `${DAYS[now.getDay()]}, ${now.getDate()} de ${MONTHS[now.getMonth()]} de ${now.getFullYear()}`;
  if (cm) cm.textContent = getMensaje(h);

  // Stats (solo en clock.html)
  const doy = document.getElementById('day-of-year');
  const wn  = document.getElementById('week-num');
  const qt  = document.getElementById('quarter');
  const tz  = document.getElementById('timezone');
  if (doy) doy.textContent = getDayOfYear(now);
  if (wn)  wn.textContent  = 'Sem. ' + pad(getWeek(now));
  if (qt)  qt.textContent  = 'Q' + (Math.floor(now.getMonth()/3)+1);
  if (tz)  tz.textContent  = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Barras de progreso
  const dayPct  = ((h*3600 + m*60 + s) / 86400) * 100;
  const start   = new Date(now.getFullYear(),0,1);
  const yearPct = ((now - start) / (new Date(now.getFullYear()+1,0,1) - start)) * 100;
  const dayBar  = document.getElementById('day-bar');
  const yearBar = document.getElementById('year-bar');
  if (dayBar)  dayBar.style.width  = dayPct.toFixed(2) + '%';
  if (yearBar) yearBar.style.width = yearPct.toFixed(2) + '%';
}
tick();
setInterval(tick, 1000);
