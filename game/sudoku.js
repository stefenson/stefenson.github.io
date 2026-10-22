let gameboard = document.getElementById('gameboard');

const inputBlockSize = 80;
const errorColor = '#FFCCCC';
const normalColor = '#FFFFFF';
const correctColor = '#CCFFCC';

let areaBlocks = [];
for (let i = 0; i < 3; i++) {
    areaBlocks[i] = [];
    for (let j = 0; j < 3; j++) {
        let areaBlock = document.createElement('div');
        areaBlock.className = 'area-block';
        areaBlock.style.width = `${inputBlockSize * 3}px`;
        areaBlock.style.height = `${inputBlockSize * 3}px`;
        areaBlock.style.display = 'inline-block';
        areaBlock.style.margin = '5px';
        areaBlock.style.border = '1px solid #000000';
        areaBlock.style.margin = '0px';
        areaBlocks[i][j] = areaBlock;
    }
}

let inputBlocks = [];
let conditionMap = [];

function resetBlockColor() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            inputBlocks[i][j].style.backgroundColor = normalColor;
        }
    }
}

function checkLine(i) {
    for (let j = 0; j < 9; j++) {
        if (inputBlocks[i][j].value == '') {
            return false;
        }
    }
    for (let j = 0; j < 9; j++) {
        inputBlocks[i][j].style.backgroundColor = correctColor;
    }
    return true;
}


function checkColumn(i) {
    for (let j = 0; j < 9; j++) {
        if (inputBlocks[j][i].value == '') {
            return false;
        }
    }
    for (let j = 0; j < 9; j++) {
        inputBlocks[j][i].style.backgroundColor = correctColor;
    }
    return true;
}

function checkArea(i) {
    const startRow = Math.floor(i / 3) * 3;
    const startCol = (i % 3) * 3;
    for (let row = startRow; row < startRow + 3; row++) {
        for (let col = startCol; col < startCol + 3; col++) {
            if (inputBlocks[row][col].value == '') {
                return false;
            }
        }
    }
    for (let row = startRow; row < startRow + 3; row++) {
        for (let col = startCol; col < startCol + 3; col++) {
            inputBlocks[row][col].style.backgroundColor = correctColor;
        }
    }
    return true;
}

function checkAnswer() {
    resetBlockColor();
    for (let i = 0; i < 9; i++) {
        checkLine(i);
        checkColumn(i);
        checkArea(i);
    }
}

function checkCanFill(i, j, value) {
    resetBlockColor();

    for (let k = 0; k < 9; k++) {
        if (inputBlocks[i][k].value == value) {
            inputBlocks[i][k].style.backgroundColor = errorColor;
            return false;
        }
    }
    for (let k = 0; k < 9; k++) {
        if (inputBlocks[k][j].value == value) {
            inputBlocks[k][j].style.backgroundColor = errorColor;
            return false;
        }
    }
    const startRow = Math.floor(i / 3) * 3;
    const startCol = Math.floor(j / 3) * 3;
    for (let row = startRow; row < startRow + 3; row++) {
        for (let col = startCol; col < startCol + 3; col++) {
            if (inputBlocks[row][col].value == value) {
                inputBlocks[row][col].style.backgroundColor = errorColor;
                return false;
            }
        }
    }
    return true;
}

for (let i = 0; i < 9; i++) {
    inputBlocks[i] = [];
    for (let j = 0; j < 9; j++) {
        let inputBlock = document.createElement('input');
        inputBlock.type = 'text';
        inputBlock.maxLength = 1;
        inputBlock.className = 'input-block';
        inputBlock.style.width = `${inputBlockSize}px`;
        inputBlock.style.height = `${inputBlockSize}px`;
        inputBlock.style.textAlign = 'center';
        inputBlock.style.fontSize = `${inputBlockSize / 2}px`;
        inputBlock.style.border = '1px solid #DDDDDD';
        inputBlock.onkeydown = function (event) {
            if (event.key == 'Right' || event.key == 'ArrowRight') {
                if (j < 8) {
                    inputBlocks[i][j + 1].focus();
                }
            } else if (event.key == 'Left' || event.key == 'ArrowLeft') {
                if (j > 0) {
                    inputBlocks[i][j - 1].focus();
                }
            } else if (event.key == 'Up' || event.key == 'ArrowUp') {
                if (i > 0) {
                    inputBlocks[i - 1][j].focus();
                }
            } else if (event.key == 'Down' || event.key == 'ArrowDown') {
                if (i < 8) {
                    inputBlocks[i + 1][j].focus();
                }
            } else if ((event.key >= '1' && event.key <= '9') || event.key == 'Backspace' || event.key == 'Delete') {
                // Allow only numbers from 1 to 9, Backspace and Delete
                inputBlock.value = '';
                if (!checkCanFill(i, j, event.key)) {
                    inputBlock.style.backgroundColor = errorColor;
                    event.preventDefault();
                }
            } else {
                event.preventDefault();
            }
        }
        inputBlock.oninput = function () {
            checkAnswer();
        }
        inputBlocks[i][j] = inputBlock;
    }
}

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        gameboard.appendChild(areaBlocks[i][j]);
    }
    gameboard.appendChild(document.createElement('br'));
}

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        areaBlocks[Math.floor(i / 3)][Math.floor(j / 3)].appendChild(inputBlocks[i][j]);
    }
}
