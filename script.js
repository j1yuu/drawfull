document.addEventListener("DOMContentLoaded", function () {
    var DEFAULT_COLOR = "#09160b";
    var DEFAULT_MODE = 'Color';
    var DEFAULT_SIZE = 16;
    var INIT_COLOR = "#ffffff";
    var pallet = document.getElementById('color');
    var colorMode = document.querySelector('.color');
    var rainbowMode = document.querySelector('.rainbow');
    var eraserMode = document.querySelector('.eraser');
    var clearButton = document.querySelector('.clear');
    var sizeRange = document.getElementById('size');
    var sizeNumber = document.querySelector('.size');
    var fieldContainer = document.querySelector('.field-container');
    var field = document.createElement("div");
    var modes = [colorMode, rainbowMode, eraserMode];
    var currentColor = DEFAULT_COLOR;
    var currentMode = DEFAULT_MODE;
    var currentSize = DEFAULT_SIZE;
    var mouseDown = false;
    field.classList.add("field");
    document.addEventListener('mousedown', function () { mouseDown = true; });
    document.addEventListener('mouseup', function () { mouseDown = false; });
    function colorChange(newColor) {
        currentColor = newColor;
    }
    ;
    function modeChange(newMode) {
        currentMode = newMode;
    }
    ;
    function sizeChange(newSize) {
        currentSize = newSize;
        sizeNumber.innerHTML = "".concat(newSize, "x").concat(newSize);
    }
    ;
    function squareColorChange(e) {
        if (e.type === "mouseover" && !mouseDown)
            return;
        if (currentMode === "Rainbow") {
            var randomR = Math.floor(Math.random() * 256);
            var randomG = Math.floor(Math.random() * 256);
            var randomB = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = "rgb(".concat(randomR, ", ").concat(randomG, ", ").concat(randomB, ")");
        }
        else if (currentMode === 'Color') {
            e.target.style.backgroundColor = currentColor;
        }
        else if (currentMode === "Eraser") {
            e.target.style.backgroundColor = INIT_COLOR;
        }
    }
    function setupGrid(size) {
        field.innerHTML = "";
        setupGridField(size);
        for (var i = 0; i < size * size; i++) {
            var square = document.createElement("div");
            square.classList.add("square");
            square.addEventListener('mouseover', squareColorChange);
            square.addEventListener('mousedown', squareColorChange);
            field.appendChild(square);
        }
    }
    function setupGridField(size) {
        field.style.gridTemplateRows = "repeat(".concat(size, ", 1fr)");
        field.style.gridTemplateColumns = "repeat(".concat(size, ", 1fr)");
    }
    function __init__(fieldSize) {
        if (fieldSize === void 0) { fieldSize = currentSize; }
        setupGrid(fieldSize);
        fieldContainer.appendChild(field);
    }
    pallet.addEventListener('change', function (e) {
        colorChange(e.target.value);
    });
    modes.forEach(function (mode) {
        mode.addEventListener('click', function (e) {
            modeChange(e.target.textContent);
            console.log(currentMode);
        });
    });
    clearButton.addEventListener('click', function () {
        __init__();
    });
    sizeRange.addEventListener('change', function (e) {
        sizeChange(e.target.value);
        __init__();
    });
    __init__();
});
