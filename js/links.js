const KEY = 'mis-links';

function cargar() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}
function guardar(links) {
  localStorage.setItem(KEY, JSON.stringify(links));
}
function esUrlValida(url) {
  try { const u = new URL(url); return u.protocol === 'http:' || u.protocol === 'https:'; } catch { return false; }
}
function getFavicon(url) {
  try { return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32`; } catch { return ''; }
}

function render() {
  const links = cargar();
  const list  = document.getElementById('links-list');
  const empty = document.getElementById('empty-state');

  if (!list) return;
  list.innerHTML = '';
  empty.style.display = links.length ? 'none' : 'flex';

  links.forEach(link => {
    const li = document.createElement('li');
    li.className = 'link-item';
    li.dataset.id = link.id;
    const fecha = new Date(link.id).toLocaleDateString('es-ES', { day:'numeric', month:'short' });
    li.innerHTML = `
      <img class="link-favicon" src="${getFavicon(link.url)}" alt="" onerror="this.style.display='none'">
      <div class="link-body">
        <a class="link-title" href="${link.url}" target="_blank" rel="noopener">${link.titulo}</a>
        <div class="link-url">${link.url}</div>
      </div>
      <span class="link-date">${fecha}</span>
      <button class="link-del" data-id="${link.id}" title="Eliminar">✕</button>
    `;
    list.appendChild(li);
  });

  // Actualizar contador en index si está abierto
  const counter = document.getElementById('w-link-count');
  if (counter) counter.textContent = links.length;
}

function añadir() {
  const tituloEl = document.getElementById('input-titulo');
  const urlEl    = document.getElementById('input-url');
  const errT     = document.getElementById('err-titulo');
  const errU     = document.getElementById('err-url');

  const titulo = tituloEl.value.trim();
  const url    = urlEl.value.trim();
  let ok = true;

  errT.textContent = ''; errU.textContent = '';
  if (!titulo) { errT.textContent = 'El título es obligatorio'; ok = false; }
  if (!url) { errU.textContent = 'La URL es obligatoria'; ok = false; }
  else if (!esUrlValida(url)) { errU.textContent = 'Introduce una URL válida (https://...)'; ok = false; }
  if (!ok) return;

  const links = cargar();
  links.unshift({ id: Date.now(), titulo, url });
  guardar(links);
  tituloEl.value = ''; urlEl.value = '';
  tituloEl.focus();
  render();
}

function eliminar(id) {
  const links = cargar().filter(l => l.id !== Number(id));
  guardar(links);
  render();
}

document.getElementById('add-btn')?.addEventListener('click', añadir);
document.getElementById('input-url')?.addEventListener('keydown', e => { if (e.key === 'Enter') añadir(); });
document.getElementById('links-list')?.addEventListener('click', e => {
  const btn = e.target.closest('.link-del');
  if (btn) eliminar(btn.dataset.id);
});

render();
