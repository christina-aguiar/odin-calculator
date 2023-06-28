const display = document.querySelector('.display');
const preview = document.querySelector('.preview');
const resultDisplay = document.querySelector('.resultDisplay');
const numericalButtons = document.querySelectorAll('.numerical');
const operatorButtons = document.querySelectorAll('.operator');
const buttonEqual = document.querySelector('.equal');
const buttonAllClear = document.querySelector('.clear');
const buttonClear = document.querySelector('.backspace');
const decimal = document.querySelector('.decimal');

const arrayOfNums = [];
let operand = '';
let sum;
let arraySize;
let booleanTest;
let decimalPressed = 'no';
display.textContent = '';

numericalButtons.forEach(Element => Element.addEventListener('click', function () {
    updateDisplay(this.textContent)
}));

decimal.addEventListener('click', function() {
    updateDisplay(this.textContent);
    decimal.classList.add('decimalPressed');
    decimalPressed = 'yes';
});

operatorButtons.forEach(Element => Element.addEventListener('click', function () {
    if (display.textContent == '' || display.textContent == '.' && preview.textContent == '') {
        return
    }
    if (arrayOfNums.length > 0) {
        calculate()
        operand = Element.textContent;
        preview.textContent = `${arrayOfNums[0]} ${operand}`
        resultDisplay.textContent = '';
    }
    else {
        operand = Element.textContent;
        testAndPush();
    }
    Element.classList.add('operatorPressed')
}
));

buttonEqual.addEventListener('click', function () {
    if (arrayOfNums.length > 0) {
        calculate()
    }
});

buttonAllClear.addEventListener('click', function () {
    reset()
});

buttonClear.addEventListener('click', function() {
    display.textContent = display.textContent.slice(0, -1)
});

function updateDisplay(a) {
    if (resultDisplay.textContent !== '' && operand == '') {
        reset()
    }
    if (resultDisplay.textContent !== '' && operand !== '') {
        preview.textContent = `${arrayOfNums[0]} ${operand}`
    }
    resultDisplay.textContent = ''
    display.textContent = display.textContent.concat(a).substring(0, 10)
};

function testAndPush() {
    booleanTest = isNaN(parseFloat(display.textContent))
    if (booleanTest == false) {
        arrayOfNums.push(parseFloat(display.textContent))
        display.textContent = '';
        preview.textContent = `${arrayOfNums[0]} ${operand}`
    }
    decimal.classList.remove('decimalPressed')
    decimalPressed = 'no'
    operatorButtons.forEach(Element => {
        Element.classList.remove('operatorPressed')
    })
}

function calculate() {
    booleanTest = isNaN(parseFloat(display.textContent))
    if (booleanTest == false) {
        arrayOfNums.push(parseFloat(display.textContent))
    }
    if (arrayOfNums.length > 0) {
        if (operand == '+') {
            sum = arrayOfNums.reduce((a, b) => a + b, 0);
            sum = Math.round(sum * 10000) / 10000
        }
        else if (operand == '-') {
            sum = arrayOfNums.reduce((a, b) => a - b)
            sum = Math.round(sum * 10000) / 10000
        }
        else if (operand == '*') {
            sum = arrayOfNums.reduce((a, b) => a * b)
            sum = Math.round(sum * 10000) / 10000
        }
        else if (operand == '/') {
            if (arrayOfNums[1] == 0) {
                alert(`Can't divide by 0. Please, re-write your calculation`);
                reset();
                throw new Error(`cant divide by 0! Please, re-write your calculation`)
            }
            else {
                sum = arrayOfNums.reduce((a, b) => a / b)
                sum = Math.round(sum * 10000) / 10000
            }
        }
        arraySize = arrayOfNums.length
        for (i = 0; i < arraySize; i++) {
            arrayOfNums.pop()
        }
        arrayOfNums.push(sum);
        display.textContent = ''
        resultDisplay.textContent = sum;
        if (resultDisplay.textContent.length > 10) {
            resultDisplay.textContent = `${resultDisplay.textContent.substring(0, 10)}...`;
        }
        preview.textContent = ''
        decimal.classList.remove('decimalPressed')
        decimalPressed = 'no';
        operatorButtons.forEach(Element => {
            Element.classList.remove('operatorPressed')
        })
        operand = ''
    }
}

function reset() {
    arraySize = arrayOfNums.length
    for (i = 0; i < arraySize; i++) {
        arrayOfNums.pop()
    }
    decimal.classList.remove('decimalPressed')
    decimalPressed = 'no';
    operatorButtons.forEach(Element => {
        Element.classList.remove('operatorPressed')
    })
    operand = '';
    sum = 0;
    display.textContent = '';
    resultDisplay.textContent = ''
    preview.textContent = ''
}

//Add keyboard support
document.addEventListener("keydown", e => {
    if (e.key >= 0 && e.key < 10) {
        updateDisplay(e.key)
    }
    if (e.key == '.') {
        if (decimalPressed == 'no') {
            updateDisplay(e.key);
            decimal.classList.add('decimalPressed');
            decimalPressed = 'yes';
        }
        if (decimalPressed == 'yes') {
            return;
        }
    }
    if (e.key == '+' || e.key == '-' || e.key == '/' || e.key == '*') {
        if (arrayOfNums.length > 0) {
            calculate()
            operand = e.key;
            preview.textContent = `${arrayOfNums[0]} ${operand}`
            resultDisplay.textContent = '';
        }
        else {
            operand = e.key;
            testAndPush();   
            }
        if (operand == '+') {
            operatorButtons[0].classList.add('operatorPressed')
        }
        else if (operand == '-') {
            operatorButtons[1].classList.add('operatorPressed')
        }
        else if (operand == '/') {
            operatorButtons[2].classList.add('operatorPressed')
        }
        else if (operand == '*') {
            operatorButtons[3].classList.add('operatorPressed')
        }
    }
    if (e.key == '=' || e.key == 'Enter') {
        if (arrayOfNums.length > 0) {
            calculate()
        }
    }
    if (e.key == 'Escape') {
        reset()
    }
    if (e.key == 'Backspace') {
        display.textContent = display.textContent.slice(0, -1)
    }
});