function init(){
    const titulo = document.querySelector('.titulo')
    const revanchaButton = document.querySelector('.revancha')
    const fichas = document.querySelectorAll('.fichas')
    let huecos = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let currentPlayer = 'jugadorX'

    // bucle en toda la tabla de fichas

    fichas.forEach(item => {
        item.addEventListener('click', (e) => {
            
            //moviemiento jugador
            const index = Array.from(fichas).indexOf(e.target)
            if(
                fichas[index].classList.contains('jugadorX')|
                fichas[index].classList.contains('jugadorY')
            ){
                return
            }

            fichas[index].classList.add('jugadorX')

            // unir el movimiento de la siguiente lista
            const contenido = huecos.indexOf(index + 1)
         huecos.splice(contenido, 1)

            // comprobar victoria
            if(winCheck('jugadorX', fichas)){
                titulo.innerHTML = "jugador X gana!!"
                document.body.classList.add('fin')
                return
            }

            //comprobar empate
            if(huecos.length === 0){
                titulo.innerHTML = "Ningún ganador..."
                document.body.classList.add('fin')
                return
            }

            //movimiento ordenador
            const random = Math.floor(Math.random() * huecos.length)
            const ordenadorIndex = huecos[random]
            fichas[ordenadorIndex - 1].classList.add('jugadorY')

            // unir el movimiento de la siguiente lista
         huecos.splice(random, 1)

            // comprobar victoria ordenador
            if(winCheck('jugadorY', fichas)){
                titulo.innerHTML = "Ordenador gana!!"
                document.body.classList.add('fin')
            }
        })
    })
    revanchaButton.addEventListener('click', () => {
        location.reload()
    })
}
init()

function winCheck(nombreJugador, fichas){
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
    if(check(0, 3, 6) ) return true
    else if (check(1, 4, 7)) return true
    else if (check(0, 1, 2)) return true
    else if (check(2, 5, 8)) return true
    else if (check(3, 4, 5)) return true
    else if (check(6, 7, 8)) return true
    else if (check(2, 4, 6)) return true
    else if (check(0, 4, 8)) return true
}