const personaje = document.getElementById('personaje');
const sombrero = document.getElementById('sombrero');
const puntajeMostrar = document.getElementById('puntos');

let puntaje = 0;
let sombreroDetenido = false; // para saber si el gorro esta detenido

function pararSombrero() {
    if (sombreroDetenido) return; // Evita múltiples activaciones
    sombreroDetenido = true;
    sombrero.style.animationPlayState = 'paused'; // Pausa la animación

    // Obtener la posición del personaje y del sombrero
    const posicionPersonaje = personaje.getBoundingClientRect();
    const posicionSombrero = sombrero.getBoundingClientRect();

    // Calcular la posición horizontal central del personaje y del sombrero
    const centroSombreroX = posicionSombrero.left + posicionSombrero.width / 2;
    const centroPersonajeX = posicionPersonaje.left + posicionPersonaje.width / 2;
    const distanciaHorizontal = Math.abs(centroSombreroX - centroPersonajeX);

    // Ajuste para verificar si el sombrero está alineado horizontalmente con el personaje
    if (distanciaHorizontal < 8) { // Asegura una tolerancia de 15px para el acierto
        puntaje++;
        puntajeMostrar.textContent = puntaje;
    }

    // Reiniciar el sombrero después de 1 segundo
    setTimeout(() => {
        sombreroDetenido = false;
        sombrero.style.animation = 'none'; // Reinicia la animación
        void sombrero.offsetWidth; // Forzar el reinicio
        sombrero.style.animation = 'moveHorizontal 2s linear infinite'; // Reinicia el movimiento
    }, 500);
}

document.body.addEventListener('keydown', (evento) => {
    if (evento.code === 'Space') {
        pararSombrero();
    }
});
