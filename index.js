//Enables to draw using mouse click AND drag
let mouseDown = false;
document.body.addEventListener('mousedown', () => (mouseDown = true));
document.body.addEventListener('mouseup', () => (mouseDown = false));

const container = document.querySelector('#container');
const slider = document.getElementById('slider');
const size = document.getElementById('size');

//Slider function
slider.addEventListener('change', (e) => {
    changeBoardSize(e.target.value);
});

function changeBoardSize(gridSize) {
    updateSize(gridSize);
    refreshBoard();
    createBoard(gridSize);
     console.log(gridSize);  
}

function refreshBoard() {
    container.innerHTML = ''
}

function updateSize(newValue) {
    size.innerHTML = `${newValue} x ${newValue}`;
}

function createBoard(gridSize) {
    container.style.setProperty('--grid-num', gridSize); 
    for(let i = 0; i < (gridSize**2) ; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('mouseover', draw);
        cell.addEventListener('mousedown', draw);
        container.appendChild(cell).className = "cell";
    }; 
}

function draw(e) {
    // if not clicked AND hovered, do not change color
    if (e.type === 'mouseover' && !mouseDown) return;
    e.target.style.background = 'black';
}

createBoard(slider.value);

