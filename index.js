let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//Slider functions
const slider = document.getElementById('slider');
const size = document.getElementById('size');
slider.onmousemove = (e) => updateSize(e.target.value);

function updateSize(newValue) {
    size.innerHTML = `${newValue} x ${newValue}`;
}

function createDrawingBoard(gridSize) {
    const container = document.querySelector('#container');
    container.style.setProperty('--grid-num', gridSize); 
    for(let i = 0; i < (gridSize**2) ; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('mouseover', changeColor);
        cell.addEventListener('mousedown', changeColor);
        container.appendChild(cell).className = "cell";
    }; 
}

function changeColor(e) {
    // if not clicked AND hovered, do not change color
    if (e.type === 'mouseover' && !mouseDown) return;
    e.target.style.background = 'black';
}

createDrawingBoard();



