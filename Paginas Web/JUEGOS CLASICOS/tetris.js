const canvas = document.getElementById('tetrisCanvas');
const ctx = canvas.getContext('2d');
const puntuacionElemento = document.getElementById('puntuacionTetris');

const anchoBloque = 20;
const altoBloque = 20;
const columnas = canvas.width / anchoBloque;
const filas = canvas.height / altoBloque;

let tablero = crearTablero();
let piezaActual = null;
let puntuacion = 0;
let juegoActivo = true;
let velocidadCaida = 500; // Milisegundos

function crearTablero() {
    return Array(filas).fill(null).map(() => Array(columnas).fill(0));
}

const piezas = [
    [[0,0],[0,-1],[0,1],[0,2]], // I
    [[0,0],[-1,0],[1,0],[1,-1]], // L
    [[0,0],[-1,0],[1,0],[1,1]],  // J
    [[0,0],[-1,0],[0,-1],[1,0]], // T
    [[0,0],[-1,-1],[0,-1],[1,0]], // S
    [[0,0],[-1,0],[0,-1],[1,-1]], // Z
    [[0,0],[-1,0],[0,-1],[-1,-1]]  // O
];

const colores = ['cyan', 'orange', 'blue', 'purple', 'green', 'red', 'yellow'];

function crearNuevaPieza() {
    const indicePieza = Math.floor(Math.random() * piezas.length);
    const forma = piezas[indicePieza];
    const color = colores[indicePieza];
    return {
        forma: forma,
        color: color,
        x: Math.floor(columnas / 2) - Math.ceil(forma.reduce((max, coord) => Math.max(max, coord[0]), 0) / 2),
        y: 0
    };
}

function dibujarBloque(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * anchoBloque, y * altoBloque, anchoBloque, altoBloque);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(x * anchoBloque, y * altoBloque, anchoBloque, altoBloque);
}

function dibujarTablero() {
    tablero.forEach((fila, y) => {
        fila.forEach((valor, x) => {
            if (valor !== 0) {
                dibujarBloque(x, y, valor);
            }
        });
    });
}

function dibujarPieza() {
    if (piezaActual) {
        piezaActual.forma.forEach(bloque => {
            dibujarBloque(piezaActual.x + bloque[0], piezaActual.y + bloque[1], piezaActual.color);
        });
    }
}

function moverPiezaAbajo() {
    if (!piezaActual) return;
    piezaActual.y++;
    if (colision()) {
        piezaActual.y--;
        fusionarPieza();
        eliminarFilasCompletas();
        piezaActual = crearNuevaPieza();
        if (colision()) {
            gameOver();
        }
    }
}

function moverPiezaIzquierda() {
    if (!piezaActual) return;
    piezaActual.x--;
    if (colision()) {
        piezaActual.x++;
    }
}

function moverPiezaDerecha() {
    if (!piezaActual) return;
    piezaActual.x++;
    if (colision()) {
        piezaActual.x--;
    }
}

function rotarPieza() {
    if (!piezaActual) return;
    const formaOriginal = piezaActual.forma;
    const nuevaForma = formaOriginal[0].map((val, index) => formaOriginal.map(row => row[index]).reverse());
    piezaActual.forma = nuevaForma;
    if (colision()) {
        piezaActual.forma = formaOriginal; // Revertir si hay colisión
    }
}

function colision() {
    if (!piezaActual) return false;
    return piezaActual.forma.some(bloque => {
        let x = piezaActual.x + bloque[0];
        let y = piezaActual.y + bloque[1];
        return (
            x < 0 ||
            x >= columnas ||
            y >= filas ||
            (y >= 0 && tablero[y][x] !== 0)
        );
    });
}

function fusionarPieza() {
    piezaActual.forma.forEach(bloque => {
        let x = piezaActual.x + bloque[0];
        let y = piezaActual.y + bloque[1];
        if (y >= 0 && y < filas && x >= 0 && x < columnas) {
            tablero[y][x] = piezaActual.color;
        }
    });
}

function eliminarFilasCompletas() {
    for (let y = filas - 1; y >= 0; y--) {
        if (tablero[y].every(valor => valor !== 0)) {
            puntuacion += 100;
            puntuacionElemento.textContent = puntuacion;
            tablero.splice(y, 1);
            tablero.unshift(Array(columnas).fill(0));
        }
    }
}

function gameOver() {
    juegoActivo = false;
    alert(`¡Game Over! Puntuación final: ${puntuacion}`);
    tablero = crearTablero();
    piezaActual = null;
    puntuacion = 0;
    puntuacionElemento.textContent = puntuacion;
    iniciarJuego();
}

function gameLoop() {
    if (juegoActivo) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarTablero();
        dibujarPieza();
        moverPiezaAbajo();
        setTimeout(gameLoop, velocidadCaida);
    }
}

function iniciarJuego() {
    tablero = crearTablero();
    piezaActual = crearNuevaPieza();
    juegoActivo = true;
    puntuacion = 0;
    puntuacionElemento.textContent = puntuacion;
    gameLoop();
}

document.addEventListener('keydown', (e) => {
    if (!juegoActivo || !piezaActual) return;
    switch (e.key) {
        case 'ArrowLeft':
            moverPiezaIzquierda();
            break;
        case 'ArrowRight':
            moverPiezaDerecha();
            break;
        case 'ArrowDown':
            moverPiezaAbajo();
            break;
        case 'ArrowUp':
            rotarPieza();
            break;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarTablero();
    dibujarPieza();
});

iniciarJuego();