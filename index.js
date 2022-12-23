const MAX_CHAR_LENGTH = 17;
const prevDisplay = document.querySelector(".calc-display p:first-child");
const currentDisplay = document.querySelector(".calc-display p:last-child");
const numbers = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector("#btnDec");
const equals = document.querySelector("#btnEqual");
const clear = document.querySelector("#btnClear");

let op = "";
let num1 = "",
  num2 = "";
let decimalPressed = false;
let operatorPressed = false;

//Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(num1, num2, operator) {
  num1 = Number(num1);
  num2 = Number(num2);
  if (num1 === NaN || num2 === NaN) return "ERR";
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    if (num2 === 0) return "ERR";
    return divide(num1, num2);
  }
}

function reset() {
  op = "";
  num1 = "";
  num2 = "";
  operatorPressed = false;
}

function displayCurrent(text) {
  currentDisplay.textContent = text;
}
function displayPrevious(text) {
  prevDisplay.textContent = text;
}

function insert(e) {
  if (!operatorPressed) {
    if (num1.length > MAX_CHAR_LENGTH) return;
    num1 += e.textContent;
    displayCurrent(num1);
    console.log(num1);
    console.log(e);
  } else {
    if (num2.length > MAX_CHAR_LENGTH) return;
    console.log(e);
    num2 += e.textContent;
    displayCurrent(`${num1} ${op} ${num2}`);
    console.log(num2);
  }
}

decimal.addEventListener("click", () => {
  if (!operatorPressed) {
    if (num1 === "") return;
  } else {
    if (num2 === "") return;
  }
  if (!decimalPressed) {
    decimalPressed = true;
    insert(decimal);
  }
});

numbers.forEach((number) => {
  number.addEventListener("click", () => insert(number));
});

// Needs to fix call to operate when another operator is pressed (just like equals)
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (num1 === "") return;
    op = operator.textContent;
    decimalPressed = false;
    operatorPressed = true;
    displayCurrent(`${num1}`);
    displayPrevious(`${num1} ${op} `);
  });
});

equals.addEventListener("click", () => {
  if (num2 === "") return;
  let res = operate(num1, num2, op);
  displayPrevious(`${num1} ${op} ${num2} = `);
  if (res === "ERR") {
    displayCurrent("Error");
    reset();
  } else {
    res = Math.round((res + Number.EPSILON) * 100) / 100;
    reset();
    displayCurrent(res);
    num1 = res;
  }
});

clear.addEventListener("click", () => {
  displayCurrent("");
  displayPrevious("");
  decimalPressed = false;
  reset();
});
