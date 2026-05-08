//  bg.js — Fondo aleatorio cambiante
//


const IMAGENES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&fit=crop',  
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80&fit=crop',  
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&fit=crop',  
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1920&q=80&fit=crop',  
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80&fit=crop',  
  'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1920&q=80&fit=crop',  
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80&fit=crop',  
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=80&fit=crop',  
  'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1920&q=80&fit=crop',  
  'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=1920&q=80&fit=crop',  
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80&fit=crop',  
  'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=1920&q=80&fit=crop',  
];

const INTERVALO_MS = 15000; // 15 segundos

let indiceActual = -1; // -1 para que el primero siempre sea aleatorio distinto

// ── Función auxiliar: índice aleatorio sin repetir ───────────
function siguienteIndice() {
  let nuevo;
  do {
    // Math.floor(Math.random() * N) → entero entre 0 y N-1
    nuevo = Math.floor(Math.random() * IMAGENES.length);
  } while (nuevo === indiceActual); // si sale el mismo, repetimos
  return nuevo;
}

// ── Precarga la imagen antes de mostrarla (evita parpadeo) ───
function precargar(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload  = () => resolve();
    img.onerror = () => resolve(); // si falla, continuamos igual
    img.src = url;
  });
}

// ── Aplica la imagen al body con estilos en línea ────────────
async function cambiarFondo() {
  indiceActual = siguienteIndice();
  const url = IMAGENES[indiceActual];

  await precargar(url); // esperamos a que esté descargada

  document.body.style.backgroundImage    = `url('${url}')`;
  document.body.style.backgroundSize     = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundAttachment = 'fixed'; // no se mueve al hacer scroll
  document.body.style.backgroundRepeat   = 'no-repeat';
}

// ── Arranque ─────────────────────────────────────────────────
cambiarFondo(); // primera imagen al cargar la página

setInterval(cambiarFondo, INTERVALO_MS); // cambia cada 15 segundos
