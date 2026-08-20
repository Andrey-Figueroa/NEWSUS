/* ============================================================
   SUS AMIGOS — NAVBAR SCRIPT
   Comportamiento: scroll state, dropdown, menú móvil, idioma
   ============================================================ */

(function () {
    'use strict';


    /* ── Elementos ────────────────────────────────────────── */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileClose = document.getElementById('mobile-close');
    const serviciosBtn = document.getElementById('servicios-btn');
    const dropdownItem = document.querySelector('.nav-item--dropdown');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-sublink, .mobile-cta');

    /* ── 1. Scroll → clase .navbar--scrolled ─────────────── */
    const SCROLL_THRESHOLD = 90;

    function onScroll() {
        const scrolled = window.scrollY > SCROLL_THRESHOLD;
        navbar.classList.toggle('navbar--scrolled', scrolled);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

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

    if (hamburger) hamburger.addEventListener('click', openMobileMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('is-open')) closeMobileMenu();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
            closeMobileMenu();
        }
    });

    /* ── 4. Language Switcher ─────────────────────────────── */
    const langSwitcher = document.getElementById('lang-switcher');
    const langBtn = document.getElementById('lang-btn');
    const langFlag = document.getElementById('lang-flag');
    const langName = document.getElementById('lang-name');
    const langOptions = document.querySelectorAll('.lang-option');

    const LANGS = {
        es: { flag: '🇨🇷', name: 'Español' },
        en: { flag: '🇺🇸', name: 'English' }
    };

    function toggleLangDropdown() {
        const isOpen = langSwitcher.classList.toggle('open');
        langBtn.setAttribute('aria-expanded', String(isOpen));
    }

    function closeLangDropdown() {
        if (langSwitcher) langSwitcher.classList.remove('open');
        if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
    }

    function applyLanguage(lang) {
        if (!LANGS[lang]) lang = 'es';
        document.documentElement.lang = lang;

        // Actualizar botón
        if (langFlag) langFlag.textContent = LANGS[lang].flag;
        if (langName) langName.textContent = LANGS[lang].name;

        // Marcar opción activa
        langOptions.forEach(opt => {
            opt.classList.toggle('lang-option--active', opt.dataset.lang === lang);
        });

        // Actualizar título de la página
        document.title = lang === 'en' 
            ? 'Sus Amigos – Premium Automotive Center' 
            : 'Sus Amigos – Centro Automotriz Premium';

        // Traducir todos los elementos con data-es / data-en
        document.querySelectorAll('[data-es], [data-en]').forEach(el => {
            const content = el.getAttribute('data-' + lang);
            if (content !== null) {
                if (content.includes('<') && content.includes('>')) {
                    el.innerHTML = content;
                } else {
                    el.textContent = content;
                }
            }
        });

        // Actualizar palabras del rotador
        const rotatorList = document.getElementById('rotator-list');
        if (rotatorList) {
            const items = rotatorList.querySelectorAll('li');
            items.forEach(li => {
                const text = li.getAttribute('data-' + lang);
                if (text) li.textContent = text;
            });
            if (items.length > 8) {
                const first = items[0];
                const clone = items[items.length - 1];
                if (first && clone) {
                    clone.textContent = first.textContent;
                }
            }
        }

        // Actualizar textos de botones de audio en carrusel
        document.querySelectorAll('.btn-escuchar').forEach(btn => {
            const video = btn.previousElementSibling;
            const isMuted = video ? video.muted : true;
            const textSpan = btn.querySelector('.btn-sound-text');
            if (textSpan) {
                textSpan.textContent = isMuted 
                    ? (lang === 'en' ? 'Listen' : 'Escuchar') 
                    : (lang === 'en' ? 'Mute' : 'Silenciar');
            }
        });

        // Actualizar marcador de horario
        if (typeof updateScheduleStatus === 'function') {
            updateScheduleStatus();
        }

        // Actualizar modal de citas si ya está creado en el DOM
        const appointmentModalTitle = document.querySelector('.appointment-modal h2');
        if (appointmentModalTitle) {
            appointmentModalTitle.textContent = lang === 'en' ? 'Choose your appointment type' : 'Elige tu tipo de cita';
            const cards = document.querySelectorAll('.appointment-card');
            if (cards.length >= 3) {
                cards[0].querySelector('.appointment-card-title').textContent = 'Detailing';
                cards[0].querySelector('.appointment-card-desc').textContent = lang === 'en' 
                    ? 'Get a live quote for all services and send your request to our WhatsApp...' 
                    : 'Cotiza en vivo todos los servicios y envianos tu cotizacion a nuestro whatssapp ....';

                cards[1].querySelector('.appointment-card-title').textContent = lang === 'en' ? 'Mobile Service' : 'A Domicilio';
                cards[1].querySelector('.appointment-card-desc').textContent = lang === 'en'
                    ? 'Send us your preferred date/time and book your mobile service'
                    : 'Envianos tu fecha/hora que deseas y agenda tu servicio a domicilio';

                cards[2].querySelector('.appointment-card-title').textContent = lang === 'en' ? 'Mechanics' : 'Mecánica';
                cards[2].querySelector('.appointment-card-desc').textContent = lang === 'en'
                    ? 'Book your appointment at our branch for any vehicle needs'
                    : 'Agenda tu cita en nuestra sucursal para las necesidades que tengas';
            }
        }

        localStorage.setItem('susamigos-lang', lang);
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
        closeLangDropdown();
    }

    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLangDropdown();
        });
    }

    langOptions.forEach(opt => {
        opt.addEventListener('click', () => applyLanguage(opt.dataset.lang));
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (langSwitcher && !langSwitcher.contains(e.target)) {
            closeLangDropdown();
        }
    });

    // Restaurar idioma guardado
    const savedLang = localStorage.getItem('susamigos-lang');
    if (savedLang && LANGS[savedLang] && savedLang !== 'es') {
        applyLanguage(savedLang);
    }

    /* ── Rotator ─────────────────────────────────────────── */
    const rotatorList = document.getElementById('rotator-list');
    if (rotatorList) {
        const items = rotatorList.querySelectorAll('li');
        const itemCount = items.length;
        
        // Clonamos la primera palabra al final para un bucle suave
        const firstClone = items[0].cloneNode(true);
        rotatorList.appendChild(firstClone);
        
        let currentIndex = 0;

        setInterval(() => {
            const itemHeight = items[0].clientHeight;
            currentIndex++;
            
            // Animamos normalmente hacia la siguiente palabra
            rotatorList.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
            rotatorList.style.transform = `translateY(-${currentIndex * itemHeight}px)`;
            
            // Si acabamos de animar hacia el clon, reseteamos silenciosamente a la posición 0 real
            if (currentIndex === itemCount) {
                setTimeout(() => {
                    rotatorList.style.transition = 'none';
                    currentIndex = 0;
                    rotatorList.style.transform = `translateY(0px)`;
                }, 600); // 600ms coincide con la duración de la transición
            }
        }, 2500);
    }

    /* ── Bubble Cursor ───────────────────────────────────────── */
    const canvas = document.getElementById('bubble-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let bubbles = [];
        let lastSpawnTime = 0;
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const spawnBubble = (x, y) => {
            const isGold = Math.random() < 0.15;
            const maxLife = Math.random() * 800 + 1200;
            const distance = Math.random() * 60 + 40;
            bubbles.push({
                x, y,
                startX: x,
                size: (Math.random() * 10 + 4) / 2,
                color: isGold ? '212, 175, 55' : '220, 240, 255',
                baseOpacity: Math.random() * 0.3 + 0.3,
                vy: -distance / maxLife,
                wobbleSpeed: Math.random() * 0.005 + 0.002,
                wobbleWidth: Math.random() * 10 + 5,
                life: 0,
                maxLife
            });
        };

        const onPointerMove = (e) => {
            const now = performance.now();
            if (now - lastSpawnTime > 25) {
                const x = e.clientX || (e.touches && e.touches[0].clientX);
                const y = e.clientY || (e.touches && e.touches[0].clientY);
                if (x !== undefined && y !== undefined) {
                    spawnBubble(x, y);
                    lastSpawnTime = now;
                }
            }
        };

        let lastTime = 0;
        const render = (time) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = bubbles.length - 1; i >= 0; i--) {
                const b = bubbles[i];
                b.life += deltaTime;

                if (b.life >= b.maxLife) {
                    bubbles.splice(i, 1);
                    continue;
                }

                const lifeRatio = b.life / b.maxLife;
                b.y += b.vy * deltaTime;
                b.x = b.startX + Math.sin(b.life * b.wobbleSpeed) * b.wobbleWidth;

                const currentOpacity = b.baseOpacity * (1 - lifeRatio);

                ctx.beginPath();
                ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${b.color}, ${currentOpacity})`;
                ctx.fill();

                ctx.strokeStyle = `rgba(${b.color}, ${currentOpacity * 1.5})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();

                const highlightRadius = b.size * 0.25;
                const highlightX = b.x - b.size * 0.3;
                const highlightY = b.y - b.size * 0.3;
                
                ctx.beginPath();
                ctx.arc(highlightX, highlightY, highlightRadius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 1.2})`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        const heroSection = document.getElementById('inicio');
        if (heroSection) {
            heroSection.addEventListener('mousemove', onPointerMove);
            heroSection.addEventListener('touchmove', onPointerMove, { passive: true });
        }

        lastTime = performance.now();
        render(lastTime);
    }

    /* ── Función global de Audio de Video ────────────────────── */
    window.toggleVideoSound = function(btn) {
        const video = btn.previousElementSibling;
        if (!video) return;
        video.muted = !video.muted;
        const isMuted = video.muted;
        const lang = document.documentElement.lang || 'es';
        const textSpan = btn.querySelector('.btn-sound-text');
        const iconSpan = btn.querySelector('.icon');
        if (iconSpan) {
            iconSpan.textContent = isMuted ? '🔊' : '🔇';
        }
        if (textSpan) {
            textSpan.textContent = isMuted 
                ? (lang === 'en' ? 'Listen' : 'Escuchar') 
                : (lang === 'en' ? 'Mute' : 'Silenciar');
        }
    };

    /* ── Carrusel 3D de Servicios ────────────────────────────── */
    const carouselTrack = document.getElementById('carousel-track');
    if (carouselTrack) {
        const cards = Array.from(carouselTrack.querySelectorAll('.card'));
        const nextBtn = document.getElementById('carousel-next');
        const prevBtn = document.getElementById('carousel-prev');
        const dotsContainer = document.getElementById('carousel-dots');
        
        let currentCarouselIndex = 2; // Iniciar en el medio (índice 2 de 5)
        const totalCards = cards.length;

        // Crear Dots
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentCarouselIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentCarouselIndex = index;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

        function updateCarousel() {
            const lang = document.documentElement.lang || 'es';
            // Silenciar todos los videos del carrusel al cambiar de lámina
            document.querySelectorAll('.carousel-video').forEach(v => {
                v.muted = true;
                const btn = v.nextElementSibling;
                if (btn && btn.classList.contains('btn-escuchar')) {
                    const textSpan = btn.querySelector('.btn-sound-text');
                    const iconSpan = btn.querySelector('.icon');
                    if (iconSpan) iconSpan.textContent = '🔊';
                    if (textSpan) textSpan.textContent = lang === 'en' ? 'Listen' : 'Escuchar';
                }
            });

            cards.forEach((card, i) => {
                card.classList.remove('active', 'prev', 'next', 'prev-far', 'next-far', 'hidden');
                
                let dist = i - currentCarouselIndex;
                if (dist > 2) dist -= totalCards;
                if (dist < -2) dist += totalCards;
                
                const video = card.querySelector('.carousel-video');
                if (dist === 0) {
                    card.classList.add('active');
                    if (video) {
                        video.play().catch(() => {});
                    }
                } else {
                    if (video && !video.paused) {
                        video.pause();
                    }
                    if (dist === -1) {
                        card.classList.add('prev');
                    } else if (dist === 1) {
                        card.classList.add('next');
                    } else if (dist === -2) {
                        card.classList.add('prev-far');
                    } else if (dist === 2) {
                        card.classList.add('next-far');
                    }
                }
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentCarouselIndex);
            });
        }

        // Navegación por flechas (Bucle Infinito)
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentCarouselIndex = (currentCarouselIndex - 1 + totalCards) % totalCards;
                updateCarousel();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentCarouselIndex = (currentCarouselIndex + 1) % totalCards;
                updateCarousel();
            });
        }

        // Lógica de Drag / Touch (Swipe)
        let isDraggingCarousel = false;
        let startXCarousel = 0;
        let diffXCarousel = 0;
        const dragThreshold = 50;

        const dragStart = (e) => {
            if (e.target.closest('.btn-escuchar')) return;
            isDraggingCarousel = true;
            startXCarousel = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            // Prevenir el drag por defecto de imágenes
            if(e.target.tagName.toLowerCase() === 'img') {
                e.preventDefault();
            }
        };

        const dragMove = (e) => {
            if (!isDraggingCarousel) return;
            const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            diffXCarousel = currentX - startXCarousel;
        };

        const dragEnd = () => {
            if (!isDraggingCarousel) return;
            isDraggingCarousel = false;
            
            if (diffXCarousel > dragThreshold) {
                // Swipe a la derecha -> anterior
                currentCarouselIndex = (currentCarouselIndex - 1 + totalCards) % totalCards;
            } else if (diffXCarousel < -dragThreshold) {
                // Swipe a la izquierda -> siguiente
                currentCarouselIndex = (currentCarouselIndex + 1) % totalCards;
            }
            diffXCarousel = 0;
            updateCarousel();
        };

        // Mouse Events
        carouselTrack.addEventListener('mousedown', dragStart);
        window.addEventListener('mousemove', dragMove);
        window.addEventListener('mouseup', dragEnd);
        
        // Touch Events
        carouselTrack.addEventListener('touchstart', dragStart, { passive: true });
        carouselTrack.addEventListener('touchmove', dragMove, { passive: true });
        carouselTrack.addEventListener('touchend', dragEnd);

        // Bloquear arrastre nativo en imágenes
        cards.forEach(card => {
            const img = card.querySelector('img');
            if (img) img.addEventListener('dragstart', e => e.preventDefault());
        });

        // Inicializar
        updateCarousel();
    }


    /* ── 6. Navegación Global (data-target / data-page) ────────────── */
    document.addEventListener('click', function(e) {
        const link = e.target.closest('[data-target], [data-page]');
        if (!link) return;
        
        e.preventDefault();
        
        const path = window.location.pathname;
        let depthPrefix = '';
        if (path.includes('/servicios/')) {
            depthPrefix = '../../';
        } else if (path.includes('/main/')) {
            depthPrefix = '../';
        }

        if (link.hasAttribute('data-target')) {
            const targetId = link.getAttribute('data-target');

            if (targetId === 'contacto' && (link.classList.contains('nav-cta') || link.classList.contains('mobile-cta') || link.classList.contains('btn-pill'))) {
                openAppointmentModal(depthPrefix);
                return;
            }

            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                if (mobileMenu && mobileMenu.classList.contains('is-open')) {
                    closeMobileMenu();
                }
            } else {
                window.location.href = depthPrefix + 'main/index.html#' + targetId;
            }
        } else if (link.hasAttribute('data-page')) {
            const page = link.getAttribute('data-page');
            window.location.href = depthPrefix + 'servicios/' + page + '/index.html';
        }
    });

    function openAppointmentModal(depthPrefix) {
        const lang = document.documentElement.lang || 'es';
        let modalOverlay = document.getElementById('appointment-overlay');
        if (!modalOverlay) {
            modalOverlay = document.createElement('div');
            modalOverlay.id = 'appointment-overlay';
            modalOverlay.className = 'appointment-overlay';
            modalOverlay.innerHTML = `
                <div class="appointment-modal">
                    <button class="appointment-close" id="appointment-close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <h2>${lang === 'en' ? 'Choose your appointment type' : 'Elige tu tipo de cita'}</h2>
                    <div class="appointment-options">
                        <a href="${depthPrefix}servicios/detailing/index.html" class="appointment-card">
                            <div class="appointment-card-bg" style="background-image: url('${depthPrefix}images/botones/detailing.webp')"></div>
                            <div class="appointment-card-content">
                                <div class="appointment-card-title">Detailing</div>
                                <div class="appointment-card-desc">${lang === 'en' ? 'Get a live quote for all services and send your request to our WhatsApp...' : 'Cotiza en vivo todos los servicios y envianos tu cotizacion a nuestro whatssapp ....'}</div>
                            </div>
                        </a>
                        <a href="${depthPrefix}servicios/domicilio/index.html" class="appointment-card">
                            <div class="appointment-card-bg" style="background-image: url('${depthPrefix}images/botones/domicilio.webp')"></div>
                            <div class="appointment-card-content">
                                <div class="appointment-card-title">${lang === 'en' ? 'Mobile Service' : 'A Domicilio'}</div>
                                <div class="appointment-card-desc">${lang === 'en' ? 'Send us your preferred date/time and book your mobile service' : 'Envianos tu fecha/hora que deseas y agenda tu servicio a domicilio'}</div>
                            </div>
                        </a>
                        <a href="${depthPrefix}servicios/mecanica/index.html" class="appointment-card">
                            <div class="appointment-card-bg" style="background-image: url('${depthPrefix}images/botones/mecanica.webp')"></div>
                            <div class="appointment-card-content">
                                <div class="appointment-card-title">${lang === 'en' ? 'Mechanics' : 'Mecánica'}</div>
                                <div class="appointment-card-desc">${lang === 'en' ? 'Book your appointment at our branch for any vehicle needs' : 'Agenda tu cita en nuestra sucursal para las necesidades que tengas'}</div>
                            </div>
                        </a>
                    </div>
                </div>
            `;
            document.body.appendChild(modalOverlay);

            document.getElementById('appointment-close').addEventListener('click', () => {
                modalOverlay.classList.remove('is-open');
            });
            modalOverlay.addEventListener('click', (e) => {
                if(e.target === modalOverlay) modalOverlay.classList.remove('is-open');
            });
        }
        
        if (mobileMenu && mobileMenu.classList.contains('is-open')) {
            closeMobileMenu();
        }

        modalOverlay.classList.add('is-open');
    }

    /* ── 7. Lógica del Horario (Costa Rica UTC-6) ────────────── */
    function updateScheduleStatus() {
        const textElement = document.getElementById('scoreboard-text');
        const timeElement = document.getElementById('scoreboard-time');
        if (!textElement || !timeElement) return;
        
        const lang = document.documentElement.lang || 'es';
        
        // Obtener hora actual en Costa Rica
        let crTimeString = new Date().toLocaleString("en-US", {timeZone: "America/Costa_Rica"});
        let crTime = new Date(crTimeString);
        
        let day = crTime.getDay(); // 0 = Domingo, 1 = Lunes ... 6 = Sábado
        let hour = crTime.getHours();
        
        let isOpen = false;
        let nextEvent = null; 
        
        // Abierto de Lunes(1) a Sábado(6), de 7:00 a 16:59
        if (day >= 1 && day <= 6 && hour >= 7 && hour < 17) {
            isOpen = true;
            nextEvent = new Date(crTime.getFullYear(), crTime.getMonth(), crTime.getDate(), 17, 0, 0);
        } else {
            isOpen = false;
            nextEvent = new Date(crTime.getFullYear(), crTime.getMonth(), crTime.getDate(), 7, 0, 0);
            
            if (day === 0) {
                nextEvent.setDate(nextEvent.getDate() + 1);
            } else if (hour >= 17) {
                nextEvent.setDate(nextEvent.getDate() + 1);
                if (day === 6) {
                    nextEvent.setDate(nextEvent.getDate() + 1);
                }
            }
        }
        
        let diffMs = nextEvent - crTime;
        let diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        let diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        let diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
        
        let pad = num => num.toString().padStart(2, '0');
        let timeStr = `${pad(diffHrs)}:${pad(diffMins)}:${pad(diffSecs)}`;
        
        timeElement.textContent = timeStr;
        
        if (isOpen) {
            textElement.textContent = lang === 'en' ? "CLOSING IN" : "CERRAMOS EN";
            timeElement.className = "scoreboard-time green-led";
        } else {
            textElement.textContent = lang === 'en' ? "OPENING IN" : "ABRIMOS EN";
            timeElement.className = "scoreboard-time red-led";
        }
    }
    
    if (document.getElementById('scoreboard-text')) {
        setInterval(updateScheduleStatus, 1000);
        updateScheduleStatus();
    }

    /* ── 7. Carga bajo demanda de Google Maps (IntersectionObserver) ── */
    const lazyMaps = document.querySelectorAll('.lazy-map');
    if (lazyMaps.length > 0) {
        if ('IntersectionObserver' in window) {
            const mapObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const iframe = entry.target;
                        if (iframe.dataset.src) {
                            iframe.src = iframe.dataset.src;
                            iframe.removeAttribute('data-src');
                        }
                        observer.unobserve(iframe);
                    }
                });
            }, { rootMargin: '250px 0px' });

            lazyMaps.forEach(map => mapObserver.observe(map));
        } else {
            lazyMaps.forEach(map => {
                if (map.dataset.src) {
                    map.src = map.dataset.src;
                }
            });
        }
    }

})();
