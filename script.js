const personaje = document.getElementById('personaje'); // Selección del personaje
const sombrero = document.getElementById('sombrero');   // Selección del sombrero
const puntajeMostrar = document.getElementById('puntos'); // Selección del puntaje
const contenedorJuego = document.querySelector('.contenedor-juego'); // Selección del contenedor

let velocidadSombrero = 4;   // Tiempo que tarda el sombrero en cruzar la pantalla
let puntaje = 0;        
let sombreroDetenido = false; // Para saber si el sombrero está detenido


// Función para detener el sombrero
function pararSombrero() {
    if (sombreroDetenido) return; // Si ya está detenido, no hacer nada
    sombreroDetenido = true; // Marcar el sombrero como detenido
    sombrero.style.animationPlayState = 'paused'; // Pausa la animación

    // Usamos requestAnimationFrame para asegurar que las posiciones sean precisas
    requestAnimationFrame(() => {
        const posicionPersonaje = personaje.getBoundingClientRect(); // Obtener posición del personaje
        const posicionSombrero = sombrero.getBoundingClientRect();  // Obtener posición del sombrero

        // Calcular la posición horizontal 
        const centroSombreroX = posicionSombrero.left + posicionSombrero.width / 2 ; // Centro del sombrero
        const centroPersonajeX = posicionPersonaje.left + posicionPersonaje.width / 2; // Centro del personaje
        const distanciaHorizontal = Math.abs(centroSombreroX - centroPersonajeX); // Distancia entre ambos centros

        // Verifica si el sombrero está alineado horizontalmente con el personaje
        if (distanciaHorizontal < 7) { // Tolerancia de 7px a la izquierda y derecha desde el centro
            puntaje++;
            if (puntaje < 17) {  // Si el puntaje es menor a 17 entonces aumentara la velocidad
                velocidadSombrero *= 0.9; 
            }
            puntajeMostrar.textContent = puntaje;  // Para mostrar el puntaje
            puntajeMostrar.classList.add('animacion-puntos'); // Animación para el puntaje cuando aumenta
            setTimeout(() => puntajeMostrar.classList.remove('animacion-puntos'), 500); // Remover la animación luego de 500ms

            contenedorJuego.classList.add('puntaje-anotado');  // Animación para el borde del contenedor cuando aumenta un punto
            setTimeout(() => {
                contenedorJuego.classList.remove('puntaje-anotado');
            }, 900); // El borde verde se mantiene durante 900ms

            setTimeout(() => { // Si se anota un punto reinicia el sombrero tras 900ms  (para contemplar mejor la belleza del personaje con el gorrito <3)
                reiniciarSombrero();
            }, 900);
        } else {
            // Si no anotas un punto, reinicia el sombrero tras 400ms
            setTimeout(() => {
                reiniciarSombrero();
            }, 400);
            contenedorJuego.classList.add('fallo'); // Animación para el borde del contenedor cuando no se anota un punto
            setTimeout(() => {
                contenedorJuego.classList.remove('fallo');
            }, 400); // El borde rojo se mantiene durante 400ms
        }
    });
}

// Función para actualizar el sombrero según el puntaje
function actualizarSombrero() {
    const sombreroImg = sombrero.querySelector('img'); // Busca el elemento img dentro del sombrero
    if (puntaje === 5) {
        sombreroImg.src = 'img/sombrero_verde.png'; // Cambia a sombrero verde
    } else if (puntaje === 10) {
        sombreroImg.src = 'img/sombrero_morado.png'; // Cambia a morado
    } else if (puntaje === 15) {
        sombreroImg.src = 'img/galera.png'; // Cambia a galera
    }
}

// Función para reiniciar el sombrero
function reiniciarSombrero() {
    sombreroDetenido = false; // Permitir que se detenga nuevamente
    sombrero.style.animation = 'none'; // Detener cualquier animación previa
    void sombrero.offsetWidth; // Forzar reinicio de la animación
    sombrero.style.animation = `moveHorizontal ${velocidadSombrero}s linear infinite`; // Para que la velocidad del sombrero sea variable según las condiciones establecidas
    actualizarSombrero(); // Cambiar sombrero por otro si se cumple la condición de la función
}

// Event listener para la tecla Espacio (para parar el sombrero)
document.body.addEventListener('keydown', (evento) => {
    if (evento.code === 'Space') {
        pararSombrero();
    }
});
