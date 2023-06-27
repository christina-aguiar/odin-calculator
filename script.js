const display = document.querySelector('.display');
const preview = document.querySelector('.preview');
const resultDisplay = document.querySelector('.resultDisplay');
const numericalButtons = document.querySelectorAll('.numerical');
const operatorButtons = document.querySelectorAll('.operator');
const buttonEqual = document.querySelector('.equal');
const buttonClear = document.querySelector('.clear');

const arrayOfNums = [];
let operand = '';
let sum;
let arraySize;
let booleanTest;
display.textContent = 0;

numericalButtons.forEach(Element => Element.addEventListener('click', function () {
    updateDisplay(this.textContent)
}));

operatorButtons.forEach(Element => Element.addEventListener('click', function () {
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
}
));

buttonEqual.addEventListener('click', function () {
    if (arrayOfNums.length > 0) {
        calculate()
    }
});

buttonClear.addEventListener('click', function () {
    reset()
})

function updateDisplay(a) {
    if (resultDisplay.textContent !== '' && operand == '') {
        reset()
    }
    if (resultDisplay !== '' && operand !== '') {
        preview.textContent = `${arrayOfNums[0]} ${operand}`
    }
    resultDisplay.textContent = ''
    display.textContent = parseInt(display.textContent.concat(a).substring(0, 10))
};

function testAndPush() {
    booleanTest = isNaN(parseInt(display.textContent))
    if (booleanTest == false) {
        arrayOfNums.push(parseInt(display.textContent))
        display.textContent = '0';
        preview.textContent = `${arrayOfNums[0]} ${operand}`
    }
}

function calculate() {
    booleanTest = isNaN(parseInt(display.textContent))
    if (booleanTest == false) {
        arrayOfNums.push(parseInt(display.textContent))
    }

    if (arrayOfNums.length > 0) {
        if (operand == '+') {
            sum = arrayOfNums.reduce((a, b) => a + b, 0)
        }
        else if (operand == '-') {
            sum = arrayOfNums.reduce((a, b) => a - b)
        }
        else if (operand == '*') {
            sum = arrayOfNums.reduce((a, b) => a * b)
        }
        else if (operand == '/') {
            if (arrayOfNums[1] == 0) {
                alert(`Can't divide by 0. Please, re-write your calculation`);
                reset();
                throw new Error(`cant divide by 0! Please, re-write your calculation`)
            }
            else {
                sum = arrayOfNums.reduce((a, b) => a / b)
            }
        }
        arraySize = arrayOfNums.length
        for (i = 0; i < arraySize; i++) {
            arrayOfNums.pop()
        }
        arrayOfNums.push(sum);
        display.textContent = ''
        resultDisplay.textContent = parseInt(sum * 100) / 100;
        preview.textContent = ''
        operand = ''
    }
}

function reset() {
    arraySize = arrayOfNums.length
    for (i = 0; i < arraySize; i++) {
        arrayOfNums.pop()
    }
    operand = '';
    sum = 0;
    display.textContent = '0';
    resultDisplay.textContent = ''
    preview.textContent = ''
}

//Add keyboard support
document.addEventListener("keydown", e => {
    if (e.key >= 0 && e.key < 10) {
        updateDisplay(e.key)
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
    }
    if (e.key == '=' || e.key == 'Enter') {
        if (arrayOfNums.length > 0) {
            calculate()
        }
    }
    console.log(e)
});