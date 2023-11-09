document.addEventListener("DOMContentLoaded", () => {
    const DEFAULT_COLOR = "#09160b";
    const DEFAULT_MODE = 'Color';
    const DEFAULT_SIZE = 16;
    const INIT_COLOR = "#ffffff"

    const pallet = document.getElementById('color');
    const colorMode = document.querySelector('.color');
    const rainbowMode = document.querySelector('.rainbow');
    const eraserMode = document.querySelector('.eraser');
    const clearButton = document.querySelector('.clear');
    const sizeRange = document.getElementById('size');
    const sizeNumber = document.querySelector('.size');

    const fieldContainer = document.querySelector('.field-container');
    const field = document.createElement("div");

    const modes = [colorMode, rainbowMode, eraserMode];

    let currentColor = DEFAULT_COLOR;
    let currentMode = DEFAULT_MODE;
    let currentSize = DEFAULT_SIZE;
    let mouseDown = false

    field.classList.add("field");
    document.addEventListener('mousedown', () => { mouseDown = true });
    document.addEventListener('mouseup', () => { mouseDown = false });

    function colorChange(newColor: string) {
        currentColor = newColor
    };

    function modeChange(newMode: string) {
        currentMode = newMode
    };

    function sizeChange(newSize: number) {
        currentSize = newSize
        sizeNumber.innerHTML = `${newSize}x${newSize}`;
    };

    function squareColorChange(e) {
        if (e.type === "mouseover" && !mouseDown) return;
        if (currentMode === "Rainbow") {
            const randomR = Math.floor(Math.random() * 256);
            const randomG = Math.floor(Math.random() * 256);
            const randomB = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        } else if (currentMode === 'Color') {
            e.target.style.backgroundColor = currentColor;
        } else if (currentMode === "Eraser") {
            e.target.style.backgroundColor = INIT_COLOR;
        }
    }

    function setupGrid(size) {
        field.innerHTML = ``;
        setupGridField(size);

        for (let i = 0; i < size * size; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.addEventListener('mouseover', squareColorChange);
            square.addEventListener('mousedown', squareColorChange);
            field.appendChild(square);
        }
    }

    function setupGridField(size: number) {
        field.style.gridTemplateRows = `repeat(${size}, 1fr)`
        field.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    }

    function __init__(fieldSize = currentSize) {
        setupGrid(fieldSize);
        fieldContainer.appendChild(field);
    }

    pallet.addEventListener('change', (e: any) => {
        colorChange(e.target.value)
    })

    modes.forEach(mode => {
        mode.addEventListener('click', (e: any) => {
            modeChange(e.target.textContent)
            console.log(currentMode)
        })
    });

    clearButton.addEventListener('click', () => {
        __init__()
    });

    sizeRange.addEventListener('change', (e: any) => {
        sizeChange(e.target.value);
        __init__()
    })

    __init__()
})  