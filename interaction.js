const rowContainer = document.getElementById('canvas-row-container');
const canvasContainer = document.querySelector("canvas");
const colorSelector = document.getElementById('color-selector');
const gridSelector = document.getElementById('grid-selector');
const applyButton = document.getElementById('apply');
const resetButton = document.getElementById('reset');

//used to clear out the canvas from previous grid. Should be bound
//to reset button event listener and grid update.
function clearCanvas() {
    rowContainer.innerHTML = '';
}

//fills canvas with specified gridSize divs
//should be called whenever the grid selector is updated
function fillCanvas(gridSize) {
    for(let i = 0; i < gridSize; ++i) {
        const newRow = document.createElement('div');
            newRow.setAttribute("style", "display: flex; flex-direction: row; flex-grow: 1;")
        for(let j = 0; j < gridSize; ++j) {
            newRow.appendChild(setupPixelDiv());
        }
        rowContainer.appendChild(newRow);
    }
}

//prepares 'pixel div' to be added inside a pixel row in canvas
function setupPixelDiv() {
    const pixelDiv = document.createElement('div');
    pixelDiv.setAttribute("style", "background: white; flex-grow: 1;");
    pixelDiv.addEventListener('mouseover', () => {
        pixelDiv.style.backgroundColor = colorSelector.value;
    });
    return pixelDiv;
}

function setupCanvas() {
    clearCanvas();
    fillCanvas(gridSelector.value);
}

applyButton.addEventListener("click", setupCanvas);