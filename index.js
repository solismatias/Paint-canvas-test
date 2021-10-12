const canvas = document.querySelector(".canvas")
const colorList = document.querySelector(".colors__selector")
const colorPicker = document.querySelector(".color-picker")
const strokeWidthSelector = document.querySelector(".strokeWidth")
const dotSize = document.querySelector(".size__dot")
const strokeWidthLabelValue = document.querySelector(".strokeWidth__value")
const ctx = canvas.getContext('2d')
let color = "#383838" // el color por defecto
let strokeValue = 20 // medida por defecto
let isDrawing

function selectColor(e) {
    switch (e.target.classList[1]) {
        case "red": color = "#FF0000"
            break
        case "orange": color = "#F7630C"
            break
        case "yellow": color = "#FFF100"
            break
        case "green": color = "#16C60C"
            break
        case "blue": color = "#0078D7"
            break
        case "violet": color = "#886CE4"
            break
        case "brown": color = "#8E562E"
            break
        case "black": color = "#383838"
            break
        case "white": color = "#F2F2F2"
            break
        default: color = e.target.value
    }
    dotColor()
}



function startDraw(e) { // pa dibujar formas
    if (isDrawing === true) {
        const formType = document.querySelectorAll('input[name="formtype"]:checked') // me traigo la forma que este seleccionada
        const solidStroke = document.querySelector(".solidStroke:checked")
        let x = e.offsetX
        let y = e.offsetY
        ctx.beginPath();
        ctx.fillStyle = color
        if (formType[0].value === 'square') {
            if (solidStroke) {
                ctx.fillRect(x, y, strokeValue, strokeValue)
            } else {
                ctx.strokeRect(x, y, strokeValue, strokeValue)
            }
        }
        else if (formType[0].value === 'line') {
            // ctx.beginPath();
            ctx.moveTo(x, y);
            canvas.addEventListener("mouseup", () => {
                ctx.lineTo(x, y);
                // ctx.fill()
            })
        }
        else {
            ctx.arc(x, y, strokeValue / 2, 0, Math.PI * 2, true); // Circulo
        }
        if (solidStroke) {
            ctx.fill(); // para hacerlo solido
        } else {
            ctx.stroke(); // para hacerlo con lineas
        }
    }
}

function moveDraw() {
    canvas.addEventListener("mousemove", startDraw)
}


function dotColor() {
    dotSize.style.color = color
}

colorList.addEventListener("click", selectColor) // para seleccionar uno de los colores predeterminados
colorPicker.addEventListener("change", selectColor) // para seleccionar cualquier color de la paleta de colores

strokeWidthSelector.addEventListener("mousemove", (e) => {
    strokeValue = e.target.value
    strokeWidthLabelValue.innerText = e.target.value
    dotSize.style.fontSize = `${strokeValue}px`
})

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true
    startDraw(e)
    moveDraw()
})

canvas.addEventListener("mouseup", () => {
    isDrawing = false
})
canvas.addEventListener("mouseleave", () => {
    isDrawing = false
})