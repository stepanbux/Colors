'use strict'

const colums = document.querySelectorAll('.col');

document.addEventListener('keydown', e => {
    if (e.code.toLowerCase() === 'space') {
        setRandomColors();
    }
})

document.addEventListener('click', (event) => {
    let target = event.target;
    if (target.tagName.toLowerCase() === 'i') {
        if (target.classList.contains('fa-lock-open')) {
            target.classList.remove('fa-lock-open');
            target.classList.add('fa-lock');
        } else {
            target.classList.remove('fa-lock');
            target.classList.add('fa-lock-open');
        }
    }
    if (target.tagName.toLowerCase() === 'h2') {
        copyColor(target.textContent)
    }
})

const generateRandomColor = () => {

    const hexCodes = '0123456789ABCDEF'

    let color = '';
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = (check) => {
    const colors = check ? getColorsFromHash() : [];

    colums.forEach((col, index) => {
        const text = col.querySelector('h2');
        const locker = col.querySelector('button');
        const lock = locker.querySelector('i').classList.contains('fa-lock')

        if (lock) {
            colors.push(text.textContent)
            return;
        }

        const color = check
            ? colors[index]
                ? colors[index] : generateRandomColor()
            : generateRandomColor();

        if (!check) {
            colors.push(color)
        }

        text.textContent = color;
        col.style.background = color;
        setTextColor(text, color, locker);
    })

    updateHash(colors);
}

const copyColor = (text) => {
    navigator.clipboard.writeText(text)
}

const setTextColor = (text, color, locker) => {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
    locker.style.color = text.style.color
}

const updateHash = (colors = []) => {
    document.location.hash = colors.map(col => {
        return col.toString().substring(1)
    }).join('-');
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color => '#' + color);
    }
    return [];
}

setRandomColors(true);

