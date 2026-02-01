const rowContainer = document.getElementById('canvas-row-container');
const canvasContainer = document.querySelector("canvas");
const brushSelector = document.getElementById('brush-selector');
const bgSelector = document.getElementById('canvas-selector');
const gridSelector = document.getElementById('grid-selector');
const applyButton = document.getElementById('apply');
const resetButton = document.getElementById('reset');
const gridWarning = document.getElementById('grid-warning');

let bgColor = bgSelector.value;
let brushColor = brushSelector.value;
let grid = gridSelector.value;

setupCanvas();

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
            newRow.setAttribute("style", "display: flex; flex-direction: column; flex: 1; align-items: stretch;")
        for(let j = 0; j < gridSize; ++j) {
            newRow.appendChild(setupPixelDiv());
        }
        rowContainer.appendChild(newRow);
    }
}

//prepares 'pixel div' to be added inside a pixel row in canvas
function setupPixelDiv() {
    const pixelDiv = document.createElement('div');
    pixelDiv.setAttribute("style", "flex: 1;");
    pixelDiv.style.backgroundColor = bgColor;
    pixelDiv.addEventListener('mouseover', () => {
        pixelDiv.style.backgroundColor = brushSelector.value;
    });
    return pixelDiv;
}

function updateColors() {
    bgColor = bgSelector.value;
    brushColor = brushSelector.value;
}

function updateGrid() {
    if(gridSelector.value < gridSelector.min)
        grid = gridSelector.min;
    else if(gridSelector.value > gridSelector.max) 
        grid = gridSelector.max;
    else
        grid = gridSelector.value;
}

function updateSettings() {
    updateColors();
    updateGrid();
}

function setupCanvas() {
    clearCanvas();
    updateSettings();
    fillCanvas(grid);
}

function resetCanvas() {
    clearCanvas();
    fillCanvas(grid);
}

applyButton.addEventListener("click", setupCanvas);
resetButton.addEventListener("click", resetCanvas);

gridSelector.addEventListener("input", function(event) {
    const min = Number(gridSelector.min);
    const max = Number(gridSelector.max);
    const value = Number(gridSelector.value);
    if(value < min || value > max) {
        gridWarning.style.display = "inline";
        grid = event
    } else {
        gridWarning.style.display = "none";
        grid = event.target.value;
    }
    console.log("Grid value updated.");
});

brushSelector.addEventListener("input", function(event) {
    brushColor = event.target.value;
    console.log("Brush color updated.");
});

bgSelector.addEventListener("input", function(event) {
    bgColor = event.target.value;
    console.log("Background Color Changed.")
});