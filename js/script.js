const jugador = document.getElementById("jugadorimg")
const pc = document.getElementById("pcimg")
const btnstart = document.getElementById("btnstart")
const result = document.getElementById("result")

const opciones = ["piedra", "papel", "tijera"]

function playSounds(soundFilePath){
    const audio = new Audio(soundFilePath);
    audio
    .play()
    .catch((error) => console.error("Error", error));
}

btnstart.addEventListener("click", () => {
    playSounds('assets/sounds/click.mp3');
    playSounds('assets/sounds/spin.mp3');
    result.innerHTML = "Jugando..."
    let indice = 0;
    const intervalo = setInterval( () => {
        const img = `./assets/img/${opciones[indice]}.png`;
        jugador.src = img;
        pc.src = img;
        indice == 2 ? indice = 0 : indice ++;
    }, 100);
    setTimeout( () => {
        clearInterval(intervalo);
        const jugadaJugador = opciones[Math.floor(Math.random()* 3)];
        const jugadaPC = opciones[Math.floor(Math.random()* 3)];
        jugador.src = `./assets/img/${jugadaJugador}.png`;
        pc.src = `./assets/img/${jugadaPC}.png`;

        let mensaje = "";

        if(jugadaJugador === jugadaPC) {
            mensaje = "Empate"; playSounds('assets/sounds/empate.mp3');
        }else if(
            (jugadaJugador === "piedra" && jugadaPC === "tijera") ||
            (jugadaJugador === "papel" && jugadaPC === "piedra") ||
            (jugadaJugador === "tijera" && jugadaPC === "papel")){
                mensaje = "¡Has Ganado!"; playSounds('assets/sounds/win.mp3');
            } else {
                mensaje = "¡Has Perdido!";playSounds('assets/sounds/lose.mp3');
            }
            result.innerHTML = `<p>${mensaje}</p>`
    }, 3500);
})