//Enables to draw using mouse click AND drag
let mouseDown = false;
document.body.addEventListener('mousedown', () => (mouseDown = true));
document.body.addEventListener('mouseup', () => (mouseDown = false));

const container = document.querySelector('#container');
const slider = document.getElementById('slider');
const size = document.getElementById('size');
const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('color');
const rainbowBtn = document.getElementById('rainbow');
const shade = document.getElementById('shade');
const eraser = document.getElementById('eraser');
const clear = document.getElementById('clear');

let currentMode = 'color'; 
let gridSize = slider.value;

//Change modes
//click btn => change mode (btn becomes active, others are deactivated)
// => btn gets highlighted => 
colorBtn.addEventListener('click', () => changeMode(colorBtn.id));
rainbowBtn.addEventListener('click', () => changeMode(rainbowBtn.id));
shade.addEventListener('click', () => changeMode(shade.id));
eraser.addEventListener('click', () => changeMode(eraser.id));
clear.addEventListener('click', () => refreshBoard(gridSize));

function changeMode(mode) {
    currentMode = mode;
    activateBtn(currentMode);    
}

function activateBtn(mode) {
    console.log(mode);
}

//Slider function
slider.addEventListener('change', (e) => {
    gridSize = e.target.value;
    changeBoardSize(gridSize);
});

function changeBoardSize(inputSize) {
    updateSize(inputSize);
    refreshBoard(inputSize);
}

function refreshBoard(inputSize) {
    container.innerHTML = '';
    createBoard(inputSize);
}

function updateSize(newValue) {
    size.innerHTML = `${newValue} x ${newValue}`;
}

function createBoard(inputSize) {
    container.style.setProperty('--grid-num', inputSize); 
    for(let i = 0; i < (inputSize**2) ; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('mouseover', draw);
        cell.addEventListener('mousedown', draw);
        container.appendChild(cell).className = "cell";
    }; 
}

const randomRGB = () => Math.floor(Math.random() * 256);

function draw(e) {
    // if not clicked AND hovered, do not change color
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode == colorBtn.id) {  
        e.target.style.background = 'black';
    }
    if (currentMode == rainbowBtn.id) {
        const randomR = randomRGB();
        const randomG = randomRGB();
        const randomB = randomRGB();
        e.target.style.background = `rgb(${randomR},${randomG},${randomB})`;
    }
    if (currentMode === shade.id) {
        
    }
    if (currentMode === eraser.id) {
        
    }
}

createBoard(slider.value);

