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
        sombreroImg.src = 'img/sombrero_galera.png'; // Cambia a galera

    }
    
}


// Función para detener el sombrero
function pararSombrero() {
    if (sombreroDetenido) return; // Si ya está detenido, no hacer nada
    sombreroDetenido = true;
    sombrero.style.animationPlayState = 'paused'; // Pausa la animación

    // Calcular las posiciones de personaje y sombrero usando requestAnimationFrame
    requestAnimationFrame(() => {
        const posicionPersonaje = personaje.getBoundingClientRect();
        const posicionSombrero = sombrero.getBoundingClientRect();

        // Calcular la posición horizontal central
        const centroSombreroX = posicionSombrero.left + posicionSombrero.width / 2 ;
        const centroPersonajeX = posicionPersonaje.left + posicionPersonaje.width / 2;
        const distanciaHorizontal = Math.abs(centroSombreroX - centroPersonajeX);

        // Verifica si el sombrero está alineado horizontalmente con el personaje
        if (distanciaHorizontal < 6) { // Aumenté la tolerancia a 8px
            puntaje++;
            if (puntaje <= 16) {
                velocidadSombrero *= 0.9; // Aumentar velocidad hasta los 12 puntos
            }
            puntajeMostrar.textContent = puntaje;
            puntajeMostrar.classList.add('animacion-puntos');
            setTimeout(() => puntajeMostrar.classList.remove('animacion-puntos'), 500);

            contenedorJuego.classList.add('puntaje-anotado');
            setTimeout(() => {
                contenedorJuego.classList.remove('puntaje-anotado');
            }, 900); // El borde verde se mantiene durante 500ms

            setTimeout(() => { // Reinicia el sombrero tras 800ms
                reiniciarSombrero();
            }, 900);
        } else {
            // Si no gana punto, reinicia el sombrero tras 400ms
            setTimeout(() => {
                reiniciarSombrero();
            }, 400);
            contenedorJuego.classList.add('fallo');
            setTimeout(() => {
                contenedorJuego.classList.remove('fallo');
            }, 400); // El borde verde se mantiene durante 500ms
        }
    });
}

// Event listener para la tecla Espacio
document.body.addEventListener('keydown', (evento) => {
    if (evento.code === 'Space') {
        pararSombrero();
    }
});

// Función para reiniciar el sombrero
function reiniciarSombrero() {
    sombreroDetenido = false; // Permitir que se detenga nuevamente
    sombrero.style.animation = 'none'; // Detener cualquier animación previa
    void sombrero.offsetWidth; // Forzar reinicio de la animación
    sombrero.style.animation = `moveHorizontal ${velocidadSombrero}s linear infinite`;
    actualizarSombrero(); // Cambiar sombrero si corresponde
}
