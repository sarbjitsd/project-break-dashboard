# 🖥️ Mi Dashboard — Sarbjit

Proyecto personal desarrollado durante el Bootcamp Full Stack Developer. Es un dashboard con cuatro herramientas independientes que funcionan juntas desde una página central.

---

## 🚀 Cómo usarlo

1. Descarga o clona el repositorio
2. Abre `index.html` en tu navegador
3. Desde ahí puedes acceder a cada módulo

---

## 📁 Estructura del proyecto

```
project-break-dashboard/
│
├── index.html              ← Página principal con acceso a todos los módulos
│
├── css/
│   ├── global.css          ← Estilos compartidos por todas las páginas
│   ├── index.css           ← Estilos específicos del index
│   ├── clock.css           ← Estilos del reloj
│   ├── weather.css         ← Estilos de la estación meteorológica
│   ├── password.css        ← Estilos del generador de contraseñas
│   └── links.css           ← Estilos del listado de links
│
├── js/
│   ├── bg.js               ← Fondos aleatorios (compartido por todas las páginas)
│   ├── index.js            ← Lógica del index
│   ├── clock.js            ← Lógica del reloj
│   ├── weather.js          ← Lógica del tiempo + llamada a la API
│   ├── password.js         ← Lógica del generador de contraseñas
│   └── links.js            ← Lógica del listado de links + localStorage
│
└── pages/
    ├── clock.html          ← Página del reloj
    ├── weather.html        ← Página de la estación meteorológica
    ├── password.html       ← Página del generador de contraseñas
    └── links.html          ← Página del listado de links
```

---

## 🧩 Módulos

### 🕐 Reloj Digital
**Archivo:** `pages/clock.html` — `js/clock.js` — `css/clock.css`

Reloj digital en formato 24h que se actualiza cada segundo en tiempo real.

- Muestra **horas, minutos y segundos** con formato `00:00:00`
- Muestra la **fecha completa** en español (`Viernes, 8 de mayo de 2025`)
- Muestra un **mensaje personalizado** según la franja horaria del día
- Indicadores de **día del año**, **número de semana** y **trimestre**
- **Barras de progreso** del día y del año

**Tecnologías usadas:** `new Date()`, `getHours()`, `getMinutes()`, `setInterval()`

---

### 🌤️ Estación Meteorológica
**Archivo:** `pages/weather.html` — `js/weather.js` — `css/weather.css`

Consulta el tiempo en tiempo real de cualquier ciudad del mundo.

- Muestra **temperatura actual**, sensación térmica y estado del cielo
- Datos de **precipitaciones, humedad, viento e índice UV**
- **Previsión por horas** del día con iconos y probabilidad de lluvia
- Buscador para cambiar de ciudad en cualquier momento
- Carga automáticamente con **Madrid** por defecto

**Tecnologías usadas:** `fetch()`, `async/await`, API de [WeatherAPI](https://www.weatherapi.com)

---

### 🔐 Generador de Contraseñas
**Archivo:** `pages/password.html` — `js/password.js` — `css/password.css`

Genera contraseñas seguras y aleatorias al instante.

- Longitud configurable entre **12 y 50 caracteres** mediante un slider
- Siempre incluye mínimo una **mayúscula, minúscula, número y símbolo**
- **Indicador de fortaleza** de la contraseña (Débil / Media / Buena / Fuerte)
- Botón de **copiar al portapapeles** con confirmación visual
- **Historial** de las últimas 5 contraseñas generadas en la sesión

**Tecnologías usadas:** `Math.random()`, `Math.floor()`, algoritmo Fisher-Yates shuffle

---

### 🔗 Listado de Links
**Archivo:** `pages/links.html` — `js/links.js` — `css/links.css`

Guarda y gestiona tus enlaces favoritos de forma permanente en el navegador.

- **Añade links** con título y URL mediante un formulario
- Los datos se guardan en **localStorage** y persisten al cerrar el navegador
- Cada link muestra su **favicon**, título, URL y fecha de guardado
- Botón de **eliminar** para quitar los que ya no necesites
- **Validación** de campos: título obligatorio y URL con formato correcto

**Tecnologías usadas:** `localStorage`, `JSON.stringify/parse`, `createElement`, `appendChild`, delegación de eventos

---

### 🖼️ Fondos Aleatorios
**Archivo:** `js/bg.js`

Todas las páginas tienen una imagen de fondo que cambia automáticamente.

- **12 imágenes** de alta calidad de [Unsplash](https://unsplash.com)
- Cambia cada **15 segundos** de forma automática
- Nunca repite la misma imagen dos veces seguidas
- **Precarga** la imagen antes de mostrarla para evitar parpadeos
- Overlay semitransparente para que no tape el contenido

**Tecnologías usadas:** `Math.random()`, `setInterval()`, `new Image()`, estilos en línea con JS

---

## 🛠️ Tecnologías

- **HTML5** — Estructura semántica
- **CSS3** — Variables CSS, Flexbox, Grid, animaciones
- **JavaScript ES6+** — Sin frameworks, vanilla JS puro
- **WeatherAPI** — API externa para datos meteorológicos
- **Unsplash** — Imágenes de fondo de alta calidad
- **localStorage / sessionStorage** — Persistencia de datos en el navegador

---

## 👤 Autor

**Sarbjit** — Proyecto de fin de módulo del Bootcamp de Desarrollo Web Full Stack.

---

*© 2026 Sarbjit — Todos los derechos reservados.*
