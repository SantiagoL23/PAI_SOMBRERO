// var posicionSombrero = 0;
// var velocidad = 15; 
// var intervaloMovimiento;

// function iniciarMovimiento() {
//     var sombrero = document.getElementById('sombrero');
//     var contenedorJuego = document.querySelector('.contenedor-juego');

//     intervaloMovimiento = setInterval(() => {
//         posicionSombrero += velocidad;
//         sombrero.style.left = posicionSombrero + 'px';

//         if (posicionSombrero > contenedorJuego.offsetWidth) {
//             posicionSombrero = -sombrero.offsetWidth;
//         } }, 23);
// }

// function detenerMovimiento() {
//     clearInterval(intervaloMovimiento);
// }

// window.onload = iniciarMovimiento;

// document.getElementById('sombrero').onclick = detenerMovimiento;


const personaje = document.getElementById('personaje');
const sombrero = document.getElementById('sombrero');
const puntajeMostrar = document.getElementById('puntaje');

let puntaje = 0;
let sombreroDetenido = false; // para saber si el gorro esta detenido

function pararSombrero() {
    if (sombreroDetenido) return; // 
    hatStopped = true;
    sombrero.style.animationPlayState = 'paused'; // pausa la animación del gorro
    }