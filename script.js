const display = document.querySelector('.display');
const resultDisplay = document.querySelector('.resultDisplay');
const preview = document.querySelector('.preview');
const button1 = document.querySelector('.numerical1');
const button2 = document.querySelector('.numerical2');
const button3 = document.querySelector('.numerical3');
const button4 = document.querySelector('.numerical4');
const button5 = document.querySelector('.numerical5');
const button6 = document.querySelector('.numerical6');
const button7 = document.querySelector('.numerical7');
const button8 = document.querySelector('.numerical8');
const button9 = document.querySelector('.numerical9');
const button0 = document.querySelector('.numerical0');
const buttonAdd = document.querySelector('.operatorAdd');
const buttonMinus = document.querySelector('.operatorMinus');
const buttonDivide = document.querySelector('.operatorDivide');
const buttonMultiply = document.querySelector('.operatorMultiply');
const buttonEqual = document.querySelector('.equal');
const buttonClear = document.querySelector('.clear');

const arrayOfNums = [];
let operand = '';
let sum;
let size;
let test;
display.textContent = 0;

button0.addEventListener('click', function () {
    updateDisplay('0')
});
button1.addEventListener('click', function () {
    updateDisplay('1')
});
button2.addEventListener('click', function () {
    updateDisplay('2')
});
button3.addEventListener('click', function () {
    updateDisplay('3')
});
button4.addEventListener('click', function () {
    updateDisplay('4')
});
button5.addEventListener('click', function () {
    updateDisplay('5')
});
button6.addEventListener('click', function () {
    updateDisplay('6')
});
button7.addEventListener('click', function () {
    updateDisplay('7')
});
button8.addEventListener('click', function () {
    updateDisplay('8')
});
button9.addEventListener('click', function () {
    updateDisplay('9')
});

function updateDisplay(a) {
    if (resultDisplay.textContent !== '' && operand == '') {
        reset()
    }
    if (resultDisplay !== '' && operand !== '') {
        preview.textContent = `${arrayOfNums[0]} ${operand}`
    }
    resultDisplay.textContent = ''
    display.textContent = parseInt(display.textContent.concat(a))
};

buttonAdd.addEventListener('click', function () {
    if (arrayOfNums.length > 0) {
        calculate()
        operand = '+'
        showPreview()
    }
    else {
        operand = '+';
        testAndPush()
    }
})
buttonMinus.addEventListener('click', function () {
    if (arrayOfNums.length > 0) {
        calculate()
        operand = '-'
        showPreview();
    }
    else {
        operand = '-';
        testAndPush()
    }
})
buttonMultiply.addEventListener('click', function () {
    if (arrayOfNums.length > 0) {
        calculate()
        operand = '*'
        showPreview();
    }
    else {
        operand = '*';
        testAndPush()
    }
})
buttonDivide.addEventListener('click', function () {
    if (arrayOfNums.length > 0) {
        calculate()
        operand = '/'
        showPreview()
    }
    else {
        operand = '/';
        testAndPush()
    }
})

function showPreview() {
    preview.textContent = `${arrayOfNums[0]} ${operand}`
    resultDisplay.textContent = '';
}

function testAndPush() {
    test = isNaN(parseInt(display.textContent))
    if (test == false) {
        arrayOfNums.push(parseInt(display.textContent))
        display.textContent = '';
        preview.textContent = `${arrayOfNums[0]} ${operand}`
    }
}
function calculate() {
    test = isNaN(parseInt(display.textContent))
    if (test == false) {
        arrayOfNums.push(parseInt(display.textContent))
    }

    if (arrayOfNums.length > 0) {
        if (operand == '+') {
            sum = arrayOfNums.reduce((a, b) => a + b, 0)
            giveResult()
        }
        else if (operand == '-') {
            sum = arrayOfNums.reduce((a, b) => a - b)
            giveResult()
        }
        else if (operand == '*') {
            sum = arrayOfNums.reduce((a, b) => a * b)
            giveResult()
        }
        else if (operand == '/') {
            if (arrayOfNums[1] == 0) {
                alert(`Can't divide by 0`)
                reset()
            }
            else {
                sum = arrayOfNums.reduce((a, b) => a / b)
                giveResult()
            }
        }
    }
}
function giveResult() {
    size = arrayOfNums.length
    for (i = 0; i < size; i++) {
        arrayOfNums.pop()
    }
    arrayOfNums.push(sum);
    display.textContent = ''
    resultDisplay.textContent = parseInt(sum * 100) / 100;
    preview.textContent = ''
    operand = ''
}
buttonEqual.addEventListener('click', function () {
    if (arrayOfNums.length > 0) {
        calculate()
    }
})

function reset() {
    size = arrayOfNums.length
    for (i = 0; i < size; i++) {
        arrayOfNums.pop()
    }
    operand = '';
    sum = 0;
    display.textContent = '0';
    resultDisplay.textContent = ''
    preview.textContent = ''
}

buttonClear.addEventListener('click', function () {
    reset()
})