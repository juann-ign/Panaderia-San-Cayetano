# 🥐 Panadería San Cayetano — Sitio Web Oficial

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Hostinger](https://img.shields.io/badge/Hostinger-673DE6?style=for-the-badge&logo=hostinger&logoColor=white)

**Sitio web desarrollado de punta a punta para una panadería artesanal ubicada en Gobernador Gregores, Santa Cruz, Argentina.**

[🌐 Ver sitio en vivo](https://www.panaderiasancayetano.com) · [📸 Capturas](#capturas)

</div>

---

## 📖 Descripción

Sitio web institucional y de presentación para **Panadería San Cayetano**, negocio familiar fundado en 2002 en el corazón geográfico de la Patagonia argentina. El sitio comunica la identidad del local, muestra su catálogo de productos artesanales y facilita el contacto con clientes tanto locales como turistas de paso hacia El Calafate.

Primer proyecto web desarrollado completamente de forma **end-to-end**: desde el diseño visual hasta el deploy en producción, incluyendo dominio personalizado, compresión de assets y configuración del servidor.

---

## ✨ Funcionalidades

- **Navegación fija con menú responsive** — drawer lateral animado en mobile con manejo de foco accesible y trap de teclado (Tab / Shift+Tab / Escape)
- **Hero section** con llamadas a la acción y responsive por breakpoints
- **Sección "Nosotros"** con tarjetas animadas mediante `animation-timeline: view()` (Scroll-Driven Animations, nativa CSS)
- **Catálogo de productos** en grilla CSS adaptable (3 → 2 → 1 columnas)
- **Carrusel de reseñas** con Swiper.js: loop, paginación dinámica y navegación por botones
- **Galería fotográfica** con efecto zoom en hover
- **Mapa interactivo** embebido de Google Maps con la ubicación real del local
- **Formulario de contacto** con validación en cliente y envío por PHP (`mail()`) con cabeceras anti-spam
- **Footer** con redes sociales y links legales

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología | Detalle |
|---|---|---|
| Estructura | **HTML5** | Semántica, ARIA roles, Open Graph |
| Estilos | **CSS3** | Custom Properties, Grid, Flexbox, Scroll-Driven Animations |
| Lógica | **Vanilla JavaScript** | DOM, eventos, accesibilidad del menú mobile |
| Backend | **PHP** | Procesamiento y envío del formulario de contacto |
| Librería JS | **Swiper.js** | Carrusel de testimonios (self-hosted, sin CDN) |
| Tipografías | **Poppins + Miniver** | Self-hosted en `.woff2`, con `font-display: swap` |
| Iconografía | **Font Awesome 7** | Self-hosted (Brands, Regular, Solid) |
| Servidor | **Apache / Hostinger** | `.htaccess` con cache, GZIP y Brotli |

> Todas las dependencias (Swiper, Font Awesome, fuentes) están **self-hosted**. El sitio no realiza ninguna petición a CDNs externos, lo que mejora la privacidad y la velocidad de carga.

---

## ⚡ Performance y Optimización

### Carga de recursos
- **`<link rel="preload">`** para las 4 variantes de Poppins y Miniver — evita FOUT (Flash of Unstyled Text)
- **`font-display: swap`** en todos los `@font-face` — el texto es visible de inmediato mientras cargan las fuentes
- **`fetchpriority="high"`** en la imagen hero (LCP) — el navegador la prioriza antes que otros recursos
- **`loading="lazy"`** en todas las imágenes fuera del viewport inicial

### Imágenes
- Servidas con elemento `<picture>` + `<source>` para distintos breakpoints
- Formatos modernos: `.webp` y `.avif` donde corresponde
- Versiones redimensionadas (`-small`, `-medium`, `-xs`) para evitar cargar imágenes sobredimensionadas en mobile

### Servidor (`/.htaccess`)
```apache
# Cache de 1 año para assets estáticos
Header set Cache-Control "public, max-age=31536000, immutable"

# Compresión GZIP para HTML, CSS, JS y fuentes
AddOutputFilterByType DEFLATE text/html text/css application/javascript font/woff2

# Brotli (cuando está disponible en el servidor)
AddOutputFilterByType BROTLI_COMPRESS text/html text/css application/javascript
```

---

## ♿ Accesibilidad

El menú de navegación mobile implementa un **focus trap completo** siguiendo las pautas WCAG 2.1:

- Al abrir el menú, el foco se mueve automáticamente al botón de cierre
- Tab y Shift+Tab ciclan únicamente dentro del menú mientras está abierto
- Escape cierra el menú y devuelve el foco al botón de apertura
- `aria-expanded`, `aria-controls` y `aria-label` actualizados dinámicamente
- `aria-hidden` en el nav cuando está cerrado para lectores de pantalla

```js
// Ejemplo: detección de elementos enfocables en el nav
const FOCUSABLE_SELECTORS = 
  'a[href], input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function trapFocus(e) {
  if (e.key === 'Escape') { closeMenu(); return; }
  if (e.key === 'Tab') {
    // ciclar entre primer y último elemento enfocable
  }
}
```

---

## 🎨 Sistema de Diseño (CSS Custom Properties)

```css
:root {
  /* Paleta */
  --primary-color:    #3b141c;   /* bordó oscuro — identidad de marca */
  --secondary-color:  #f3961c;   /* naranja cálido — acento principal */
  --light-pink-color: #faf4f5;   /* fondo secciones claras */
  --dark-color:       #252525;   /* fondo menú y footer */

  /* Tipografía escalada */
  --font-size-s:   0.9rem;
  --font-size-n:   1rem;
  --font-size-m:   1.12rem;
  --font-size-l:   1.5rem;
  --font-size-xl:  2em;
  --font-size-xxl: 2.3rem;

  /* Layout */
  --site-max-width: 1300px;
}
```

---

## 📐 Responsive Design

El sitio tiene **tres breakpoints** bien definidos:

| Breakpoint | Cambios principales |
|---|---|
| `≤ 1024px` | Ajuste de padding en navbar, desactiva parallax en location |
| `≤ 900px` | Menú mobile activado, hero en columna, grilla de menú 2 columnas |
| `≤ 640px` | Grilla de menú 1 columna, galería en columna, footer apilado |

---

## 📂 Estructura del proyecto

```
panaderia-san-cayetano/
│
├── index.html              # Estructura principal del sitio
├── style.css               # Estilos globales y responsive
├── fonts.css               # @font-face y clases de Font Awesome (self-hosted)
├── scripts.js              # Lógica del menú mobile + Swiper + validación form
├── send.php                # Endpoint PHP para envío del formulario de contacto
├── .htaccess               # Cache, GZIP y Brotli para Apache
│
├── images/                 # Assets de imagen optimizados
│   ├── *.jpg / *.png       # Versiones full y responsive (-small, -medium, -xs)
│   ├── *.webp / *.avif     # Formatos modernos para mejor compresión
│   └── San-Cayetano.ico    # Favicon
│
├── fonts/
│   └── fonts-woff2/        # Poppins (Regular, Medium, SemiBold, Bold, Italic) + Miniver
│
├── font-awesome/
│   └── webfonts/           # fa-brands-400, fa-regular-400, fa-solid-900 (.woff2)
│
└── swiper/
    ├── swiper-bundle.min.css
    └── swiper-bundle.min.js
```

---

## 🚀 Próximas funcionalidades (roadmap)

Este proyecto está en expansión activa hacia una aplicación web completa:

- [ ] **Sistema de pedidos anticipados** — los clientes eligen productos, cantidad y horario de retiro
- [ ] **Panel de administración** — el local gestiona capacidad de producción diaria por producto
- [ ] **Notificaciones por WhatsApp** — integración con Twilio o WhatsApp Business API
- [ ] **Mapa de calor de demanda** — análisis de productos más pedidos por día y estación
- [ ] **Reseñas reales** — integración con Google Places API para mostrar reseñas auténticas

**Stack planificado para la v2:**

```
Frontend:  React + Vite + Tailwind CSS
Backend:   FastAPI (Python)
Base de datos: PostgreSQL
Auth:      JWT
Deploy:    Vercel (frontend) + Railway (backend)
```

---

## 👤 Autor

**Juan Ignacio Atencio**
Estudiante de Ingeniería en Sistemas de Información — UTN FRLP

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/juann-ign)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/juan-atencio)

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos y profesionales para un cliente real.
© 2025 Panadería San Cayetano. Todos los derechos reservados.