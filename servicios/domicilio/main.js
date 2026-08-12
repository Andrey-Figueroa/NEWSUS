// main.js - Detailing Logic Completo (6 Pasos)
window.toggleInfo = function (event) {
    event.preventDefault();
    event.stopPropagation();

    const toggleBtn = event.currentTarget;
    const overlay = toggleBtn.parentElement.querySelector('.info-overlay');

    // Toggle active classes
    toggleBtn.classList.toggle('active');
    if (overlay) {
        overlay.classList.toggle('active');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('wizard-track');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    // === COTIZADOR EN VIVO (PRECIOS DINÁMICOS) ===
    const cartTotalEl = document.getElementById('cart-total');

    // PRECIOS BASE POR VEHÍCULO
    const VEHICLE_PRICES = {
        'sedan': { premium: 13500, gold: 17500, abrillantado: 20500, hidrosellado: 25500, ceramico: 'Cotizar', skip: 0 },
        'suv': { premium: 15500, gold: 20500, abrillantado: 25500, hidrosellado: 32500, ceramico: 'Cotizar', skip: 0 },
        '4x4': { premium: 16500, gold: 25500, abrillantado: 30500, hidrosellado: 35500, ceramico: 'Cotizar', skip: 0 },
        'moto': { premium: 6500, gold: 8500, abrillantado: 12500, hidrosellado: 15500, ceramico: 'Cotizar', skip: 0 },
        'microbus': { premium: 19500, gold: 30500, abrillantado: 35500, hidrosellado: 40500, ceramico: 'Cotizar', skip: 0 }
    };

    const SPECIAL_PRICES = {
        'sedan': { ninguno: 0, silvines: 12000, vidrios: 30000, parabrisas: 10000, carroceria: 70000, motor: 7500, tapiceria: 50000, chasis: 7500, lluvia: 16000 },
        'suv': { ninguno: 0, silvines: 12000, vidrios: 30000, parabrisas: 10000, carroceria: 75000, motor: 7500, tapiceria: 60000, chasis: 7500, lluvia: 16000 },
        '4x4': { ninguno: 0, silvines: 12000, vidrios: 30000, parabrisas: 12500, carroceria: 80000, motor: 7500, tapiceria: 80000, chasis: 7500, lluvia: 16000 },
        'moto': { ninguno: 0, silvines: 'N/A', vidrios: 'N/A', parabrisas: 'N/A', carroceria: 'N/A', motor: 'N/A', tapiceria: 'N/A', chasis: 'N/A', lluvia: 'N/A' },
        'microbus': { ninguno: 0, silvines: 12000, vidrios: 30000, parabrisas: 15000, carroceria: 90000, motor: 7500, tapiceria: 100000, chasis: 'N/A', lluvia: 'N/A' }
    };

    const EXTRA_PRICES = {
        interior_detail: { nice: 0, trapo: 0, mate: 0, brillante: 0 },
        interior_aroma: { limon: 0, frutos: 0, carro_nuevo: 0, ninguno: 0 },
        interior_nice: { si: 0, no: 0 },
        extra: { ninguno: 0, cera: 2000, protector_int: 2000, protector_asientos: 4500, anti_empanante: 2500, repelente: 2500, sellador: 3500, partes_negras: 2000 }
    };

    // Multiplicador de precios para los extras menores según el tamaño del vehículo
    const EXTRA_MULT = {
        'sedan': 1,
        'suv': 1.2,
        '4x4': 1.4,
        'microbus': 1.6,
        'moto': 0.8
    };

    function updatePackagePrices() {
        const vehicleInput = document.querySelector('input[name="vehicle"]:checked');
        if (!vehicleInput) return;
        const v = vehicleInput.value;
        const mult = EXTRA_MULT[v] || 1;

        document.querySelectorAll('.dynamic-price').forEach(el => {
            const pkg = el.getAttribute('data-pkg');
            const sp = el.getAttribute('data-special');
            const ex = el.getAttribute('data-extra');

            if (pkg && VEHICLE_PRICES[v] && VEHICLE_PRICES[v][pkg] !== undefined) {
                const val = VEHICLE_PRICES[v][pkg];
                el.textContent = typeof val === 'number' ? (val === 0 ? '₡0' : '₡' + val.toLocaleString('es-CR')) : val;
            } else if (sp && SPECIAL_PRICES[v] && SPECIAL_PRICES[v][sp] !== undefined) {
                const val = SPECIAL_PRICES[v][sp];
                const card = el.closest('.package-card');
                const checkbox = card.querySelector('input');

                if (val === 'N/A') {
                    el.textContent = 'No se ofrece';
                    checkbox.disabled = true;
                    checkbox.checked = false;
                    card.style.opacity = '0.5';
                    card.style.pointerEvents = 'none';
                } else {
                    el.textContent = '+ ₡' + val.toLocaleString('es-CR');
                    checkbox.disabled = false;
                    card.style.opacity = '1';
                    card.style.pointerEvents = 'auto';
                }
            } else if (ex && EXTRA_PRICES.extra[ex] !== undefined) {
                const price = Math.round(EXTRA_PRICES.extra[ex] * mult);
                el.textContent = price === 0 ? '₡0' : '+ ₡' + price.toLocaleString('es-CR');
            }
        });
    }

    function calculateTotal() {
        let total = 0;
        const vehicleInput = document.querySelector('input[name="vehicle"]:checked');
        const v = vehicleInput ? vehicleInput.value : 'sedan';
        const mult = EXTRA_MULT[v] || 1;

        const pkgInput = document.querySelector('input[name="package"]:checked');
        if (vehicleInput && pkgInput) {
            const val = VEHICLE_PRICES[v][pkgInput.value];
            if (typeof val === 'number') total += val;
        }

        const intDetail = document.querySelector('input[name="interior_detail"]:checked');
        if (intDetail) total += Math.round((EXTRA_PRICES.interior_detail[intDetail.value] || 0) * mult);

        const intAroma = document.querySelector('input[name="interior_aroma"]:checked');
        if (intAroma) total += Math.round((EXTRA_PRICES.interior_aroma[intAroma.value] || 0) * mult);

        const intNice = document.querySelector('input[name="interior_nice"]:checked');
        if (intNice) total += Math.round((EXTRA_PRICES.interior_nice[intNice.value] || 0) * mult);

        document.querySelectorAll('input[name="special"]:checked').forEach(sp => {
            const val = SPECIAL_PRICES[v][sp.value];
            if (typeof val === 'number') total += val;
        });

        document.querySelectorAll('input[name="extra"]:checked').forEach(ex => {
            total += Math.round((EXTRA_PRICES.extra[ex.value] || 0) * mult);
        });

        cartTotalEl.textContent = '₡' + total.toLocaleString('es-CR');
        return total;
    }

    // Comportamiento "Ninguno" en Especiales (Paso 4)
    const specialNone = document.getElementById('special-none');
    const specialOthers = document.querySelectorAll('input[name="special"]:not([value="ninguno"])');

    if (specialNone) {
        specialNone.addEventListener('change', (e) => {
            if (e.target.checked) specialOthers.forEach(cb => cb.checked = false);
            calculateTotal();
        });

        specialOthers.forEach(cb => {
            cb.addEventListener('change', () => {
                if (cb.checked) {
                    specialNone.checked = false;
                } else {
                    const anyChecked = Array.from(specialOthers).some(el => el.checked);
                    if (!anyChecked) specialNone.checked = true;
                }
                calculateTotal();
            });
        });
    }

    // Comportamiento "Ninguno" en Extras (Paso 5)
    const extraNone = document.getElementById('extra-none');
    const extraOthers = document.querySelectorAll('input[name="extra"]:not([value="ninguno"])');

    if (extraNone) {
        extraNone.addEventListener('change', (e) => {
            if (e.target.checked) extraOthers.forEach(cb => cb.checked = false);
            calculateTotal();
        });

        extraOthers.forEach(cb => {
            cb.addEventListener('change', () => {
                if (cb.checked) {
                    extraNone.checked = false;
                } else {
                    const anyChecked = Array.from(extraOthers).some(el => el.checked);
                    if (!anyChecked) extraNone.checked = true;
                }
                calculateTotal();
            });
        });
    }

    // Listeners Globales
    const allInputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    allInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.name === 'vehicle') updatePackagePrices();
            calculateTotal();
        });
    });

    // === INICIALIZAR SELECTOR DE DÍAS ===
    let selectedDateStr = "";
    function initDateSelector() {
        const container = document.getElementById('date-scroll-container');
        if(!container) return;
        
        container.innerHTML = '';
        const today = new Date();
        const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        
        let firstAvailableSet = false;

        for (let i = 0; i < 6; i++) {
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
                
                // Formatear string para el WhatsApp: Mañana (Jueves 15)
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
    initDateSelector();

    // === WIZARD LOGIC ===
    let currentStep = 1;
    let stepHistory = [1];
    const totalSteps = 7;

    function generateSummary() {
        const total = calculateTotal();
        const summaryContainer = document.getElementById('summary-ticket');
        const btnWhatsApp = document.getElementById('btn-whatsapp');

        let html = '<h4>Cotización de Servicio a Domicilio</h4>';
        
        const cPhone = document.getElementById('client-phone').value;
        const cName = document.getElementById('client-name').value;
        const cAddress = document.getElementById('client-address').value;
        const cTimeEl = document.querySelector('input[name="client_time"]:checked');
        const cTime = cTimeEl ? cTimeEl.value : 'No seleccionada';
        
        const cPaymentEl = document.querySelector('input[name="client_payment"]:checked');
        const cPayment = cPaymentEl ? cPaymentEl.value : 'No especificado';

        let textMsj = 'Hola, me gustaría agendar un SERVICIO A DOMICILIO con la siguiente información:%0A%0A';
        textMsj += '*DATOS DEL CLIENTE:*%0A';
        textMsj += `- Nombre: ${cName}%0A`;
        textMsj += `- Teléfono: ${cPhone}%0A`;
        textMsj += `- Dirección: ${cAddress}%0A`;
        textMsj += `- Fecha agendada: ${selectedDateStr}%0A`;
        textMsj += `- Hora agendada: ${cTime}%0A`;
        textMsj += `- Método de Pago: ${cPayment}%0A%0A`;
        textMsj += '*DETALLES DEL SERVICIO:*%0A';

        const addLine = (label, cost) => {
            if (cost > 0 || typeof cost === 'string' || label.includes('Vehículo') || label.includes('Paquete') || label.includes('Interior') || label.includes('Aroma') || label.includes('Alfombras')) {
                let fCost = '';
                if (typeof cost === 'number' && cost > 0) fCost = '₡' + cost.toLocaleString('es-CR');
                else if (typeof cost === 'string') fCost = cost;
                else if (cost === 0 && !label.includes('Vehículo')) fCost = 'Incluido';

                html += `<div class="summary-row"><span>${label}</span> <span>${fCost}</span></div>`;
                textMsj += `- ${label}: ${fCost}%0A`;
            }
        };

        const vInput = document.querySelector('input[name="vehicle"]:checked');
        const pInput = document.querySelector('input[name="package"]:checked');

        if (vInput) {
            const vName = vInput.nextElementSibling.querySelector('.package-name, .vehicle-name').textContent.trim();
            addLine('Vehículo: ' + vName, 0);
        }

        if (pInput && pInput.value !== 'skip') {
            const pName = pInput.nextElementSibling.querySelector('.package-name').textContent.trim();
            addLine('Paquete: ' + pName, VEHICLE_PRICES[vInput.value][pInput.value]);
        }

        if (pInput && pInput.value !== 'skip') {
            const ind = document.querySelector('input[name="interior_detail"]:checked');
            if (ind) {
                const name = ind.nextElementSibling.querySelector('.package-name').textContent.trim();
                addLine('Interior: ' + name, EXTRA_PRICES.interior_detail[ind.value]);
            }
            const ina = document.querySelector('input[name="interior_aroma"]:checked');
            if (ina && ina.value !== 'ninguno') {
                const name = ina.nextElementSibling.querySelector('.package-name').textContent.trim();
                addLine('Aroma: ' + name, EXTRA_PRICES.interior_aroma[ina.value]);
            }
            const inn = document.querySelector('input[name="interior_nice"]:checked');
            if (inn && inn.value === 'si') {
                const name = document.querySelector('input[name="interior_nice"]:checked').nextElementSibling.innerText.trim();
                addLine('Alfombras: ' + name, EXTRA_PRICES.interior_nice[inn.value]);
            }
        }

        const v = vInput ? vInput.value : 'sedan';
        const mult = EXTRA_MULT[v] || 1;

        document.querySelectorAll('input[name="special"]:not([value="ninguno"]):checked').forEach(cb => {
            const name = cb.nextElementSibling.querySelector('.package-name').textContent.trim();
            addLine('Especial: ' + name, SPECIAL_PRICES[v][cb.value]);
        });

        document.querySelectorAll('input[name="extra"]:not([value="ninguno"]):checked').forEach(cb => {
            const name = cb.nextElementSibling.querySelector('.package-name').textContent.trim();
            addLine('Extra: ' + name, Math.round(EXTRA_PRICES.extra[cb.value] * mult));
        });

        html += `<div class="summary-row total"><span>TOTAL ESTIMADO:</span> <span>₡${total.toLocaleString('es-CR')}</span></div>`;
        textMsj += `%0ATOTAL ESTIMADO: ₡${total.toLocaleString('es-CR')}%0A%0A¡Quedo atento(a)!`;

        summaryContainer.innerHTML = html;
        btnWhatsApp.href = `https://wa.me/50661515240?text=${textMsj}`;
    }

    function updateWizard() {
        track.style.transform = `translateX(-${(currentStep - 1) * 100}%)`;
        btnPrev.disabled = stepHistory.length <= 1;

        // Ocultar botón de Siguiente en el último paso
        btnNext.style.display = (currentStep === totalSteps) ? 'none' : 'block';

        if (currentStep === 4) {
            // Lógica para deshabilitar Mate/Brillante si el paquete es Clásico (Por si se añade)
            const pkg = document.querySelector('input[name="package"]:checked');
            const isClasico = pkg && pkg.value === 'clasico';
            document.querySelectorAll('.cond-clasico').forEach(el => {
                el.disabled = isClasico;
                if (isClasico && el.checked) {
                    document.querySelector('input[name="interior_detail"][value="nice"]').checked = true;
                }
            });
            const noteClasico = document.getElementById('note-clasico');
            if (noteClasico) noteClasico.style.display = isClasico ? 'block' : 'none';
        }

        if (currentStep === totalSteps) {
            generateSummary();
        }

        // Ajustar la altura del viewport al paso actual para evitar espacios vacíos
        const viewport = document.querySelector('.wizard-viewport');
        const currentStepEl = document.getElementById(`step-${currentStep}`);
        if (viewport && currentStepEl) {
            // Añadir un pequeño retraso para asegurar que el DOM se haya repintado si hubo cambios
            setTimeout(() => {
                viewport.style.height = (currentStepEl.offsetHeight + 40) + 'px';
            }, 10);
        }
    }

    btnNext.addEventListener('click', () => {
        if (currentStep === 1) {
            const phone = document.getElementById('client-phone').value.trim();
            const name = document.getElementById('client-name').value.trim();
            const address = document.getElementById('client-address').value.trim();
            const timeEl = document.querySelector('input[name="client_time"]:checked');
            
            if (!phone || !name || !address) {
                alert('Por favor complete todos sus datos de contacto y dirección.');
                return;
            }
            if (!timeEl) {
                alert('Por favor seleccione un bloque de hora (ej. 09:30 AM).');
                return;
            }
            currentStep = 2;
        }
        else if (currentStep === 2) {
            const vehicleSelected = document.querySelector('input[name="vehicle"]:checked');
            if (!vehicleSelected) {
                alert("Por favor, seleccione el tamaño de su vehículo.");
                return;
            }
            currentStep = 3;
        }
        else if (currentStep === 3) {
            const packageSelected = document.querySelector('input[name="package"]:checked');
            if (!packageSelected) {
                alert("Por favor, seleccione un paquete o decida saltar este paso.");
                return;
            }
            if (packageSelected.value === 'skip') {
                currentStep = 5; // Salta paso 4 (interior)
            } else {
                currentStep = 4;
            }
        }
        else if (currentStep === 4) {
            currentStep = 5;
        }
        else if (currentStep === 5) {
            currentStep = 6;
        }
        else if (currentStep === 6) {
            currentStep = 7;
        }

        stepHistory.push(currentStep);
        updateWizard();
    });

    btnPrev.addEventListener('click', () => {
        if (stepHistory.length > 1) {
            stepHistory.pop();
            currentStep = stepHistory[stepHistory.length - 1];
            updateWizard();
        }
    });

    // Inicializar la altura y el estado del wizard
    setTimeout(() => {
        updateWizard();
    }, 50);
});
