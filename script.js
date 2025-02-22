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
display(0);

let isOperatorClicked = false;
let isScreenCleared = false;
let isEqualClicked = false;    

let snarkyMessage = "go back to skool";

function display(text){
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

function handleSnarkyMessage() {
    screen.replaceChildren();
    display(snarkyMessage);
    let buttonContainer = Array.from(document.querySelectorAll("button"));
    buttonContainer.forEach(button => button.disabled = true);
    acButton.disabled = false;
    acButton.textContent = "OK";
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
    display(numText);
}))

let opButtonContainer = Array.from(document.querySelectorAll(".op-buttons"));
opButtonContainer.forEach(button => button.addEventListener("click", () => {
    let curDisplay = getCurrentDisplay();
    if(curDisplay === "Error" || curDisplay === '' || curDisplay === snarkyMessage) {
        screen.replaceChildren();
        display(0);
    } else if (b === "0") {
        handleSnarkyMessage();
        return;
    }
    else if (isEqualClicked && ans !== '' && ans !== undefined && !isNaN(+ans)) {
        a = ans;
        isEqualClicked = false; 
    }
    ans = operate(+a, +b, operator);
    if(ans != undefined) {
        a = ans;
        screen.replaceChildren();
        display(ans);
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
        display(a);
        ans = a;
    } else if (b === "0") {
        handleSnarkyMessage();
    } else if (isNaN(ans) || ans === undefined || b === '') {
        acButton.click();
        screen.replaceChildren();
        display("Error");
    } else {
        display(ans);
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
    if(getCurrentDisplay() === snarkyMessage) {
        let buttonContainer = Array.from(document.querySelectorAll("button"));
        buttonContainer.forEach(button => button.disabled = false);
        acButton.textContent = "AC";
    }
    screen.replaceChildren();
    display(0);
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
    if(getCurrentDisplay() === "Error" || getCurrentDisplay() === snarkyMessage) {
        return;
    }
    if(screen.lastChild) {
        if(b === '' && ans === '') {
            screen.lastChild.remove();
            a = getCurrentDisplay();
        } else if (b !== ''){
            screen.lastChild.remove();
            b = getCurrentDisplay();
        }
    }
})

let ansButton = document.querySelector("#per-button");
ansButton.addEventListener("click", () => {
    let num = getCurrentDisplay();
    let percentNum = +num/100;

    if(b === '' && isOperatorClicked || getCurrentDisplay() === "Error" || getCurrentDisplay() === snarkyMessage) {
        acButton.click();
        screen.replaceChildren();
        display("Error");
        return;
    }

    screen.replaceChildren();
    display(percentNum);
    if(+num === +a) {
        a = percentNum;
    } else if (+num === +b) {
        b = percentNum;
    } else if (+num === +ans) {
        ans = percentNum;
    }
})