// Inicia el juego al cargar la página
function init(){
    const titulo = document.querySelector('.titulo')
    const revanchaButton = document.querySelector('.revancha')
    const fichas = document.querySelectorAll('.fichas')
    // Lista que representa los huecos vacíos (1 al 9)
    let huecos = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let currentPlayer = 'jugadorX'

    // Bucle en toda la tabla de fichas
    // Recorremos todas las casillas y les añadimos evento de click
    fichas.forEach(item => {
        item.addEventListener('click', (e) => {
            
            // TURNO JUGADOR X
            // Averiguamos qué casilla se ha pulsado
            const index = Array.from(fichas).indexOf(e.target)
             // Si esa casilla ya tiene una clase del jugador X o Y, no se puede jugar ahí
            if(
                fichas[index].classList.contains('jugadorX')|
                fichas[index].classList.contains('jugadorY')
            ){
                return // Salimos sin hacer nada
            }
            // Añadimos la clase del jugador a esa ficha
            fichas[index].classList.add('jugadorX')

            // Quitamos esa posición de la lista de huecos disponibles
            const contenido = huecos.indexOf(index + 1)
         huecos.splice(contenido, 1)

            // Comprobar victoria Jugador X
            if(winCheck('jugadorX', fichas)){
                titulo.innerHTML = "jugador X gana!!"
                document.body.classList.add('fin') // Desactivamos clics
                return
            }

            // Comprobamos si ya no quedan huecos → empate
            if(huecos.length === 0){
                titulo.innerHTML = "Ningún ganador..."
                document.body.classList.add('fin')
                return
            }

            // TURNO DEL ORDENADOR (jugadorY)
            const random = Math.floor(Math.random() * huecos.length) // Coge hueco al azar
            const ordenadorIndex = huecos[random]
            fichas[ordenadorIndex - 1].classList.add('jugadorY') // Añade ficha

            // Eliminamos ese hueco
         huecos.splice(random, 1)

            // Comprobar victoria ordenador
            if(winCheck('jugadorY', fichas)){
                titulo.innerHTML = "Ordenador gana!!"
                document.body.classList.add('fin')
            }
        })
    })
    // Evento para reiniciar la partida (recarga la página)
    revanchaButton.addEventListener('click', () => {
        location.reload()
    })
}
// Llamamos a la función para iniciar todo
init()
// Función que comprueba si un jugador ha ganado
function winCheck(nombreJugador, fichas){
    // Función interna que comprueba 3 posiciones específicas
    function check(pos1, pos2, pos3){
        if(
            fichas[pos1].classList.contains(nombreJugador) &
            fichas[pos2].classList.contains(nombreJugador) &
            fichas[pos3].classList.contains(nombreJugador) 
        ){
            return true
        }else{
            return false
        }
    }
    // Combinaciones ganadoras posibles
    if(check(0, 3, 6) ) return true
    else if (check(1, 4, 7)) return true
    else if (check(0, 1, 2)) return true
    else if (check(2, 5, 8)) return true
    else if (check(3, 4, 5)) return true
    else if (check(6, 7, 8)) return true
    else if (check(2, 4, 6)) return true
    else if (check(0, 4, 8)) return true
}