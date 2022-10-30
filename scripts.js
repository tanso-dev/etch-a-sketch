const INITIAL_GRID=16;
const INITIAL_COLOR="#333333";
const INITIAL_MODE = "pen";

//sets default values for the main components
let currentColor = INITIAL_COLOR;
let currentMode = INITIAL_MODE;
let gridSize = INITIAL_GRID;

function setCurrentColor(newColor) {
    currentColor = newColor
    console.log(currentColor);
}
  
function setCurrentMode(newMode) {
    console.log(newMode);
    activateButton(newMode)
    currentMode = newMode
}
  
function setCurrentSize(newSize) {
    gridSize = newSize
}


//selects all the different buttons
const colorPicker = document.getElementById("colorPicker");
const penBtn = document.getElementById("penBtn");

//const watercolorBtn = document.getElementById("watercolorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById('eraserBtn');
//const softEraserBtn = document.getElementById('softEraserBtn');
const clearBtn = document.getElementById('clearBtn');
const gridToggleBtn = document.getElementById('gridToggleBtn');
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');

//set eventListeners to all inputs
colorPicker.oninput = (e) => setCurrentColor(e.target.value)
penBtn.onclick = (e) => setCurrentMode('pen')
//watercolorBtn.onclick = () => setCurrentMode('watercolor')
rainbowBtn.onclick = (e) => setCurrentMode('rainbow')
eraserBtn.onclick = (e) => setCurrentMode('eraser')
//softEraserBtn.onclick = () => setCurrentMode('softEraser');
clearBtn.onclick = () => reloadGrid()
gridToggleBtn.onclick = () => toggleGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

//this allows you to click and drag the etch-a-sketch as opposed to just having the hover effect
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//change size of the current grid
function changeSize(value) {
    //sets current grid size
    setCurrentSize(value)
    //updates value on the UI
    updateSizeValue(value)
    //reloads to screen
    reloadGrid()
}

//update size value in UI
function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

function reloadGrid() {
    //clears grid
    clearGrid()
    //sets up new grid
    createGrid(gridSize)
}

function clearGrid() {
    //clears all current grid items in the etch-a-sketch area
    container.innerHTML = ''
}

const container = document.querySelector(".etch-sketch_grid");


function createGrid(){

    //-50 to compensate for the padding.
    let gridWidth = (container.offsetWidth-50) / gridSize;

    //repeats the columns
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    //repeats the row
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr`;

    //repeats for gridSize^2
    for (let i=0; i < gridSize**2; i++){
        const square = document.createElement('div');
        square.classList.add('grid-item');
        square.setAttribute('draggable',false);
        //for drags
        square.addEventListener('mouseover', changeColor)
        //for single clicks
        square.addEventListener('mousedown', changeColor)
        container.appendChild(square);
    }
}

function changeColor(e){
    //if it's over but it's not held down, break
    if (e.type === 'mouseover' && !mouseDown) return

    console.log("went into color change");
    //for rainbow mode
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } 
    //for pen mode
    else if (currentMode === 'pen') {
        e.target.style.backgroundColor = currentColor
    } 
    /*
    else if(currentMode === 'watercolor'){
        let color = currentColor.slice(0,6);
        let alpha = currentColor.slice(5);
        console.log(color);
        console.log(alpha);

        if (e.target.style.backgroundColor == currentColor)
        e.target.style.backgroundColor = currentColor+"10"
    }*/
    //for eraser mode
    else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#ffffff'
    }
    else if (currentMode === 'softEraser'){
        e.target.style.backgroundColor = "#ffffff10"
    }

}

const buttonContainer = document.getElementById('buttonContainer');
const buttons = buttonContainer.querySelectorAll('.color-modes');
console.log(buttons);
function activateButton(buttonType) {
    console.log(buttonType);
    buttons.forEach((button)=>{
        console.log(button.classList);
        button.classList.remove("active");

    });

    switch (buttonType){
        case 'pen':
            console.log('went in pen.')
            penBtn.classList.add('active');
            break;
        case 'rainbow':
            console.log('went in rainbow.')
            rainbowBtn.classList.add('active');
            break;
        default:
            break;
    }

}

function toggleGrid(){
    container.classList.toggle("show-lines");
}
createGrid();

