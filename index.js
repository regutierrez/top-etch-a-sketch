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
let colorSel = colorPicker.value;
let shadeValue = 0;

//Change modes
colorBtn.addEventListener('click', () => changeMode(colorBtn.id));
rainbowBtn.addEventListener('click', () => changeMode(rainbowBtn.id));
shade.addEventListener('click', () => changeMode(shade.id));
eraser.addEventListener('click', () => changeMode(eraser.id));
clear.addEventListener('click', () => refreshBoard(gridSize));
colorPicker.addEventListener('change', () => {
    console.log('color picker test')
    colorSel = colorPicker.value;
    console.log(colorSel);
});

function changeMode(mode) {
    currentMode = mode;
    activateBtn(currentMode);    
}

function activateBtn(mode) {
    console.log(mode);

    switch(mode) {
        case colorBtn.id:
            colorBtn.classList.add('active');
            rainbowBtn.classList.remove('active');
            shade.classList.remove('active');
            eraser.classList.remove('active');
            break;
        case rainbowBtn.id:
            rainbowBtn.classList.add('active');
            colorBtn.classList.remove('active');
            shade.classList.remove('active');
            eraser.classList.remove('active');
             break;
        case shade.id:
            shade.classList.add('active');
            rainbowBtn.classList.remove('active');
            colorBtn.classList.remove('active');
            eraser.classList.remove('active');
            break;
        case eraser.id:
            eraser.classList.add('active');
            rainbowBtn.classList.remove('active');
            shade.classList.remove('active');
            colorBtn.classList.remove('active');
            break;
   }    
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
        e.target.style.background = colorSel;
    }
    if (currentMode == rainbowBtn.id) {
        const randomR = randomRGB();
        const randomG = randomRGB();
        const randomB = randomRGB();
        e.target.style.background = `rgb(${randomR},${randomG},${randomB})`;
    }
    else if (currentMode == shade.id) {
        const shadedCell = e.target;
        if ('shade' in shadedCell) {
            shadedCell.shade += 1;
        } else {
            shadedCell.shade = 0;
        }
        const shadingRGB = 255 - (shadedCell.shade * 10);
        e.target.style.background = `rgb(${shadingRGB},${shadingRGB},${shadingRGB})`;
    }
     else if (currentMode == eraser.id) {
        e.target.style.background = 'white';
    }
   }

createBoard(slider.value);

