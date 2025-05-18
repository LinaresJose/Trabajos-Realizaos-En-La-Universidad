const canvas = document.getElementById('serpienteCanvas');
const ctx = canvas.getContext('2d');
const puntuacionElemento = document.getElementById('puntuacionSerpiente');

const tamañoCuadro = 20;
let velocidad = { x: 1, y: 0 };
let serpiente = [{ x: 10, y: 10 }];
let comida = generarComida();
let puntuacion = 0;

function generarComida() {
    return {
        x: Math.floor(Math.random() * (canvas.width / tamañoCuadro)),
        y: Math.floor(Math.random() * (canvas.height / tamañoCuadro))
    };
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarComida();
    dibujarSerpiente();
}

function dibujarComida() {
    ctx.fillStyle = 'red';
    ctx.fillRect(comida.x * tamañoCuadro, comida.y * tamañoCuadro, tamañoCuadro, tamañoCuadro);
}

function dibujarSerpiente() {
    serpiente.forEach((segmento, indice) => {
        ctx.fillStyle = indice === 0 ? 'green' : 'lime';
        ctx.fillRect(segmento.x * tamañoCuadro, segmento.y * tamañoCuadro, tamañoCuadro, tamañoCuadro);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(segmento.x * tamañoCuadro, segmento.y * tamañoCuadro, tamañoCuadro, tamañoCuadro);
    });
}

function actualizar() {
    const cabeza = { x: serpiente[0].x + velocidad.x, y: serpiente[0].y + velocidad.y };
    serpiente.unshift(cabeza);

    if (cabeza.x === comida.x && cabeza.y === comida.y) {
        puntuacion++;
        puntuacionElemento.textContent = puntuacion;
        comida = generarComida();
    } else {
        serpiente.pop();
    }

    if (haColisionado()) {
        gameOver();
        return;
    }

    dibujar();
    setTimeout(actualizar, 100); // Velocidad del juego
}

function haColisionado() {
    const cabeza = serpiente[0];
    // Colisión con las paredes
    if (cabeza.x < 0 || cabeza.x * tamañoCuadro >= canvas.width || cabeza.y < 0 || cabeza.y * tamañoCuadro >= canvas.height) {
        return true;
    }
    // Colisión consigo misma
    for (let i = 1; i < serpiente.length; i++) {
        if (cabeza.x === serpiente[i].x && cabeza.y === serpiente[i].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    alert(`¡Game Over! Puntuación final: ${puntuacion}`);
    serpiente = [{ x: 10, y: 10 }];
    velocidad = { x: 1, y: 0 };
    puntuacion = 0;
    puntuacionElemento.textContent = puntuacion;
    comida = generarComida();
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (velocidad.y === 0) velocidad = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (velocidad.y === 0) velocidad = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (velocidad.x === 0) velocidad = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (velocidad.x === 0) velocidad = { x: 1, y: 0 };
            break;
    }
});

actualizar();