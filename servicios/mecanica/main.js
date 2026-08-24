document.addEventListener('DOMContentLoaded', () => {

    // === BASE DE DATOS DE SERVICIOS POR CATEGORÍA CON TRADUCCIÓN BILINGÜE ===
    const MECANICA_SERVICES = [
        // === 1. LLANTAS ===
        {
            id: "ll-1",
            category: "llantas",
            categoryLabel: "Llantas",
            categoryLabel_en: "Tires",
            name: "Rotación de Llantas",
            name_en: "Tire Rotation",
            desc: "Se cambian las llantas de posición entre sí (delanteras-traseras) para lograr un desgaste más uniforme.",
            desc_en: "Tires are rotated between front and rear positions to achieve more even tread wear.",
            badge: "Llantas",
            badge_en: "Tires",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>`
        },
        {
            id: "ll-2",
            category: "llantas",
            categoryLabel: "Llantas",
            categoryLabel_en: "Tires",
            name: "Alineación",
            name_en: "Wheel Alignment",
            desc: "Se ajustan los ángulos de las llantas para que estén correctamente orientadas respecto a la carretera y entre sí.",
            desc_en: "Wheel angles are adjusted to ensure proper alignment with the road and with each other.",
            badge: "Llantas",
            badge_en: "Tires",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg>`
        },
        {
            id: "ll-3",
            category: "llantas",
            categoryLabel: "Llantas",
            categoryLabel_en: "Tires",
            name: "Balanceo",
            name_en: "Wheel Balancing",
            desc: "Se ajusta el peso distribuido en cada llanta para eliminar vibraciones al conducir.",
            desc_en: "Weight distribution on each wheel is calibrated to eliminate vibrations while driving.",
            badge: "Llantas",
            badge_en: "Tires",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2"/></svg>`
        },
        {
            id: "ll-4",
            category: "llantas",
            categoryLabel: "Llantas",
            categoryLabel_en: "Tires",
            name: "Cambio de Llantas",
            name_en: "Tire Replacement",
            desc: "Se retiran las llantas desgastadas o dañadas y se instalan llantas nuevas.",
            desc_en: "Worn or damaged tires are removed and new tires are professionally mounted.",
            badge: "Llantas",
            badge_en: "Tires",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3a9 9 0 0 1 9 9"/></svg>`
        },
        {
            id: "ll-5",
            category: "llantas",
            categoryLabel: "Llantas",
            categoryLabel_en: "Tires",
            name: "Reparación de Pinchazos",
            name_en: "Puncture Repair",
            desc: "Se sella o repara el punto de perforación de una llanta pinchada para restaurar su hermeticidad.",
            desc_en: "Punctured tire area is sealed and repaired to restore airtightness and safe driving.",
            badge: "Llantas",
            badge_en: "Tires",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
        },
        {
            id: "ll-6",
            category: "llantas",
            categoryLabel: "Llantas",
            categoryLabel_en: "Tires",
            name: "Cambio de Válvulas",
            name_en: "Valve Replacement",
            desc: "Se sustituye la válvula de aire de la llanta cuando presenta fugas o daño.",
            desc_en: "Tire air valve is replaced when leaks or damage are detected.",
            badge: "Llantas",
            badge_en: "Tires",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="18" rx="2"/><path d="M9 8h6M9 13h6"/></svg>`
        },

        // === 2. SISTEMA DE FRENOS ===
        {
            id: "fr-1",
            category: "frenos",
            categoryLabel: "Sistema de Frenos",
            categoryLabel_en: "Brake System",
            name: "Cambio de Pastilla",
            name_en: "Brake Pad Replacement",
            desc: "Se sustituyen las pastillas de freno desgastadas por unas nuevas para mantener la capacidad de frenado.",
            desc_en: "Worn brake pads are replaced with premium new ones to ensure maximum stopping power.",
            badge: "Frenos",
            badge_en: "Brakes",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M9 12h6"/></svg>`
        },
        {
            id: "fr-2",
            category: "frenos",
            categoryLabel: "Sistema de Frenos",
            categoryLabel_en: "Brake System",
            name: "Cambio de Discos",
            name_en: "Brake Rotor Replacement",
            desc: "Se reemplazan los discos de freno cuando están desgastados, deformados o dañados.",
            desc_en: "Brake rotors/discs are replaced when worn, warped, or scored.",
            badge: "Frenos",
            badge_en: "Brakes",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="7" r="1"/><circle cx="12" cy="17" r="1"/><circle cx="7" cy="12" r="1"/><circle cx="17" cy="12" r="1"/></svg>`
        },
        {
            id: "fr-3",
            category: "frenos",
            categoryLabel: "Sistema de Frenos",
            categoryLabel_en: "Brake System",
            name: "Purga de Líquido de Frenos",
            name_en: "Brake Fluid Bleed & Flush",
            desc: "Se extrae el aire y el líquido viejo del sistema de frenos y se reemplaza por líquido nuevo.",
            desc_en: "Air and degraded fluid are flushed from the brake lines and replaced with fresh fluid.",
            badge: "Frenos",
            badge_en: "Brakes",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.5l-4.5 7.5a6.5 6.5 0 1 0 9 0z"/></svg>`
        },
        {
            id: "fr-4",
            category: "frenos",
            categoryLabel: "Sistema de Frenos",
            categoryLabel_en: "Brake System",
            name: "Revisión de Freno de Mano",
            name_en: "Parking Brake Inspection",
            desc: "Se inspecciona y ajusta el mecanismo del freno de estacionamiento para asegurar su correcto funcionamiento.",
            desc_en: "Parking brake mechanism and tension cables are inspected and calibrated.",
            badge: "Frenos",
            badge_en: "Brakes",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01"/></svg>`
        },

        // === 3. LUBRICACIÓN Y FLUIDOS ===
        {
            id: "lu-1",
            category: "lubricacion",
            categoryLabel: "Lubricación y Fluidos",
            categoryLabel_en: "Lubrication & Fluids",
            name: "Cambio de Aceite de Motor",
            name_en: "Engine Oil Change",
            desc: "Se retira el aceite usado del motor y se sustituye por aceite nuevo para su correcta lubricación.",
            desc_en: "Used motor oil is drained and replaced with fresh high-grade oil for engine protection.",
            badge: "Lubricación",
            badge_en: "Lubrication",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.5l-4.5 7.5a6.5 6.5 0 1 0 9 0z"/></svg>`
        },
        {
            id: "lu-2",
            category: "lubricacion",
            categoryLabel: "Lubricación y Fluidos",
            categoryLabel_en: "Lubrication & Fluids",
            name: "Cambio de Filtro de Aceite",
            name_en: "Oil Filter Replacement",
            desc: "Se reemplaza el filtro que limpia el aceite del motor de impurezas.",
            desc_en: "Oil filter is replaced to keep the engine oil clean and free of abrasive particles.",
            badge: "Lubricación",
            badge_en: "Lubrication",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="4" width="14" height="16" rx="2"/><path d="M9 4v16M15 4v16M5 9h14M5 15h14"/></svg>`
        },
        {
            id: "lu-3",
            category: "lubricacion",
            categoryLabel: "Lubricación y Fluidos",
            categoryLabel_en: "Lubrication & Fluids",
            name: "Cambio de Aceite de Transmisión",
            name_en: "Transmission Fluid Change",
            desc: "Se sustituye el aceite de la caja de cambios para mantener su funcionamiento óptimo.",
            desc_en: "Transmission gearbox fluid is replaced to preserve smooth shifting and component life.",
            badge: "Lubricación",
            badge_en: "Lubrication",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/></svg>`
        },
        {
            id: "lu-4",
            category: "lubricacion",
            categoryLabel: "Lubricación y Fluidos",
            categoryLabel_en: "Lubrication & Fluids",
            name: "Cambio de Líquido Refrigerante",
            name_en: "Coolant / Antifreeze Flush",
            desc: "Se reemplaza el líquido encargado de regular la temperatura del motor.",
            desc_en: "Radiator coolant fluid is replaced to regulate engine operating temperature safely.",
            badge: "Lubricación",
            badge_en: "Lubrication",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>`
        },
        {
            id: "lu-5",
            category: "lubricacion",
            categoryLabel: "Lubricación y Fluidos",
            categoryLabel_en: "Lubrication & Fluids",
            name: "Cambio de Líquido de Dirección",
            name_en: "Power Steering Fluid Change",
            desc: "Se sustituye el fluido hidráulico que facilita el movimiento del volante.",
            desc_en: "Hydraulic power steering fluid is replaced for smooth, effortless steering response.",
            badge: "Lubricación",
            badge_en: "Lubrication",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 12l4-4m-8 8l4-4m-4 0h8"/></svg>`
        },

        // === 4. MOTOR ===
        {
            id: "mo-1",
            category: "motor",
            categoryLabel: "Motor",
            categoryLabel_en: "Engine",
            name: "Diagnóstico Computarizado",
            name_en: "Computerized Diagnostics",
            desc: "Se conecta un equipo de escaneo al vehículo para identificar fallas registradas en su sistema electrónico.",
            desc_en: "OBD-II scanner is connected to diagnose trouble codes and electronic sensor faults.",
            badge: "Motor",
            badge_en: "Engine",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
        },
        {
            id: "mo-2",
            category: "motor",
            categoryLabel: "Motor",
            categoryLabel_en: "Engine",
            name: "Cambio de Bujías",
            name_en: "Spark Plug Replacement",
            desc: "Se sustituyen las bujías encargadas de generar la chispa para la combustión del motor.",
            desc_en: "Spark plugs are replaced to maintain optimal combustion efficiency and fuel economy.",
            badge: "Motor",
            badge_en: "Engine",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`
        },
        {
            id: "mo-3",
            category: "motor",
            categoryLabel: "Motor",
            categoryLabel_en: "Engine",
            name: "Cambio de Filtro de Aire",
            name_en: "Engine Air Filter Replacement",
            desc: "Se reemplaza el filtro que impide el ingreso de partículas al motor.",
            desc_en: "Engine intake air filter is replaced to ensure clean airflow and throttle response.",
            badge: "Motor",
            badge_en: "Engine",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`
        },
        {
            id: "mo-4",
            category: "motor",
            categoryLabel: "Motor",
            categoryLabel_en: "Engine",
            name: "Limpieza de Inyectores",
            name_en: "Fuel Injector Cleaning",
            desc: "Se eliminan los residuos acumulados en los inyectores para mejorar la mezcla de combustible.",
            desc_en: "Fuel injectors are ultrasonically or chemically cleaned to restore crisp spray patterns.",
            badge: "Motor",
            badge_en: "Engine",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/></svg>`
        },
        {
            id: "mo-5",
            category: "motor",
            categoryLabel: "Motor",
            categoryLabel_en: "Engine",
            name: "Revisión de Correa de Distribución",
            name_en: "Timing Belt Inspection",
            desc: "Se inspecciona el estado y tensión de la correa que sincroniza el movimiento interno del motor.",
            desc_en: "Timing belt wear, tension, and pulleys are checked to prevent critical engine failure.",
            badge: "Motor",
            badge_en: "Engine",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.5 4.5l7 7m-11 7l7-7"/></svg>`
        },
        {
            id: "mo-6",
            category: "motor",
            categoryLabel: "Motor",
            categoryLabel_en: "Engine",
            name: "Afinación Completa",
            name_en: "Complete Engine Tune-up",
            desc: "Se realiza un conjunto de revisiones y ajustes al motor para optimizar su rendimiento general.",
            desc_en: "Comprehensive engine overhaul and tune-up to maximize performance and longevity.",
            badge: "Motor",
            badge_en: "Engine",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
        },

        // === 5. SISTEMA ELÉCTRICO ===
        {
            id: "el-1",
            category: "electrico",
            categoryLabel: "Sistema Eléctrico",
            categoryLabel_en: "Electrical System",
            name: "Revisión / Cambio de Batería",
            name_en: "Battery Test & Replacement",
            desc: "Se evalúa el estado de carga de la batería y se sustituye si ya no cumple su función.",
            desc_en: "Battery health and cranking amps are tested; battery is replaced if degraded.",
            badge: "Eléctrico",
            badge_en: "Electrical",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M6 7V4h4v3M14 7V4h4v3M7 14h4M13 14h4M15 12v4"/></svg>`
        },
        {
            id: "el-2",
            category: "electrico",
            categoryLabel: "Sistema Eléctrico",
            categoryLabel_en: "Electrical System",
            name: "Revisión de Alternador",
            name_en: "Alternator Diagnostic",
            desc: "Se verifica que el alternador esté generando correctamente la energía para cargar la batería.",
            desc_en: "Alternator charging voltage and diode health are evaluated under load.",
            badge: "Eléctrico",
            badge_en: "Electrical",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/></svg>`
        },
        {
            id: "el-3",
            category: "electrico",
            categoryLabel: "Sistema Eléctrico",
            categoryLabel_en: "Electrical System",
            name: "Cambio de Luces / Focos",
            name_en: "Headlight & Bulb Replacement",
            desc: "Se sustituyen los focos o luces del vehículo que estén fundidos o defectuosos.",
            desc_en: "Burned out or flickering headlight and taillight bulbs are replaced.",
            badge: "Eléctrico",
            badge_en: "Electrical",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.6 1.4 4.8 3.5 6h7c2.1-1.2 3.5-3.4 3.5-6a7 7 0 0 0-7-7z"/></svg>`
        },
        {
            id: "el-4",
            category: "electrico",
            categoryLabel: "Sistema Eléctrico",
            categoryLabel_en: "Electrical System",
            name: "Revisión Sistema de Arranque",
            name_en: "Starter Motor Diagnostic",
            desc: "Se inspecciona el motor de arranque y sus componentes para asegurar el encendido correcto del vehículo.",
            desc_en: "Starter motor relay, solenoid, and ignition circuits are inspected.",
            badge: "Eléctrico",
            badge_en: "Electrical",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"/></svg>`
        },

        // === 6. AIRE ACONDICIONADO ===
        {
            id: "ac-1",
            category: "ac",
            categoryLabel: "Aire Acondicionado",
            categoryLabel_en: "Air Conditioning",
            name: "Recarga de Aire Acondicionado",
            name_en: "A/C Gas Recharge",
            desc: "Se repone el gas refrigerante del sistema de aire acondicionado para restaurar su capacidad de enfriamiento.",
            desc_en: "Refrigerant gas is recharged and tested for leaks to restore ice-cold cooling.",
            badge: "A/C",
            badge_en: "A/C",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20m6-16a8 8 0 0 0-12 0m12 8a8 8 0 0 0-12 0"/></svg>`
        },
        {
            id: "ac-2",
            category: "ac",
            categoryLabel: "Aire Acondicionado",
            categoryLabel_en: "Air Conditioning",
            name: "Limpieza de Tubería",
            name_en: "A/C Line & Evaporator Cleaning",
            desc: "Se eliminan obstrucciones o residuos internos de las tuberías del sistema de aire acondicionado.",
            desc_en: "A/C pipelines and evaporator lines are flushed to remove moisture and contaminants.",
            badge: "A/C",
            badge_en: "A/C",
            icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`
        }
    ];

    // === ESTADO DE LA TIENDA / CARRITO ===
    let selectedServices = new Map(); // id -> service object
    let activeCategory = 'all';
    let searchQuery = '';
    let selectedDateStr = '';

    const getActiveLang = () => document.documentElement.lang || localStorage.getItem('susamigos-lang') || 'es';

    // === ELEMENTOS DOM ===
    const catalogGrid = document.getElementById('catalog-grid');
    const filterPills = document.querySelectorAll('.filter-pill');
    const searchInput = document.getElementById('mecanica-search-input');
    const searchClear = document.getElementById('catalog-search-clear');
    const resultsCount = document.getElementById('catalog-results-count');

    // Botones de Carrito
    const btnOpenCart = document.getElementById('btn-open-cart');
    const btnFloatingAgendar = document.getElementById('btn-floating-agendar');
    const cartBadgeCount = document.getElementById('cart-badge-count');
    const agendarCount = document.getElementById('agendar-count');

    // Modal Carrito
    const cartModalOverlay = document.getElementById('cart-modal-overlay');
    const cartModalClose = document.getElementById('cart-modal-close');
    const cartModalBackdrop = document.getElementById('cart-modal-backdrop');
    const cartModalBody = document.getElementById('cart-modal-body');
    const cartModalSubtitle = document.getElementById('cart-modal-subtitle');
    const btnClearCart = document.getElementById('btn-clear-cart');
    const btnCheckoutCart = document.getElementById('btn-checkout-cart');

    // Modal de Alerta
    const customAlertModal = document.getElementById('custom-alert-modal');

    // Modal de Agendamiento
    const appointmentModal = document.getElementById('appointment-modal');
    const appointmentClose = document.getElementById('modal-close');
    const appointmentForm = document.getElementById('appointment-form');
    const btnAgendarHero = document.getElementById('btn-agendar-hero');

    // === MODAL DE ALERTA PERSONALIZADO ===
    function showAlert(message, title = 'Atención', callback = null) {
        const modal = document.getElementById('custom-alert-modal');
        const msgEl = document.getElementById('custom-alert-message');
        const titleEl = document.getElementById('custom-alert-title');
        const btn = document.getElementById('custom-alert-btn');
        const backdrop = document.getElementById('custom-alert-backdrop');

        if (!modal) {
            alert(message);
            if (callback) callback();
            return;
        }

        if (titleEl) titleEl.textContent = title;
        if (msgEl) msgEl.textContent = message;

        const closeModal = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            btn.removeEventListener('click', onOk);
            backdrop.removeEventListener('click', onOk);
            document.removeEventListener('keydown', onEsc);
            if (callback) callback();
        };

        const onOk = () => closeModal();
        const onEsc = (e) => { if (e.key === 'Escape') closeModal(); };

        btn.addEventListener('click', onOk);
        backdrop.addEventListener('click', onOk);
        document.addEventListener('keydown', onEsc);

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        setTimeout(() => btn.focus(), 50);
    }

    // === ACTUALIZAR PLACEHOLDERS DINÁMICOS ===
    function updatePlaceholders() {
        const lang = getActiveLang();
        document.querySelectorAll('[data-placeholder-es][data-placeholder-en]').forEach(el => {
            const ph = el.getAttribute(`data-placeholder-${lang}`);
            if (ph) el.placeholder = ph;
        });
    }

    // === RENDERIZAR CUADRÍCULA DE SERVICIOS (CATÁLOGO TIENDA) ===
    function renderCatalog() {
        if (!catalogGrid) return;
        catalogGrid.innerHTML = '';

        const lang = getActiveLang();
        const normalizedQuery = searchQuery.trim().toLowerCase();

        const filtered = MECANICA_SERVICES.filter(service => {
            const sName = (lang === 'en' && service.name_en) ? service.name_en : service.name;
            const sDesc = (lang === 'en' && service.desc_en) ? service.desc_en : service.desc;
            const sCat = (lang === 'en' && service.categoryLabel_en) ? service.categoryLabel_en : service.categoryLabel;

            const matchesCat = (activeCategory === 'all' || service.category === activeCategory);
            const matchesSearch = !normalizedQuery || 
                sName.toLowerCase().includes(normalizedQuery) || 
                sDesc.toLowerCase().includes(normalizedQuery) ||
                sCat.toLowerCase().includes(normalizedQuery) ||
                service.name.toLowerCase().includes(normalizedQuery);

            return matchesCat && matchesSearch;
        });

        // Actualizar texto de conteo
        if (resultsCount) {
            if (filtered.length === 0) {
                resultsCount.textContent = lang === 'en' 
                    ? 'No services found for your search.' 
                    : 'No se encontraron servicios para tu búsqueda.';
            } else if (activeCategory === 'all' && !normalizedQuery) {
                resultsCount.textContent = lang === 'en'
                    ? `Showing all available services (${filtered.length})`
                    : `Mostrando todos los servicios disponibles (${filtered.length})`;
            } else {
                resultsCount.textContent = lang === 'en'
                    ? `Showing ${filtered.length} service(s) found`
                    : `Mostrando ${filtered.length} servicio(s) encontrados`;
            }
        }

        if (filtered.length === 0) {
            catalogGrid.innerHTML = `
                <div class="catalog-empty-state">
                    <div class="empty-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <h4>${lang === 'en' ? 'No matches found' : 'No encontramos coincidencias'}</h4>
                    <p>${lang === 'en' ? 'Try another keyword or select another category.' : 'Intenta con otra palabra clave o selecciona otra categoría.'}</p>
                    <button type="button" class="btn-gold-sm" id="btn-reset-filters">${lang === 'en' ? 'View all services' : 'Ver todos los servicios'}</button>
                </div>
            `;
            const btnReset = document.getElementById('btn-reset-filters');
            if (btnReset) {
                btnReset.addEventListener('click', () => {
                    activeCategory = 'all';
                    searchQuery = '';
                    if (searchInput) searchInput.value = '';
                    if (searchClear) searchClear.style.display = 'none';
                    filterPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-category') === 'all'));
                    renderCatalog();
                });
            }
            return;
        }

        filtered.forEach(service => {
            const isSelected = selectedServices.has(service.id);
            const card = document.createElement('article');
            card.className = `catalog-card ${isSelected ? 'in-cart' : ''}`;
            card.setAttribute('data-id', service.id);

            const displayName = (lang === 'en' && service.name_en) ? service.name_en : service.name;
            const displayDesc = (lang === 'en' && service.desc_en) ? service.desc_en : service.desc;
            const displayCat = (lang === 'en' && service.categoryLabel_en) ? service.categoryLabel_en : service.categoryLabel;

            const btnLabelAdded = lang === 'en' ? 'Added' : 'Agregado';
            const btnLabelAdd = lang === 'en' ? 'Add to Quote' : 'Añadir al Carrito';
            const ariaLabel = isSelected 
                ? (lang === 'en' ? 'Remove from quote' : 'Quitar de cotización')
                : (lang === 'en' ? 'Add to quote' : 'Añadir a cotización');

            card.innerHTML = `
                <div class="catalog-card-content">
                    <span class="catalog-card-category">${displayCat}</span>
                    <h4 class="catalog-card-title">${displayName}</h4>
                    <p class="catalog-card-desc">${displayDesc}</p>
                </div>
                <div class="catalog-card-action">
                    <button type="button" class="catalog-add-btn ${isSelected ? 'added' : ''}" aria-label="${ariaLabel}">
                        ${isSelected ? `
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>${btnLabelAdded}</span>
                        ` : `
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            <span>${btnLabelAdd}</span>
                        `}
                    </button>
                </div>
            `;

            const addBtn = card.querySelector('.catalog-add-btn');
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleServiceCart(service);
            });

            card.addEventListener('click', () => {
                toggleServiceCart(service);
            });

            catalogGrid.appendChild(card);
        });
    }

    // === GESTIÓN DEL CARRITO (AÑADIR / QUITAR) ===
    function toggleServiceCart(service) {
        if (selectedServices.has(service.id)) {
            selectedServices.delete(service.id);
        } else {
            selectedServices.set(service.id, service);
        }

        updateCartBadges();
        renderCatalog();

        if (cartModalOverlay && cartModalOverlay.classList.contains('active')) {
            renderCartModal();
        }
    }

    function updateCartBadges() {
        const count = selectedServices.size;
        if (cartBadgeCount) cartBadgeCount.textContent = count;
        if (agendarCount) agendarCount.textContent = count;

        if (btnFloatingAgendar) {
            btnFloatingAgendar.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    // === MODAL DEL CARRITO (VENTANA SOBRE LA PANTALLA) ===
    function renderCartModal() {
        if (!cartModalBody) return;
        const lang = getActiveLang();
        const count = selectedServices.size;

        if (cartModalSubtitle) {
            if (lang === 'en') {
                cartModalSubtitle.textContent = count === 1 ? '1 service selected' : `${count} services selected`;
            } else {
                cartModalSubtitle.textContent = count === 1 ? '1 servicio seleccionado' : `${count} servicios seleccionados`;
            }
        }

        if (count === 0) {
            cartModalBody.innerHTML = `
                <div class="cart-empty-view">
                    <div class="cart-empty-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </div>
                    <h4>${lang === 'en' ? 'Your quote list is empty' : 'Tu lista de cotización está vacía'}</h4>
                    <p>${lang === 'en' ? 'Explore the mechanics catalog and add the services or checks your vehicle needs.' : 'Explora el catálogo de mecánica y añade los servicios o revisiones que tu auto necesita.'}</p>
                </div>
            `;
            if (btnCheckoutCart) btnCheckoutCart.disabled = true;
            if (btnClearCart) btnClearCart.disabled = true;
            return;
        }

        if (btnCheckoutCart) btnCheckoutCart.disabled = false;
        if (btnClearCart) btnClearCart.disabled = false;

        let itemsHtml = '<div class="cart-items-list">';
        selectedServices.forEach(item => {
            const displayName = (lang === 'en' && item.name_en) ? item.name_en : item.name;
            const displayDesc = (lang === 'en' && item.desc_en) ? item.desc_en : item.desc;
            const displayCat = (lang === 'en' && item.categoryLabel_en) ? item.categoryLabel_en : item.categoryLabel;

            itemsHtml += `
                <div class="cart-item-row" data-id="${item.id}">
                    <div class="cart-item-icon">${item.icon}</div>
                    <div class="cart-item-info">
                        <span class="cart-item-category">${displayCat}</span>
                        <h4 class="cart-item-title">${displayName}</h4>
                        <p class="cart-item-desc">${displayDesc}</p>
                    </div>
                    <button type="button" class="cart-item-remove" data-remove="${item.id}" aria-label="${lang === 'en' ? 'Remove service' : 'Eliminar servicio'}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            `;
        });
        itemsHtml += '</div>';

        cartModalBody.innerHTML = itemsHtml;

        // Listeners para eliminar individualmente
        cartModalBody.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-remove');
                if (id && selectedServices.has(id)) {
                    selectedServices.delete(id);
                    updateCartBadges();
                    renderCartModal();
                    renderCatalog();
                }
            });
        });
    }

    function openCartModal() {
        renderCartModal();
        if (cartModalOverlay) {
            cartModalOverlay.classList.add('active');
            cartModalOverlay.setAttribute('aria-hidden', 'false');
        }
    }

    function closeCartModal() {
        if (cartModalOverlay) {
            cartModalOverlay.classList.remove('active');
            cartModalOverlay.setAttribute('aria-hidden', 'true');
        }
    }

    // === FILTROS POR CATEGORÍA ===
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeCategory = pill.getAttribute('data-category') || 'all';
            renderCatalog();
        });
    });

    // === BÚSQUEDA EN TIEMPO REAL ===
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            if (searchClear) {
                searchClear.style.display = searchQuery ? 'flex' : 'none';
            }
            renderCatalog();
        });
    }

    if (searchClear) {
        searchClear.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            searchQuery = '';
            searchClear.style.display = 'none';
            renderCatalog();
        });
    }

    // === BOTONES DE APERTURA / CIERRE DE CARRITO ===
    if (btnOpenCart) btnOpenCart.addEventListener('click', openCartModal);
    if (btnFloatingAgendar) btnFloatingAgendar.addEventListener('click', openCartModal);
    if (cartModalClose) cartModalClose.addEventListener('click', closeCartModal);
    if (cartModalBackdrop) cartModalBackdrop.addEventListener('click', closeCartModal);

    if (btnClearCart) {
        btnClearCart.addEventListener('click', () => {
            if (selectedServices.size === 0) return;
            selectedServices.clear();
            updateCartBadges();
            renderCartModal();
            renderCatalog();
        });
    }

    // Continuar desde el carrito hacia el formulario de cita
    if (btnCheckoutCart) {
        btnCheckoutCart.addEventListener('click', () => {
            const lang = getActiveLang();
            if (selectedServices.size === 0) {
                showAlert(
                    lang === 'en' ? 'Please add at least one mechanical service before continuing.' : 'Por favor añade al menos un servicio mecánico antes de continuar.',
                    lang === 'en' ? 'Empty List' : 'Lista Vacía'
                );
                return;
            }
            closeCartModal();
            const serviceNames = Array.from(selectedServices.values()).map(s => (lang === 'en' && s.name_en) ? s.name_en : s.name);
            const title = lang === 'en' ? 'Book Mechanical Services' : 'Agendar Servicios de Mecánica';
            openAppointmentModal(title, serviceNames);
        });
    }

    // === INICIALIZAR SELECTOR DE DÍAS Y CALENDARIO MODAL (5 Días + Otro) ===
    let calendarViewDate = new Date();

    function initDateSelector() {
        const container = document.getElementById('date-scroll-container');
        if (!container) return;
        
        container.innerHTML = '';
        const lang = getActiveLang();
        const today = new Date();

        const days = lang === 'en' 
            ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            : ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const months = lang === 'en'
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const monthsLong = lang === 'en'
            ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        let firstAvailableSet = false;

        for (let i = 0; i < 5; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            
            let dayNameStr = days[d.getDay()];
            if (i === 0) dayNameStr = lang === 'en' ? "Today" : "Hoy";
            else if (i === 1) dayNameStr = lang === 'en' ? "Tomorrow" : "Mañana";

            const dateNum = d.getDate();
            const monthStr = months[d.getMonth()];
            const isSunday = d.getDay() === 0;

            const card = document.createElement('div');
            card.className = 'day-card';
            if (isSunday) {
                card.classList.add('disabled');
                card.innerHTML = `
                    <span class="day-name">${lang === 'en' ? 'Closed' : 'Cerrado'}</span>
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
                const fullStr = i === 0 || i === 1 
                    ? (lang === 'en' ? `${dayNameStr} (${fullDayName}, ${monthStr} ${dateNum})` : `${dayNameStr} (${fullDayName} ${dateNum} de ${monthStr})`)
                    : (lang === 'en' ? `${fullDayName}, ${monthStr} ${dateNum}` : `${fullDayName} ${dateNum} de ${monthStr}`);

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

        // 6to elemento: "Otro" / "Other"
        const otroCard = document.createElement('div');
        otroCard.className = 'day-card';
        otroCard.id = 'card-otro';
        otroCard.innerHTML = `
            <span class="day-name">${lang === 'en' ? 'Other' : 'Otro'}</span>
            <span class="day-date" style="display: flex; justify-content: center; align-items: center; min-height: 26px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
            </span>
            <span class="day-month">${lang === 'en' ? 'Choose' : 'Elegir'}</span>
        `;
        container.appendChild(otroCard);

        // Referencias del modal de calendario
        const modal = document.getElementById('calendar-modal');
        const backdrop = document.getElementById('calendar-backdrop');
        const btnClose = document.getElementById('cal-close');
        const btnPrev = document.getElementById('cal-prev');
        const btnNext = document.getElementById('cal-next');
        const monthYearEl = document.getElementById('calendar-month-year');
        const daysGridEl = document.getElementById('calendar-days-grid');

        function openCalendar() {
            if (!modal) return;
            calendarViewDate = new Date();
            renderCalendar(calendarViewDate);
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
        }

        function closeCalendar() {
            if (!modal) return;
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }

        function renderCalendar(viewDate) {
            if (!monthYearEl || !daysGridEl) return;
            const curLang = getActiveLang();
            const year = viewDate.getFullYear();
            const month = viewDate.getMonth();
            
            monthYearEl.textContent = `${monthsLong[month]} ${year}`;

            if (btnPrev) {
                const isCurrentMonth = (year === today.getFullYear() && month <= today.getMonth());
                btnPrev.disabled = isCurrentMonth;
            }

            const firstDayIndex = new Date(year, month, 1).getDay();
            const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

            daysGridEl.innerHTML = '';

            for (let i = 0; i < firstDayIndex; i++) {
                const emptySlot = document.createElement('div');
                emptySlot.className = 'cal-day cal-day--empty';
                daysGridEl.appendChild(emptySlot);
            }

            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

            for (let day = 1; day <= totalDaysInMonth; day++) {
                const cellDate = new Date(year, month, day);
                const cellTime = cellDate.getTime();
                const isSunday = cellDate.getDay() === 0;
                const isPast = cellTime < todayStart;

                const dayBtn = document.createElement('button');
                dayBtn.type = 'button';
                dayBtn.className = 'cal-day';
                dayBtn.textContent = day;

                if (isPast || isSunday) {
                    dayBtn.classList.add('cal-day--disabled');
                    dayBtn.disabled = true;
                    if (isSunday) {
                        dayBtn.classList.add('cal-day--sunday');
                        dayBtn.title = curLang === 'en' ? 'Sundays closed' : 'Domingos cerrado';
                    } else {
                        dayBtn.title = curLang === 'en' ? 'Past date' : 'Fecha pasada';
                    }
                } else {
                    dayBtn.classList.add('cal-day--selectable');
                    
                    const dayName = days[cellDate.getDay()];
                    const monthName = months[month];
                    const fullDateStr = curLang === 'en' ? `${dayName}, ${monthName} ${day}` : `${dayName} ${day} de ${monthName}`;

                    if (selectedDateStr === fullDateStr) {
                        dayBtn.classList.add('cal-day--selected');
                    }

                    dayBtn.addEventListener('click', () => {
                        selectedDateStr = fullDateStr;

                        otroCard.innerHTML = `
                            <span class="day-name">${curLang === 'en' ? 'Other' : 'Otro'}</span>
                            <span class="day-date">${day}</span>
                            <span class="day-month">${monthName}</span>
                        `;

                        document.querySelectorAll('.day-card').forEach(c => c.classList.remove('active'));
                        otroCard.classList.add('active');

                        closeCalendar();
                    });
                }

                daysGridEl.appendChild(dayBtn);
            }
        }

        otroCard.addEventListener('click', openCalendar);
        if (backdrop) backdrop.addEventListener('click', closeCalendar);
        if (btnClose) btnClose.addEventListener('click', closeCalendar);

        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                calendarViewDate.setMonth(calendarViewDate.getMonth() - 1);
                renderCalendar(calendarViewDate);
            });
        }

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                calendarViewDate.setMonth(calendarViewDate.getMonth() + 1);
                renderCalendar(calendarViewDate);
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                closeCalendar();
            }
        });
    }

    // === MODAL DE AGENDAMIENTO ===
    let currentAppointmentServices = [];

    function openAppointmentModal(titleText = "Agendar Servicios de Mecánica", servicesList = []) {
        const lang = getActiveLang();
        const titleEl = document.getElementById('modal-title');
        if (titleEl) {
            titleEl.textContent = titleText || (lang === 'en' ? 'Book Mechanical Services' : 'Agendar Servicios de Mecánica');
        }
        currentAppointmentServices = servicesList;
        
        if (appointmentModal) {
            appointmentModal.classList.add('active');
        }
    }

    function closeAppointmentModal() {
        if (appointmentModal) {
            appointmentModal.classList.remove('active');
        }
    }

    if (btnAgendarHero) {
        btnAgendarHero.addEventListener('click', () => {
            const lang = getActiveLang();
            const title = lang === 'en' ? 'Book General Maintenance' : 'Agendar Mantenimiento General';
            const serviceName = lang === 'en' ? 'General Maintenance (Star Service)' : 'Mantenimiento General (Servicio Estrella)';
            openAppointmentModal(title, [serviceName]);
        });
    }
    
    if (appointmentClose) {
        appointmentClose.addEventListener('click', closeAppointmentModal);
    }
    
    if (appointmentModal) {
        appointmentModal.addEventListener('click', (e) => {
            if (e.target === appointmentModal) closeAppointmentModal();
        });
    }

    // Cerrar modales con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCartModal();
            closeAppointmentModal();
        }
    });

    // === ENVÍO DE FORMULARIO WPP ===
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const lang = getActiveLang();
            
            const name = document.getElementById('client-name').value.trim();
            const email = document.getElementById('client-email').value.trim();
            const vehicle = document.getElementById('client-vehicle').value.trim();
            const year = document.getElementById('client-year').value.trim();
            const timeEl = document.querySelector('input[name="client_time"]:checked');
            
            if (!name || !email || !vehicle || !year) {
                showAlert(
                    lang === 'en' ? 'Please complete all your contact, email, and vehicle information.' : 'Por favor complete todos sus datos de contacto, correo y vehículo.',
                    lang === 'en' ? 'Incomplete Details' : 'Datos Incompletos'
                );
                return;
            }

            if (!timeEl) {
                showAlert(
                    lang === 'en' ? 'Please select a time slot for your appointment.' : 'Por favor seleccione un bloque de hora para su cita.',
                    lang === 'en' ? 'Time Required' : 'Hora Requerida'
                );
                return;
            }
            const timeStr = timeEl.value;

            if (!selectedDateStr) {
                showAlert(
                    lang === 'en' ? 'Please select a date for your appointment.' : 'Por favor seleccione una fecha para su cita.',
                    lang === 'en' ? 'Date Required' : 'Fecha Requerida'
                );
                return;
            }

            // Formatear mensaje WPP
            let textMsj = '';
            if (lang === 'en') {
                textMsj = 'Hello, I would like to request a quote / book an appointment for MECHANICS with the following details:%0A%0A';
                textMsj += '*CLIENT DETAILS:*%0A';
                textMsj += `- Name: ${name}%0A`;
                textMsj += `- Email: ${email}%0A`;
                textMsj += `- Vehicle: ${vehicle}%0A`;
                textMsj += `- Year: ${year}%0A`;
                textMsj += `- Scheduled Date: ${selectedDateStr}%0A`;
                textMsj += `- Scheduled Time: ${timeStr}%0A%0A`;
                
                textMsj += '*SERVICES TO QUOTE / PERFORM:*%0A';
                if (currentAppointmentServices.length > 0) {
                    currentAppointmentServices.forEach((s, idx) => {
                        textMsj += `${idx + 1}. ${s}%0A`;
                    });
                } else {
                    textMsj += `1. General Maintenance (Star Service)%0A`;
                }
                textMsj += `%0ALooking forward to your confirmation!`;
            } else {
                textMsj = 'Hola, me gustaría solicitar una cotización / agendar cita de MECÁNICA con la siguiente información:%0A%0A';
                textMsj += '*DATOS DEL CLIENTE:*%0A';
                textMsj += `- Nombre: ${name}%0A`;
                textMsj += `- Correo: ${email}%0A`;
                textMsj += `- Vehículo: ${vehicle}%0A`;
                textMsj += `- Año: ${year}%0A`;
                textMsj += `- Fecha agendada: ${selectedDateStr}%0A`;
                textMsj += `- Hora agendada: ${timeStr}%0A%0A`;
                
                textMsj += '*SERVICIOS A COTIZAR / REALIZAR:*%0A';
                if (currentAppointmentServices.length > 0) {
                    currentAppointmentServices.forEach((s, idx) => {
                        textMsj += `${idx + 1}. ${s}%0A`;
                    });
                } else {
                    textMsj += `1. Mantenimiento General (Servicio Estrella)%0A`;
                }
                textMsj += `%0A¡Quedo atento(a) a su respuesta para confirmar!`;
            }

            window.open(`https://wa.me/50670491753?text=${textMsj}`, '_blank');
            closeAppointmentModal();
        });
    }

    // === ESCUCHAR CAMBIOS DE IDIOMA EN TIEMPO REAL ===
    window.addEventListener('languageChanged', () => {
        updatePlaceholders();
        renderCatalog();
        if (cartModalOverlay && cartModalOverlay.classList.contains('active')) {
            renderCartModal();
        }
        initDateSelector();
    });

    // === INICIALIZACIÓN ===
    updatePlaceholders();
    renderCatalog();
    initDateSelector();
    updateCartBadges();
});
