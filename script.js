const personaje = document.getElementById('personaje');
const sombrero = document.getElementById('sombrero');
const puntajeMostrar = document.getElementById('puntos');
const contenedorJuego = document.querySelector('.contenedor-juego'); // Selección del contenedor

let velocidadSombrero = 4;
let puntaje = 0;
let sombreroDetenido = false; // Para saber si el sombrero está detenido

// Función para actualizar el sombrero según el puntaje
function actualizarSombrero() {
    const sombreroImg = sombrero.querySelector('img'); // Busca el elemento img dentro del sombrero
    if (puntaje === 5) {
        sombreroImg.src = 'img/sombrero_verde.png'; // Cambia a sombrero verde
    
    } else if (puntaje === 10) {
        sombreroImg.src = 'img/galera.png'; // Cambia a galera
    }
}


// Función para detener el sombrero
function pararSombrero() {
    if (sombreroDetenido) return; // Si ya está detenido, no hacer nada
    sombreroDetenido = true;
    sombrero.style.animationPlayState = 'paused'; // Pausa la animación

    // Obtener las posiciones del personaje y del sombrero
    const posicionPersonaje = personaje.getBoundingClientRect();
    const posicionSombrero = sombrero.getBoundingClientRect();

    // Calcular la posición horizontal central
    const centroSombreroX = posicionSombrero.left + posicionSombrero.width / 2;
    const centroPersonajeX = posicionPersonaje.left + posicionPersonaje.width / 2;
    const distanciaHorizontal = Math.abs(centroSombreroX - centroPersonajeX);

    // Verifica si el sombrero está alineado horizontalmente con el personaje
    if (distanciaHorizontal < 7) { // Tolerancia de px para el acierto
        puntaje++;
        puntajeMostrar.textContent = puntaje;
        puntajeMostrar.classList.add('animacion-puntos');
        setTimeout(() => puntajeMostrar.classList.remove('animacion-puntos'), 300);
        

        contenedorJuego.classList.add('puntaje-anotado');
        setTimeout(() => {
            contenedorJuego.classList.remove('puntaje-anotado');
        }, 500); // El borde verde se mantiene durante 500ms


        if (puntaje <= 15) {
            velocidadSombrero *= 0.9; // Aumentar velocidad hasta los 14 puntos
        }

        setTimeout(() => { // Reinicia el sombrero tras 800ms
            reiniciarSombrero();
        }, 800);
    } else {
        // Si no gana punto, reinicia el sombrero tras 400ms
        setTimeout(() => {
            reiniciarSombrero();
        }, 400);
    }
}

// Función para reiniciar el sombrero
function reiniciarSombrero() {
    sombreroDetenido = false; // Permitir que se detenga nuevamente
    sombrero.style.animation = 'none'; // Detener cualquier animación previa
    void sombrero.offsetWidth; // Forzar reinicio de la animación
    sombrero.style.animation = `moveHorizontal ${velocidadSombrero}s linear infinite`;
    actualizarSombrero(); // Cambiar sombrero si corresponde
}

// Event listener para la tecla Espacio
document.body.addEventListener('keydown', (evento) => {
    if (evento.code === 'Space') {
        pararSombrero();
    }
});
