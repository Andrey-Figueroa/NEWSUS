/* ============================================================
   SUS AMIGOS — NAVBAR SCRIPT
   Comportamiento: scroll state, dropdown, menú móvil
   ============================================================ */

(function () {
    'use strict';

    /* ── Elementos ────────────────────────────────────────── */
    const navbar        = document.getElementById('navbar');
    const hamburger     = document.getElementById('hamburger');
    const mobileMenu    = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileClose   = document.getElementById('mobile-close');
    const serviciosBtn  = document.getElementById('servicios-btn');
    const dropdownItem  = document.querySelector('.nav-item--dropdown');
    const mobileLinks   = document.querySelectorAll('.mobile-link, .mobile-sublink, .mobile-cta');

    /* ── 1. Scroll → clase .navbar--scrolled ─────────────── */
    const SCROLL_THRESHOLD = 90;

    function onScroll() {
        const scrolled = window.scrollY > SCROLL_THRESHOLD;
        navbar.classList.toggle('navbar--scrolled', scrolled);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Estado inicial

    /* ── 2. Dropdown de Servicios (hover + foco) ──────────── */
    let dropdownTimeout;

    function openDropdown() {
        clearTimeout(dropdownTimeout);
        dropdownItem.classList.add('is-open');
        serviciosBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
        dropdownTimeout = setTimeout(() => {
            dropdownItem.classList.remove('is-open');
            serviciosBtn.setAttribute('aria-expanded', 'false');
        }, 120);
    }

    if (dropdownItem) {
        dropdownItem.addEventListener('mouseenter', openDropdown);
        dropdownItem.addEventListener('mouseleave', closeDropdown);

        // Accesibilidad: tecla Escape cierra el dropdown
        dropdownItem.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeDropdown();
        });
    }

    /* ── 3. Menú Móvil ────────────────────────────────────── */
    function openMobileMenu() {
        mobileMenu.classList.add('is-open');
        mobileOverlay.classList.add('is-open');
        hamburger.classList.add('is-open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        mobileClose.focus();
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('is-open');
        mobileOverlay.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        hamburger.focus();
    }

    if (hamburger)     hamburger.addEventListener('click', openMobileMenu);
    if (mobileClose)   mobileClose.addEventListener('click', closeMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

    // Cerrar menú móvil al hacer clic en un enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('is-open')) closeMobileMenu();
        });
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
            closeMobileMenu();
        }
    });

})();
