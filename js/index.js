const DAYS   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

function pad(n) { return String(n).padStart(2,'0'); }

function getMensaje(h) {
  if (h < 7)  return '🌙 Es hora de descansar';
  if (h < 12) return '☀️ Buenos días, a darle al código';
  if (h < 14) return '💻 Echa un rato más, pero come algo';
  if (h < 16) return '🍽️ Espero que hayas comido bien';
  if (h < 18) return '🌆 Buenas tardes, último empujón';
  if (h < 22) return '⚡ Esto ya son horas extras...';
  return '😴 Buenas noches, es hora de parar';
}

function tick() {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  document.getElementById('w-time').textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  document.getElementById('w-date').textContent = `${DAYS[now.getDay()]}, ${now.getDate()} de ${MONTHS[now.getMonth()]}`;
  document.getElementById('w-msg').textContent  = getMensaje(h);
}
tick();
setInterval(tick, 1000);

try {
  const links = JSON.parse(localStorage.getItem('mis-links') || '[]');
  document.getElementById('w-link-count').textContent = links.length;
} catch {}
