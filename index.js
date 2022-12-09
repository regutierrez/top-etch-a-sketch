let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const createGrid = (int_num) => {
    const container = document.querySelector('#container');
    container.style.setProperty('--grid-num', int_num); 
    for(let i = 0; i < (int_num**2) ; i++) {
        let div = document.createElement('div');
        container.appendChild(div).className = "cell";
    };
    
};

function changeColor(e) {
    console.log(mouseDown);
    if (e.type === 'mouseover' && !mouseDown) {
        console.log('im here')
        return; // if not clicked AND hovered, do not change color
    }
    e.target.style.background = 'white';
}

function drawOnCell() {
    const cell = document.querySelectorAll('.cell');
    cell.forEach(cell => {
        // draw if you do click OR hover
        cell.addEventListener('mouseover', changeColor);
        cell.addEventListener('mousedown', changeColor);
        
        
    });
};




createGrid(100);
drawOnCell();



