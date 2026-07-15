// UTILIDADES VARIAS - Consola visual y métodos relacionados

const consola = document.getElementById('consola-visual');

const imprimirLog = (message, type = 'info') => {
    const p = document.createElement('p');
    p.textContent = `> ${message}`;
    p.className = type === 'error' ? 'text-red-400 mt-1' : type === 'success' ? 'text-green-400 mt-1' : 'text-gray-300 mt-1';
    consola.appendChild(p);
    consola.scrollTop = consola.scrollHeight;
};

const limpiarLog = () => {
    consola.innerHTML = '';
    imprimirLog('Consola Limpiada', 'success');
};

// =========================================================================
// TEMA 1 - Asincronía Básica
// =========================================================================
const asincroniaBasica = () => {
    imprimirLog('--- Tema 1 - Asincronía Básica ---', 'success');
    imprimirLog('1. [Síncrono] Iniciando carga...');

    setTimeout(() => {
        imprimirLog('3. [Asíncrono] Tarea de fondo terminada (1.5 segundos después)');
    }, 1500);

    imprimirLog('2. [Síncrono] Interfaz desplegada, esperando ejecución de tarea de fondo');
};

// =========================================================================
// TEMA 2 - El Event Loop
// =========================================================================
const probandoEventLoop = () => {
    // El Event Loop SIEMPRE ejecuta primero el código SÍNCRONO y una vez finalizado ahí recién ejecuta lo ASÍNCRONO
    imprimirLog('--- Tema 2 - Event Loop ---', 'success');
    imprimirLog('1. [Hilo Principal] Haciendo algo de manera síncrona 1.');

    // Esto se ejecuta al final por la sencilla razón de ser código ASÍNCRONO
    setTimeout(() => {
        imprimirLog('3. [Event Loop] Ejecutando esta tarea desde la cola de tareas.','success');
    },0);

    imprimirLog('2. [Hilo Principal] Haciendo otra cosa de manera síncrona 2 (el setTimeout de 0ms tiene que esperar).');
};

// =========================================================================
// TEMA 3 - Código bloqueante
// =========================================================================
const codigoBloqueante = () => {
    imprimirLog('--- Tema 3 - Código Bloqueante ---', 'error');
    imprimirLog('Iniciando tarea bloqueante de 4 segundos. Intenta hacer clic en otros botones...', 'error');

    setTimeout(() => {
        const inicio = Date.now();
        while (Date.now() - inicio < 4000) {}
        imprimirLog('Desbloqueado. ¿Notaste cómo la página web quedó inutilizable?')
    },100);
};










// =========================================================================
// ASIGNACIÓN DE EVENTOS (Listeners)
// =========================================================================
document.getElementById('btn-tema-1').addEventListener('click', asincroniaBasica);
document.getElementById('btn-tema-2').addEventListener('click', probandoEventLoop);
document.getElementById('btn-tema-3').addEventListener('click', codigoBloqueante);

document.getElementById('btn-limpiar').addEventListener('click', limpiarLog);










