
// numero random entre 0 y X-1
const numRandom = (max = 0) => {
    num = Math.random() * max
    num = Math.floor(num)
    return num
}

const containerIformation=document.getElementById("containerInfo")

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
const paintBackground = (elementId, color) => document.getElementById(elementId).style.background = color

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
let resultado = false

//Mostrar Secuencia en pantalla
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
passedLevel = () => {
    document.getElementById("userMenssage").innerHTML = "COMPLETE"
    document.getElementById("runGame").innerHTML = "SIGUIENTE"
    document.getElementById("levelGame").innerHTML = Number(document.getElementById("levelGame").innerHTML) + 1
    setTimeout(showInfo, 500)
}

failedLevel = () => {
    document.getElementById("userMenssage").innerHTML = "FAIL"
    document.getElementById("runGame").innerHTML = "REINICIAR"
    document.getElementById("levelGame").innerHTML = 1
    setTimeout(showInfo, 500)
    
}

showInfo=()=>{
    containerIformation.style.opacity = "100%"
    containerIformation.style.zIndex="1"
    cleanSequence()
    gamePlay = false
}
cleanSequence = () => {
    userSequence = []
    sequence = []
}

executeUserAction=(userAction)=>{
    if (gamePlay && userSequence.length < sequence.length) {
        let userColor = getUserColors(userAction)
        paintBackground("boxSimonSay", userColor)
        userSequence.push(userColor)
        setTimeout(paintBackground, 500, "boxSimonSay", "#FFF")
    }
    if (gamePlay && userSequence.length === sequence.length) {
        for (let i = 0; i < sequence.length; i++) {
            if (colors[sequence[i]]!=userSequence[i]){
                failedLevel()
                return
            }
        }
        passedLevel()
    }

}

//Eventos

document.addEventListener("keydown", function (event) {
    executeUserAction(event.key)
})




//Evento al presionarl comenzar
document.getElementById("runGame").addEventListener("click", function () {
    containerIformation.style.opacity = "0%"
    containerIformation.style.zIndex="-1"
    let userLevel = Number(document.getElementById("levelGame").innerHTML)
    sequence = runSequence(userLevel)
    gamePlay = true
})


// document.addEventListener("click",function(event){
//     console.log(event.id)
// })


