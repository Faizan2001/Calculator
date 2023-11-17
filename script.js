function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let firstNum = "";
let secondNum = "";
let operator = "";
let result = "";
let continueResult = false;
const display = document.getElementsByName("display")[0];

function updateDisplay(value) {
  if (value === "AC") {
    firstNum = "";
    secondNum = "";
    operator = "";
    result = "";
    display.value = "";
  } else if (value === "DEL") {
    // Delete the last character
    let currentValue = display.value;
    display.value = currentValue.slice(0, -1);
  }
  else if (value === "=") {
    if (firstNum !== "" && result === "" & operator !== "" & secondNum !== "") {
      operate(firstNum, operator, secondNum);
      continueResult = true;
    } else if (firstNum === "O" && result !== "" & operator !== "" & secondNum !== "") {
      operate(result, operator, secondNum);
      continueResult = true;
    }
  } else {
    // Update Display
    if (!isNaN(value)|| value === ".") {
      if (result === "" && operator === "") {
        firstNum += value;
        display.value = firstNum.toString();

        console.log("First Number: " + firstNum);
      } else if (result === "" && firstNum !== "") {
        secondNum += value;
        display.value = firstNum.toString() + operator + secondNum.toString();

        console.log("Second Number: " + secondNum);
      } else if (result !== "" && firstNum === "O") {
        secondNum += value;
        display.value = result.toString() + operator + secondNum.toString();

        console.log("Second Number V2: " + secondNum);
      }
    } else {
      if (continueResult = true && firstNum === "O") {
        result = display.value
        console.log("Continued Result: " + result)
        operate(parseFloat(result), operator, parseFloat(secondNum));
        operator = value;
        display.value = result + operator + secondNum;
      } else if (
        firstNum !== "" &&
        operator === "" &&
        secondNum === "" &&
        result === ""
      ) {
        // First Num and show operator after it
        operator = value;
        display.value = firstNum + operator;
        console.log("Operator: " + operator);
      } else if (
        firstNum !== "O" &&
        firstNum !== "" &&
        operator !== "" &&
        secondNum !== ""
      ) {
        // First Num and Second Num + Operator
        operate(parseFloat(firstNum), operator, parseFloat(secondNum));
        operator = value;
        console.log("Operator2: " + operator);
        display.value = result + operator + secondNum;
      } else if (firstNum === "O" && operator !== "" && secondNum !== "") {
        // Result, Operator and Second Num

        console.log("Operator3: " + operator);
        operate(parseFloat(result), operator, parseFloat(secondNum));
        operator = value;
        display.value = result + operator + secondNum;
      } else if (firstNum === "O" && operator === "" && secondNum === "") {
        // Equals clicked. Result, Operator and Second Num

       
        operator = value;
        console.log("Operator4: " + operator);
        display.value = result + operator;
      }
    }
  }
}

function operate(firstNumR, operatorR, secondNumR) {
  if (operatorR === "*") {
    result = multiply(firstNumR, secondNumR);
  } else if (operatorR === "/") {
    // Check for divide by zero
    if (secondNumR !== 0) {
      result = divide(firstNumR, secondNumR);
    } else {
      result = "Error, erasing....";
      setTimeout(function() {
        // Your code to be executed after 5 seconds
        firstNum = "";
        secondNum = "";
        operator = "";
        result = "";
        display.value = "";
      }, 2500);

    }
  } else if (operatorR === "+") {
    result = add(firstNumR, secondNumR);
  } else if (operatorR === "-") {
    result = subtract(firstNumR, secondNumR);
  }

  console.log("Result: " + result.toString());
  display.value = result.toString();
  firstNum = "O";
  secondNum = "";
  operator = "";
}
