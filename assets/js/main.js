
// numero random entre 0 y X-1
const numRandom = (x = 0) => {
    num = Math.random() * 10
    num = Math.floor(num)
    if (num > x) {
        numRandom()
    }
    return num
}



//Colores simon dice
let colors = ["var(--color1)", "var(--color2)", "var(--color3)", "var(--color4)"]

//Color indicado por usuario
getUserColors = (userKey) => {

    switch (userKey) {
        case "ArrowUp":
        case "w":
            return colors[0]
            break
        case "ArrowLeft":
        case "a":
            return colors[1]
            break
        case "ArrowDown":
        case "s":
            return colors[2]
            break
        case "ArrowRight":
        case "d":
            return colors[3]
            break
    }
}

//Pintar elemento html
const paintBackground = (elementId, color) => document.getElementById(elementId).style.backgroundColor = color

//Generador de secuencia entre 0 y 3
generateSequence = (userNum) => {
    let seq = []
    while (seq.length < userNum) {
        seq.push(numRandom(4))
    }
    return seq
}

let userSequence = []
let sequence = []
let gamePlay = false
let resultado=false

runSequence = (level) => {
    sequence = generateSequence(level)
    for (let i = 0; i < sequence.length; i++) {
        let time = 500 + i * 1000
        let time2 = 1000 + i * 1000
        setTimeout(paintBackground, time, "boxSimonSay", colors[sequence[i]])
        setTimeout(paintBackground, time2, "boxSimonSay", "#FFF")
    }
    return sequence
}


//Evento keydown User


//Volver a color original
document.addEventListener("keyup", function (event) {
    setTimeout(paintBackground, 100, "boxSimonSay", "#FFF")
})

document.addEventListener("keydown", function (event) {
    if (gamePlay && userSequence.length < sequence.length) {
        let userColor = getUserColors(event.key)
        paintBackground("boxSimonSay", userColor)
        userSequence.push(userColor)
    }
    if(gamePlay && userSequence.length === sequence.length){
        for (let i = 0; i < sequence.length; i++) {
            if(colors[sequence[i]]===userSequence[i]){
                resultado=true
            }
        }
        
        if (resultado){
            document.getElementById("userMenssage").innerHTML="CORRECTO!"
            document.getElementById("runGame").innerHTML="Siguiente"
            document.getElementById("levelGame").innerHTML=Number(document.getElementById("levelGame").innerHTML)+1
            gamePlay=false
        }
    }
})

//Evento al presionarl comenzar
document.getElementById("runGame").addEventListener("click", function () {
    document.getElementById("userMenssage").innerHTML="VAMOS!"
    let userLevel = Number(document.getElementById("levelGame").innerHTML)
    sequence = runSequence(userLevel)
    gamePlay = true
})