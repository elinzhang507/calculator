let a;
let operator;
let b;

function operate(a, b, operator){
    if(operator == "+") return add(a, b);
    if(operator == "-") return subtract(a, b);
    if(operator == "*") return multiply(a, b);
    if(operator == "/") return divide(a, b);
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

let sum = operate(3, 4, "+");
console.log(sum);