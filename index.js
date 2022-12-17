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
let shadeValue = 0;

let shadingR = 255;
let shadingG = 255;
let shadingB = 255;

//Change modes
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
    if (currentMode == shade.id) {
        const shadedCell = e.target;
        console.log(shadedCell.hasOwnProperty('shade-value'));
        if ('shade-value' in shadedCell) {
            shadeValue = shadedCell.shade;
            console.log('in if' + shadeValue);
            shadedCell.setProperty('shade-value', (shadeValue + 1));
            console.log(shadeValue);
        } else {
            e.target.setAttribute('shade-value', shadeValue);
        }
        shadingR -= shadeValue * 10;
        shadingG -= shadeValue * 10;
        shadingB -= shadeValue * 10;
        e.target.style.background = `rgb(${shadingR},${shadingG},${shadingB})`;
    }
    }
    if (currentMode === eraser.id) {
        e.target.style.background = 'white';
    }

createBoard(slider.value);

