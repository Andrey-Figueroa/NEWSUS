document.addEventListener('DOMContentLoaded', () => {

    const MECANICA_DATA = {
        llantas: {
            title: "Llantas",
            icon: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2"/></svg>',
            services: [
                { id: "ll1", name: "Rotación de llantas", desc: "Mantenimiento preventivo" },
                { id: "ll2", name: "Alineación", desc: "Ajuste de ángulos de dirección" },
                { id: "ll3", name: "Balanceo", desc: "Distribución de peso uniforme" },
                { id: "ll4", name: "Cambio de llantas", desc: "Montaje de llantas nuevas" },
                { id: "ll5", name: "Reparación de pinchazos", desc: "Parche seguro" },
                { id: "ll6", name: "Cambio de válvulas", desc: "Prevención de fugas" },
                { id: "ll7", name: "Otro", desc: "Especificar al asesor" }
            ]
        },
        frenos: {
            title: "Sistema de frenos",
            icon: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22A10 10 0 1 0 12 2a10 10 0 0 0 0 20z"/><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/><path d="M9 12h6"/></svg>',
            services: [
                { id: "fr1", name: "Cambio de pastillas", desc: "Fricción segura" },
                { id: "fr2", name: "Cambio de discos", desc: "Superficie de frenado nueva" },
                { id: "fr3", name: "Purga de líquido de frenos", desc: "Sistema sin aire" },
                { id: "fr4", name: "Revisión de freno de mano", desc: "Ajuste de tensión" },
                { id: "fr5", name: "Otro", desc: "Especificar al asesor" }
            ]
        },
        lubricacion: {
            title: "Lubricación y Fluidos",
            icon: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.5l-4.5 7.5a6.5 6.5 0 1 0 9 0z"/></svg>',
            services: [
                { id: "lu1", name: "Cambio de aceite de motor", desc: "Protección interna" },
                { id: "lu2", name: "Cambio de filtro de aceite", desc: "Flujo limpio" },
                { id: "lu3", name: "Cambio de aceite de transmisión", desc: "Cambios suaves" },
                { id: "lu4", name: "Cambio de líquido refrigerante", desc: "Control de temperatura" },
                { id: "lu5", name: "Cambio de líquido de dirección", desc: "Maniobrabilidad ligera" },
                { id: "lu6", name: "Otro", desc: "Especificar al asesor" }
            ]
        },
        motor: {
            title: "Motor",
            icon: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14l2-2h2m12 2l-2-2h-2M12 4v2m0 12v2M8 8h8v8H8z"/></svg>',
            services: [
                { id: "mo1", name: "Diagnóstico computarizado", desc: "Escaneo de errores" },
                { id: "mo2", name: "Cambio de bujías", desc: "Chispa óptima" },
                { id: "mo3", name: "Cambio de filtro de aire", desc: "Respiración limpia" },
                { id: "mo4", name: "Limpieza de inyectores", desc: "Consumo eficiente" },
                { id: "mo5", name: "Revisión de correa de distribución", desc: "Sincronización segura" },
                { id: "mo6", name: "Afinación completa", desc: "Rendimiento máximo" },
                { id: "mo7", name: "Otro", desc: "Especificar al asesor" }
            ]
        },
        electrico: {
            title: "Sistema Eléctrico",
            icon: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
            services: [
                { id: "el1", name: "Revisión/Cambio de batería", desc: "Energía confiable" },
                { id: "el2", name: "Revisión de alternador", desc: "Carga continua" },
                { id: "el3", name: "Cambio de luces/focos", desc: "Visibilidad nocturna" },
                { id: "el4", name: "Revisión sistema de arranque", desc: "Encendido seguro" },
                { id: "el5", name: "Otro", desc: "Especificar al asesor" }
            ]
        },
        ac: {
            title: "Aire Acondicionado",
            icon: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20m6-16a8 8 0 0 0-12 0m12 8a8 8 0 0 0-12 0"/></svg>',
            services: [
                { id: "ac1", name: "Recarga de aire acondicionado", desc: "Gas refrigerante" },
                { id: "ac2", name: "Limpieza de tubería", desc: "Eliminación de malos olores" },
                { id: "ac3", name: "Otro", desc: "Especificar al asesor" }
            ]
        },
        reparaciones: {
            title: "Reparaciones Generales",
            icon: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
            services: [
                { id: "rg1", name: "Revisión de ruidos extraños", desc: "Diagnóstico general (Ejemplo)" },
                { id: "rg2", name: "Reparación de suspensión", desc: "Amortiguadores y tijeretas (Ejemplo)" },
                { id: "rg3", name: "Otro", desc: "Especificar al asesor" }
            ]
        }
    };

    // === ELEMENTOS DOM ===
    const carouselTrack = document.getElementById('mecanica-carousel-track');
    const mecanicaExplorer = document.getElementById('mecanica-explorer');
    const mecanicaDetails = document.getElementById('mecanica-details');
    const btnBackCategories = document.getElementById('btn-back-categories');
    const detailsCategoryTitle = document.getElementById('details-category-title');
    const subservicesGrid = document.getElementById('subservices-grid');
    const btnAgendarCategory = document.getElementById('btn-agendar-category');
    const btnAgendarHero = document.getElementById('btn-agendar-hero');
    const btnFloatingAgendar = document.getElementById('btn-floating-agendar');
    const agendarCount = document.getElementById('agendar-count');
    const modalOverlay = document.getElementById('appointment-modal');
    const modalClose = document.getElementById('modal-close');
    const appointmentForm = document.getElementById('appointment-form');

    let currentCategoryKey = null;
    let selectedSubservices = new Set();
    let selectedDateStr = "";

    // === GENERAR CARRUSEL DE CATEGORÍAS (Bucle Infinito) ===
    function initCarousel() {
        if (!carouselTrack) return;
        carouselTrack.innerHTML = '';

        const allCardsData = [];

        // 1. Mantenimiento General
        allCardsData.push({
            title: "Mantenimiento General",
            icon: '<svg class="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
            action: () => openModal("Agendar Mantenimiento General", Array.from(selectedSubservices).concat(["Mantenimiento General"]))
        });

        // 2. Demás categorías
        for (const [key, catData] of Object.entries(MECANICA_DATA)) {
            allCardsData.push({
                title: catData.title,
                icon: catData.icon,
                action: () => openCategoryDetails(key)
            });
        }

        // 3. Promociones
        allCardsData.push({
            title: "Promociones",
            icon: '<svg class="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
            action: () => {
                window.location.href = '../promociones/index.html';
            }
        });

        // Renderizar tarjetas una sola vez (Manual)
        allCardsData.forEach(data => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <div class="category-icon">${data.icon}</div>
                <h4 class="category-title">${data.title}</h4>
            `;
            card.addEventListener('click', data.action);
            carouselTrack.appendChild(card);
        });
    }

    // === CONTROLES DEL CARRUSEL (Loop Infinito por Botones) ===
    const btnPrev = document.getElementById('mecanica-carousel-prev');
    const btnNext = document.getElementById('mecanica-carousel-next');
    let isAnimating = false;

    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => {
            const gap = parseFloat(getComputedStyle(carouselTrack).gap) || 0;
            const cardWidth = carouselTrack.firstElementChild.offsetWidth + gap;
            
            carouselTrack.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });

        btnNext.addEventListener('click', () => {
            const gap = parseFloat(getComputedStyle(carouselTrack).gap) || 0;
            const cardWidth = carouselTrack.firstElementChild.offsetWidth + gap;
            
            carouselTrack.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });
    }

    // === VISTA DE DETALLES DE CATEGORÍA ===
    function openCategoryDetails(catKey) {
        currentCategoryKey = catKey;
        const catData = MECANICA_DATA[catKey];
        if (!catData) return;

        detailsCategoryTitle.textContent = catData.title;
        subservicesGrid.innerHTML = '';
        
        // NO borramos selectedSubservices globales aquí

        catData.services.forEach(srv => {
            const card = document.createElement('div');
            card.className = 'subservice-card';
            
            // Si ya estaba seleccionado de antes, pintarlo de dorado
            if (selectedSubservices.has(srv.name)) {
                card.classList.add('selected');
            }

            card.innerHTML = `
                <div class="subservice-icon">${catData.icon}</div>
                <div class="subservice-info">
                    <span class="subservice-name">${srv.name}</span>
                    <span class="subservice-desc">${srv.desc}</span>
                </div>
            `;
            
            card.addEventListener('click', () => {
                card.classList.toggle('selected');
                if (card.classList.contains('selected')) {
                    selectedSubservices.add(srv.name);
                } else {
                    selectedSubservices.delete(srv.name);
                }
                updateAgendarButton();
            });

            subservicesGrid.appendChild(card);
        });

        mecanicaExplorer.style.display = 'none';
        mecanicaDetails.style.display = 'block';
    }

    function closeCategoryDetails() {
        mecanicaDetails.style.display = 'none';
        mecanicaExplorer.style.display = 'block';
    }

    if (btnBackCategories) {
        btnBackCategories.addEventListener('click', closeCategoryDetails);
    }

    function updateAgendarButton() {
        // Actualizar botón local
        if (btnAgendarCategory) {
            btnAgendarCategory.disabled = selectedSubservices.size === 0;
            if (selectedSubservices.size > 0) {
                btnAgendarCategory.textContent = `Agendar ${selectedSubservices.size} servicio(s)`;
            } else {
                btnAgendarCategory.textContent = `Agendar Servicios Seleccionados`;
            }
        }
        
        // Actualizar botón global flotante
        if (btnFloatingAgendar && agendarCount) {
            if (selectedSubservices.size > 0) {
                btnFloatingAgendar.style.display = 'flex';
                agendarCount.textContent = selectedSubservices.size;
            } else {
                btnFloatingAgendar.style.display = 'none';
            }
        }
    }

    if (btnAgendarCategory) {
        btnAgendarCategory.addEventListener('click', () => {
            openModal("Agendar Servicios", Array.from(selectedSubservices));
        });
    }

    if (btnFloatingAgendar) {
        btnFloatingAgendar.addEventListener('click', () => {
            openModal("Agendar Servicios", Array.from(selectedSubservices));
        });
    }

    // === SELECTOR DE FECHAS (Modal) ===
    function initDateSelector() {
        const container = document.getElementById('date-scroll-container');
        if (!container) return;
        
        container.innerHTML = '';
        const today = new Date();
        const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        
        let firstAvailableSet = false;

        for (let i = 0; i < 7; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            
            let dayNameStr = days[d.getDay()];
            if (i === 0) dayNameStr = "Hoy";
            else if (i === 1) dayNameStr = "Mañana";

            const dateNum = d.getDate();
            const monthStr = months[d.getMonth()];
            const isSunday = d.getDay() === 0;

            const card = document.createElement('div');
            card.className = 'day-card';
            
            if (isSunday) {
                card.classList.add('disabled');
                card.innerHTML = `
                    <span class="day-name">Cerrado</span>
                    <span class="day-date">${dateNum}</span>
                    <span class="day-month">${monthStr}</span>
                `;
            } else {
                card.innerHTML = `
                    <span class="day-name">${dayNameStr}</span>
                    <span class="day-date">${dateNum}</span>
                    <span class="day-month">${monthStr}</span>
                `;
                
                const fullDayName = days[d.getDay()];
                const fullStr = i === 0 || i === 1 ? `${dayNameStr} (${fullDayName} ${dateNum})` : `${fullDayName} ${dateNum}`;

                if (!firstAvailableSet) {
                    card.classList.add('active');
                    selectedDateStr = fullStr;
                    firstAvailableSet = true;
                }

                card.addEventListener('click', () => {
                    document.querySelectorAll('.day-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    selectedDateStr = fullStr;
                });
            }
            container.appendChild(card);
        }
    }

    // === LÓGICA DEL MODAL ===
    let currentModalServices = [];

    function openModal(titleText = "Agendar Mantenimiento General", servicesList = []) {
        const titleEl = document.getElementById('modal-title');
        if (titleEl) titleEl.textContent = titleText;
        currentModalServices = servicesList;
        
        if (modalOverlay) {
            modalOverlay.classList.add('active');
        }
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    }

    if (btnAgendarHero) {
        btnAgendarHero.addEventListener('click', () => openModal("Agendar Mantenimiento General", ["Mantenimiento General (Servicio Estrella)"]));
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Cerrar al clickear fuera del modal
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // === ENVÍO DE FORMULARIO WPP ===
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('client-name').value.trim();
            const vehicle = document.getElementById('client-vehicle').value.trim();
            const year = document.getElementById('client-year').value.trim();
            const timeEl = document.querySelector('input[name="client_time"]:checked');
            
            if (!timeEl) {
                alert('Por favor selecciona un bloque de hora.');
                return;
            }
            const timeStr = timeEl.value;

            // Formatear mensaje WPP
            let textMsj = 'Hola, me gustaría agendar una cita de MECÁNICA con la siguiente información:%0A%0A';
            textMsj += '*DATOS DEL CLIENTE:*%0A';
            textMsj += `- Nombre: ${name}%0A`;
            textMsj += `- Vehículo: ${vehicle}%0A`;
            textMsj += `- Año: ${year}%0A`;
            textMsj += `- Fecha agendada: ${selectedDateStr}%0A`;
            textMsj += `- Hora agendada: ${timeStr}%0A%0A`;
            
            textMsj += '*SERVICIOS SOLICITADOS:*%0A';
            if (currentModalServices.length > 0) {
                currentModalServices.forEach(s => {
                    textMsj += `- ${s}%0A`;
                });
            } else {
                textMsj += `- Mantenimiento General (Servicio Estrella)%0A`;
            }
            
            textMsj += `%0A¡Quedo atento(a)!`;

            // Redirigir a WPP
            window.open(`https://wa.me/50670491753?text=${textMsj}`, '_blank');
            closeModal();
        });
    }

    // === INICIALIZACIÓN ===
    initCarousel();
    initDateSelector();
});
