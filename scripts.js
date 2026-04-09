// --- Selectores ---
const nav = document.getElementById("site-nav");
const menuOpenButton = document.getElementById("open_navbar-button");
const menuCloseButton = document.getElementById("close_navbar-button");
const navLinks = document.querySelectorAll("#site-nav .nav-link")
const $form = document.querySelector('#form');

// --- UTIL para focusable elements ---
const FOCUSABLE_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
let focusableInNav = [];
let handleKeyDownRef = null;

// --- FUNCIONES ---
function updateAriaOnOpen(isOpen) {
    menuOpenButton.setAttribute('aria-expanded', String(isOpen));
    menuOpenButton.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    nav.setAttribute('aria-hidden', String(!isOpen));
}

function computeFocusableInNav() {
    focusableInNav = Array.from(nav.querySelectorAll(FOCUSABLE_SELECTORS))
    // sólo elementos realmente visibles (evita elementos escondidos por CSS)
    .filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el.getAttribute('aria-hidden') === 'false');
}

function trapFocus(e) {
    if (!document.body.classList.contains('show-mobile-menu')) return;
    if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
    return;
    }
    if (e.key === 'Tab') {
        computeFocusableInNav();
    if (focusableInNav.length === 0) return;

    const first = focusableInNav[0];
    const last = focusableInNav[focusableInNav.length - 1];

    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
    }
}

function openMenu() {
    document.body.classList.add('show-mobile-menu');
    updateAriaOnOpen(true);

    computeFocusableInNav();
    // foco inicial dentro del menú: close button si existe, si no el primer link
    if (menuCloseButton) menuCloseButton.focus();
    else if (focusableInNav.length) focusableInNav[0].focus();

    // agregar listener de teclado para Escape y trap tab
    handleKeyDownRef = trapFocus;
    document.addEventListener('keydown', handleKeyDownRef);
}

function closeMenu() {
    document.body.classList.remove('show-mobile-menu');
    updateAriaOnOpen(false);

    // devolver foco al open button
    menuOpenButton.focus();

    // remover listener
    if (handleKeyDownRef) {
    document.removeEventListener('keydown', handleKeyDownRef);
    handleKeyDownRef = null;
    }
}

// Un toggle simple que usa las funciones anteriores
function toggleMenu() {
    const expanded = menuOpenButton.getAttribute('aria-expanded') === 'true';
    if (expanded) closeMenu();
    else openMenu();
}

// --- EVENTOS ---
menuOpenButton.addEventListener('click', toggleMenu);
menuCloseButton.addEventListener('click', closeMenu);

// Cerrar menú al clickear un link (móvil)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
    // si el menú está abierto cerrarlo
    if (menuOpenButton.getAttribute('aria-expanded') === 'true') closeMenu();
    });
});


// Initialize Swiper
const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 25,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    },

    a11y: { enabled: true },
});


document.getElementById('form').addEventListener('submit', function(e) {
    const email = this.email.value;
    if (!email.includes('@')) {
        e.preventDefault();
        alert('Por favor, ingresá un correo válido.');
    }
});