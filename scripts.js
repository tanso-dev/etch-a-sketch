const INITIAL_GRID=8;
const INITIAL_COLOR="#333";

const container = document.querySelector(".etch-sketch_grid");

let gridSize = INITIAL_GRID;
function createGrid(){

    //-50 to compensate for the padding.
    let gridWidth = (container.offsetWidth-50) / gridSize;

    //repeats the columns
    container.style.gridTemplateColumns = `repeat(${gridSize},${gridWidth}px)`;
    //repeats the row
    container.style.gridTemplateRows = `repeat(${gridSize},${gridWidth}px)`;

    //repeats for gridSize^2
    for (let i=0; i < gridSize**2; i++){
        const square = document.createElement('div');
        square.classList.add('grid-item');
        square.setAttribute('draggable', 'false');
        square.style.backgroundColor = 'transperent';
        container.appendChild(square);
        square.classList.add('border-top-left');
    }
}
createGrid();