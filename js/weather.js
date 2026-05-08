// ─── Configuración ───────────────────────────────────────────
const API_KEY     = '11858de2d26242af9ee114843260805';
const DEFAULT_CITY = 'Madrid';
const BASE_URL    = 'https://api.weatherapi.com/v1/forecast.json';

// ─── Referencias DOM ─────────────────────────────────────────
const loaderScreen = document.getElementById('loader-screen');
const appScreen    = document.getElementById('app-screen');
const searchInput  = document.getElementById('search-input');
const searchBtn    = document.getElementById('search-btn');

function showLoader() {
  loaderScreen.removeAttribute('hidden');
  appScreen.setAttribute('hidden', '');
}
function showApp() {
  loaderScreen.setAttribute('hidden', '');
  appScreen.removeAttribute('hidden');
}

// ─── Fetch a la API ──────────────────────────────────────────
async function fetchWeather(city) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&days=1&aqi=no&lang=es`;
  const res  = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || `Error ${res.status}`);
  }
  return res.json();
}

// ─── Renderizar datos ────────────────────────────────────────
function render(data) {
  const loc = data.location;
  const cur = data.current;

  // Cabecera
  document.getElementById('app-location').textContent = `📍 ${loc.name}, ${loc.country}`;
  document.getElementById('app-updated').textContent  = `Actualizado: ${loc.localtime}`;

  // Datos principales
  document.getElementById('w-icon').src              = 'https:' + cur.condition.icon.replace('64x64', '128x128');
  document.getElementById('w-icon').alt              = cur.condition.text;
  document.getElementById('w-temp').textContent      = `${Math.round(cur.temp_c)}°C`;
  document.getElementById('w-condition').textContent = cur.condition.text;
  document.getElementById('w-feels').textContent     = `Sensación térmica ${Math.round(cur.feelslike_c)}°C`;

  // Stats
  document.getElementById('w-precip').textContent   = `${cur.precip_mm} mm`;
  document.getElementById('w-humidity').textContent = `${cur.humidity}%`;
  document.getElementById('w-wind').textContent     = `${Math.round(cur.wind_kph)} km/h`;
  document.getElementById('w-uv').textContent       = cur.uv;

  // Previsión por horas
  const horaActual = new Date().getHours();
  const row = document.getElementById('hourly-row');
  row.innerHTML = '';

  data.forecast.forecastday[0].hour.forEach(h => {
    const horaNum = parseInt(h.time.split(' ')[1]);
    const esAhora = horaNum === horaActual;

    const card = document.createElement('div');
    card.className = 'hour-card' + (esAhora ? ' now' : '');
    card.innerHTML = `
      <span class="hour-card__time">${esAhora ? 'Ahora' : h.time.split(' ')[1]}</span>
      <img  class="hour-card__icon" src="https:${h.condition.icon}" alt="${h.condition.text}" />
      <span class="hour-card__temp">${Math.round(h.temp_c)}°</span>
      <span class="hour-card__rain">💧 ${h.chance_of_rain}%</span>
    `;
    row.appendChild(card);
  });

  // Scroll automático a la hora actual
  const nowCard = row.querySelector('.now');
  if (nowCard) nowCard.scrollIntoView({ inline: 'center', block: 'nearest' });
}

// ─── Cargar ciudad ───────────────────────────────────────────
async function cargar(city) {
  showLoader();
  try {
    const data = await fetchWeather(city);
    render(data);
    showApp();
    // Guardamos la última ciudad buscada
    sessionStorage.setItem('w-city', city);
  } catch (e) {
    showApp(); // mostramos app igualmente para que el error sea visible
    document.getElementById('search-error').textContent = '⚠️ ' + e.message;
  }
}

// ─── Eventos de búsqueda ─────────────────────────────────────
searchBtn.addEventListener('click', () => {
  const city = searchInput.value.trim();
  document.getElementById('search-error').textContent = '';
  if (city) cargar(city);
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') searchBtn.click();
});

// ─── Arranque ────────────────────────────────────────────────
// Cargamos la última ciudad visitada o Madrid por defecto
const lastCity = sessionStorage.getItem('w-city') || DEFAULT_CITY;
cargar(lastCity);
