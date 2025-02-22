let a = '';
let b = '';
let operator = '';
let ans = '';

function operate(a, b, operator){
    if(operator === "+") return add(a, b);
    if(operator === "-") return subtract(a, b);
    if(operator === "x") return multiply(a, b);
    if(operator === "÷") return divide(a, b);
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

const screen = document.querySelector("#screen-container");
displayNum(0);

let isOperatorClicked = false;
let isScreenCleared = false;
let isEqualClicked = false;    

function displayNum(text){
    let num = document.createElement("span");
    num.textContent = text;
    screen.appendChild(num);
}

function getCurrentDisplay(){
    let cur = '';
    let curArr = Array.from(document.querySelectorAll("span"));
    curArr.forEach(i => cur += i.textContent); 
    return cur; 
}

let numButtonContainer = Array.from(document.querySelectorAll(".num-buttons"));
numButtonContainer.forEach(button => button.addEventListener("click", () => {
    isEqualClicked = false;
    if(!isScreenCleared) {
        screen.replaceChildren()
        isScreenCleared = true;
    }
    if(isOperatorClicked) {
        b += button.textContent
    } else {
        a += button.textContent
    } 
    let numText = button.textContent
    displayNum(numText);
}))

let opButtonContainer = Array.from(document.querySelectorAll(".op-buttons"));
opButtonContainer.forEach(button => button.addEventListener("click", () => {
    if(getCurrentDisplay() === "Error") {
        screen.replaceChildren();
        displayNum(0);
    } else if (isEqualClicked && ans !== '' && ans !== undefined && !isNaN(+ans)) {
        a = ans;
        isEqualClicked = false; 
    } else if (b === "0") {
        acButton.click();
        screen.replaceChildren();
        displayNum("Error");
    }
    ans = operate(+a, +b, operator);
    if(ans != undefined) {
        a = ans;
        screen.replaceChildren();
        displayNum(ans);
    } 
    b = '';
    isOperatorClicked = true;
    isScreenCleared = false;
    operator = button.textContent;
}))

let eqButton = document.querySelector("#eq-button");
eqButton.addEventListener("click", () => {
    if(a === '' && b === '') {
        return;
    }

    screen.replaceChildren();
    ans = operate(+a, +b, operator);

    if(!isOperatorClicked) {
        displayNum(a);
        ans = a;
    } else if (isNaN(ans) || ans === undefined || !isFinite(ans) || b === '') {
        acButton.click();
        screen.replaceChildren();
        displayNum("Error");
    } else {
        displayNum(ans);
    }

    isOperatorClicked = false;
    isScreenCleared = false;
    isEqualClicked = true;
    a = '';
    b = '';
    operator = '';
})

let acButton = document.querySelector("#ac-button");
acButton.addEventListener("click", () => {
    screen.replaceChildren();
    displayNum(0);
    isOperatorClicked = false;
    isScreenCleared = false;
    isEqualClicked = false; 
    a = '';
    b = '';
    operator = '';
    ans = '';
})

let delButton = document.querySelector("#del-button");
delButton.addEventListener("click", () => {
    let curDisplay = getCurrentDisplay();
    if(curDisplay === "Error") {
        return;
    }
    if(screen.lastChild) {
        screen.lastChild.remove();
        
    }
})

let ansButton = document.querySelector("#per-button");
ansButton.addEventListener("click", () => {
    let num = getCurrentDisplay();
    let percentNum = +num/100;

    if(b === '' && isOperatorClicked || getCurrentDisplay() === "Error") {
        acButton.click();
        screen.replaceChildren();
        displayNum("Error");
        return;
    }

    screen.replaceChildren();
    displayNum(percentNum);
    if(+num === +a) {
        a = percentNum;
    } else if (+num === +b) {
        b = percentNum;
    } else if (+num === +ans) {
        ans = percentNum;
    }
})