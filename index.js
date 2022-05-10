/* YOUR CODE HERE! */

let boxy = document.getElementsByClassName('box');
const bigBox = document.getElementById('bigBox');

let offset = [0, 0];
let pos;
let isDown = false;
let over = false;
let counter = 1;

function clicked(event) {

    isDown = true;
    offset = [
        event.target.offsetLeft - event.clientX,
        event.target.offsetTop - event.clientY
    ];

    if (event.shiftKey === true) {
        if (event.target.classList.contains('box-large')) {
            event.target.classList.remove('box-large');
        } else {
            event.target.classList.add('box-large');
        }
    }
}

function notClicked(event) {
    isDown = false;

}

function move(event) {
    if (isDown === true) {

        pos = {
            x: event.clientX,
            y: event.clientY
        };

        event.target.style.left = (pos.x + offset[0]) + 'px';
        event.target.style.top = (pos.y + offset[1]) + 'px';

    }

}

function changeColor(event) {
    event.preventDefault();
    let values = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += values[Math.floor(Math.random() * 16)];
    }

    event.target.style.backgroundColor = color;

}

function createNew(event) {
    if (event.altKey === true) {
        if (bigBox.childElementCount > 1) {
            bigBox.removeChild(event.target);
        }
    } else {
        const new_box = document.createElement('div');
        const unique_text = document.createTextNode(++counter);

        new_box.classList.add('box');
        new_box.appendChild(unique_text);

        bigBox.appendChild(new_box);
        addListenersToEveryone(new_box);
    }
}

function addListenersToEveryone(everyone) {
    everyone.addEventListener('mousedown', clicked);
    everyone.addEventListener('mouseup', notClicked);
    everyone.addEventListener('mousemove', move);
    everyone.addEventListener('contextmenu', changeColor);
    everyone.addEventListener('dblclick', createNew);
}

[...boxy].forEach(
    (boxic) => {
        addListenersToEveryone(boxic);
    }
)
