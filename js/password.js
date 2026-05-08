const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMS  = '0123456789';
const SYMS  = '!@#$%^&*()-_=+';

let history = [];

function charAleatorio(str) {
  return str[Math.floor(Math.random() * str.length)];
}
function mezclar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function getPool() {
  let p = '';
  if (document.getElementById('use-upper').checked)   p += UPPER;
  if (document.getElementById('use-lower').checked)   p += LOWER;
  if (document.getElementById('use-numbers').checked) p += NUMS;
  if (document.getElementById('use-symbols').checked) p += SYMS;
  return p || LOWER;
}
function generar() {
  const len = parseInt(document.getElementById('length-range').value);
  const pool = getPool();
  const chars = [charAleatorio(UPPER), charAleatorio(LOWER), charAleatorio(NUMS), charAleatorio(SYMS)];
  for (let i = 4; i < len; i++) chars.push(charAleatorio(pool));
  return mezclar(chars).join('');
}
function fortaleza(len) {
  if (len < 16) return { w: '25%', c: '#f87171', t: 'Débil' };
  if (len < 24) return { w: '50%', c: '#fb923c', t: 'Media' };
  if (len < 36) return { w: '75%', c: '#facc15', t: 'Buena' };
  return { w: '100%', c: '#4ade80', t: 'Fuerte' };
}

function mostrar() {
  const pass = generar();
  document.getElementById('pass-output').textContent = pass;
  const f = fortaleza(pass.length);
  const bar = document.getElementById('strength-bar');
  bar.style.width = f.w; bar.style.background = f.c;
  document.getElementById('strength-text').textContent = f.t;
  history.unshift(pass);
  if (history.length > 5) history.pop();
  renderHistory();
}

function renderHistory() {
  const ul = document.getElementById('history-list');
  if (!history.length) { ul.innerHTML = '<li class="history-empty">Todavía no has generado ninguna.</li>'; return; }
  ul.innerHTML = history.map(p =>
    `<li class="history-item" onclick="copiar('${p}')" title="Clic para copiar">${p}</li>`
  ).join('');
}

function copiar(texto) {
  const t = texto || document.getElementById('pass-output').textContent;
  navigator.clipboard.writeText(t).catch(() => {});
  const btn = document.getElementById('copy-btn');
  const orig = btn.textContent;
  btn.textContent = '✓ Copiado';
  setTimeout(() => btn.textContent = orig, 1500);
}

document.getElementById('gen-btn').addEventListener('click', mostrar);
document.getElementById('copy-btn').addEventListener('click', () => copiar());
document.getElementById('length-range').addEventListener('input', function() {
  document.getElementById('length-display').textContent = this.value;
});
['use-upper','use-lower','use-numbers','use-symbols'].forEach(id => {
  document.getElementById(id).addEventListener('change', mostrar);
});
