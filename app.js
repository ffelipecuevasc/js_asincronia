// UTILIDADES VARIAS - Consola visual y métodos relacionados

const consola = document.getElementById('consola-visual');

const imprimirLog = (message, type = 'info') => {
    const p = document.createElement('p');
    p.textContent = `> ${message}`;
    p.className = type === 'error' ? 'text-red-400 mt-1' : type === 'success' ? 'text-green-400 mt-1' : 'text-gray-300 mt-1';
    consola.appendChild(p);
    consola.scrollTop = consola.scrollHeight;
};

/* Operador Ternario anidado usado en 'imprimirLog' desmenuzado en IF-ELSE:

    if (type === 'error') {
       p.className = 'text-red-400 mt-1';
    } else if (type === 'success') {
       p.className = 'text-green-400 mt-1';
    } else {
       p.className = 'text-gray-300 mt-1';
    }

* */

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
// TEMA 4 - Callback Hell
// =========================================================================
const callbackHell = () => {
    imprimirLog('--- Módulo 4: Callback Hell ---', 'success');


    const validarUsuario = (user, callback) => {
        setTimeout(() => callback(null, { id: 1, nombre: user }), 1000);
    };
    const buscarPedido = (userId, callback) => {
        setTimeout(() => callback(null, { idPedido: 555 }), 1000);
    };
    const procesarPago = (pedido, callback) => {
        setTimeout(() => callback(null, 'Aprobado'), 1000);
    };


    // Pirámide del terror
    validarUsuario('Ana', (err, user) => {
        imprimirLog(`Usuario validado: ${user.nombre}`);
        buscarPedido(user.id, (err, pedido) => {
            imprimirLog(`Pedido encontrado: #${pedido.idPedido}`);
            procesarPago(pedido, (err, recibo) => {
                imprimirLog(`Pago completado. Estado: ${recibo}`, 'success');
            });
        });
    });
};

// =========================================================================
// TEMA 5 - Promesas
// =========================================================================
const pedirComida = (hayIngredientes) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                if (hayIngredientes) resolve('Hamburguesa');
                else reject('Sin ingredientes');
            }
            ,2000);
    });
};

// Una promesa puede tener 1 de 3 estados = pendiente, cumplida o rechazada.
const ejecutarPromesas = () => {
    imprimirLog('--- Tema 5 - Promesas ---', 'success');
    imprimirLog('Iniciando pedido...')

    // Acá se ejecuta la función automáticamente y devuelve la promesa = PENDING
    pedirComida(true)
        .then(comida => {
            imprimirLog(`Paso 1: Recibido -> ${comida}`);
            return `${comida} con Papas Fritas`;
        })
        .then(combo => {
            imprimirLog(`Paso 2: Combo final -> ${combo}`, 'success')
        })
        .catch((err) => {
            imprimirLog(`Error crítico: ${err}`, 'error');
        });
};

// =========================================================================
// TEMA 6 - Async / Await
// =========================================================================
const ejecutarAsyncAwait = async () => {
    imprimirLog('--- Tema 6 - Async / Await ---', 'success');
    imprimirLog('Iniciando proceso asíncrono moderno (ES6+)...');
    try {
        // Voy a conectar a una BD pero no quiero esperar todo el tiempo, lo ejecuto AWAIT
        // Voy a leer un archivo .TXT extenso, pero no quiero esperarlo, lo ejecuto AWAIT
        const comida = await pedirComida(true);
        imprimirLog(`Paso 1: Recibido -> ${comida}`);

        const combo = `${comida} con Papas Fritas y Coca-Cola`;
        imprimirLog(`Paso 2: Recibido -> ${combo}`, 'success');
    } catch (error) {
        imprimirLog(`Error capturado: ${error}`, 'error');
    }
};

// =========================================================================
// ASIGNACIÓN DE EVENTOS (Listeners)
// =========================================================================
document.getElementById('btn-tema-1').addEventListener('click', asincroniaBasica);
document.getElementById('btn-tema-2').addEventListener('click', probandoEventLoop);
document.getElementById('btn-tema-3').addEventListener('click', codigoBloqueante);
document.getElementById('btn-tema-4').addEventListener('click', callbackHell);
document.getElementById('btn-tema-5').addEventListener('click', ejecutarPromesas);
document.getElementById('btn-tema-6').addEventListener('click', ejecutarAsyncAwait);
document.getElementById('btn-limpiar').addEventListener('click', limpiarLog);
