const iframe = document.getElementById('api-frame');
// UID del modelo proporcionado por el usuario
const uid = '540c755aef2243a782566f74fc16f1f5';
const client = new Sketchfab(iframe);

let apiInstance = null;
let initialCamera = null;

// Inicializamos el visor
client.init(uid, {
    success: function onSuccess(api) {
        apiInstance = api;
        api.start();
        api.addEventListener('viewerready', function() {
            console.log('El modelo 3D está listo');
            
            // Ocultamos elementos de UI para que parezca nativo
            // y aplicamos color de fondo si la transparencia no basta
            // Color base: #0D0A0D (RGB aprox: 13, 10, 13)
            
            // Obtenemos la cámara inicial para tener la distancia correcta
            api.getCameraLookAt(function(err, camera) {
                if(!err) {
                    initialCamera = camera;
                    // Llamamos la función de scroll para setear posición inicial
                    updateCameraOnScroll();
                }
            });
        });
    },
    error: function onError() {
        console.error('Error al cargar Sketchfab');
    },
    autostart: 1,
    ui_controls: 0,
    ui_infos: 0,
    ui_watermark: 0,
    scrollwheel: 0,
    ui_stop: 0,
    transparent: 1
});

// Referencias a las tarjetas de glassmorfismo
const leftCard = document.querySelector('.left-card');
const rightCard = document.querySelector('.right-card');

function updateCameraOnScroll() {
    if (!apiInstance || !initialCamera) return;

    // Cálculo del progreso del scroll (de 0 a 1)
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    // Evitar divisiones por cero o valores raros si no hay scroll
    let scrollPercent = 0;
    if (maxScroll > 0) {
        scrollPercent = scrollTop / maxScroll;
    }

    // El usuario pidió que el carro gire a la izquierda (counter-clockwise)
    // Para que el modelo gire a la izquierda, la cámara debe girar a la derecha alrededor del modelo.
    // Un ángulo base para empezar (ajustado para que el auto se vea de lado/frente inicialmente)
    const baseAngle = -Math.PI / 4; 
    
    // Multiplicamos por Math.PI * 1.5 (270 grados) para que al final del scroll casi haya dado una vuelta
    // Restamos para que la cámara gire a la derecha, lo que hace que el carro rote a la izquierda
    const currentAngle = baseAngle - (scrollPercent * Math.PI * 1.5); 

    const target = initialCamera.target;
    const position = initialCamera.position;
    
    // Distancia 2D en el plano XY
    const dx = position[0] - target[0];
    const dy = position[1] - target[1];
    const radius = Math.sqrt(dx * dx + dy * dy);
    
    // Calculamos nueva posición de cámara usando trigonometría básica
    const newX = target[0] + radius * Math.cos(currentAngle);
    const newY = target[1] + radius * Math.sin(currentAngle);
    const newZ = position[2]; // Mantenemos la misma altura

    // duration 0 para un movimiento inmediato y sincronizado con el scroll
    apiInstance.setCameraLookAt([newX, newY, newZ], target, 0);

    // Pequeño extra: Mostrar las cards con glassmorfismo dependiendo del scroll
    if (scrollPercent > 0.2) {
        leftCard.style.opacity = '1';
        leftCard.style.transform = 'translateY(0)';
    } else {
        leftCard.style.opacity = '0';
        leftCard.style.transform = 'translateY(20px)';
    }

    if (scrollPercent > 0.6) {
        rightCard.style.opacity = '1';
        rightCard.style.transform = 'translateY(0)';
    } else {
        rightCard.style.opacity = '0';
        rightCard.style.transform = 'translateY(20px)';
    }
}

// Escuchador del scroll con requestAnimationFrame para mayor fluidez
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateCameraOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});
