/*-------------------------------- Constants --------------------------------*/

const displayElement = document.querySelector('.display');
//* initialize display to 0
displayElement.textContent = '0';

/*-------------------------------- Variables --------------------------------*/

//* initialize calculator state
let firstOperand = ''; // store first operand
let secondOperand = ''; // store second operand
let operator = null; // store the operator
let shouldResetDisplay = false; // indicates if display needs to be reset


/*------------------------ Cached Element References ------------------------*/

// stores all HTML elements that represent number buttons (1,2,3,4,5,6,7,8,9)
const numberButtons = document.querySelectorAll('.number'); 
// stores all HTML elements that represent operator buttons (+,-,*,/,=,C)
const operatorButtons = document.querySelectorAll('.operator');
// stores the HTML button that represents the equals button (=)
const equalsButton = document.querySelector('.equals');

/*----------------------------- Event Listeners -----------------------------*/

// loop through each number button and add an event listener to detect click events
numberButtons.forEach(button => {
    // adds a click event listener to each number button
    // when any number button is clicked, it calls the handleNumberClick function
    button.addEventListener('click', handleNumberClick)
});
// loops through each operator button and add an event listener to detect click events
operatorButtons.forEach(button => {
    // adds a click event listener to each operator button
    // when any operator button is clicked, it calls the handleOperatorClick function
    button.addEventListener('click', handleOperatorClick)
});
// add an event listener for the equals button
equalsButton.addEventListener('click', handleEqualsClick);


/*-------------------------------- Functions --------------------------------*/

function handleNumberClick(event) {
    const number = event.target.textContent; // get number from button clicked
    
    // checks if display needs to be reset
    if (shouldResetDisplay) {
        displayElement.textContent = number;
        shouldResetDisplay = false;
    } else {
        // otherwise append number to the display (forming a multi digit number)
        if (displayElement.textContent === '0') {
            displayElement.textContent = number
        } else {displayElement.textContent = displayElement.textContent + number}
    }

    // update the current operand based on the operator
    if (operator === null) {
        // first operand is entered before any operator
        firstOperand = displayElement.textContent;
    } else {
        // second operand is entered after operator
        secondOperand = displayElement.textContent; 
    }
}

function handleOperatorClick(event) {
    // get clicked operator
    const newOperator = event.target.textContent;

    if (newOperator === 'C') {
        // resets calculator to initial state
        displayElement.textContent = '0';
        firstOperand = '';
        secondOperand = '';
        operator = null;
        return
    }
    // allows chaining of operations if there is an operator and second operand
    if (operator !== null && secondOperand !== '') {
        calculate();
    }
    // sets new operator
    operator = newOperator;
    // reset display for next operand input after an operator is clicked
    shouldResetDisplay = true;
}

function handleEqualsClick() {
    // ensure there's an operator and second operand 
    if (operator === null || secondOperand === '') return;
    // perform calculation
    calculate();
    // reset operator for next calculation
    operator = null;
}

function calculate() {
    // convert first operand from type string to float
    const op1 = parseFloat(firstOperand);
    // convert second operand from type string to float
    const op2 = parseFloat(secondOperand);
    let result;
    // perform calculation based on operator
    //* switch statement
    switch (operator) {
        case '+':
            result = op1 + op2;
            break;
    
        case '-':
            result = op1 - op2;
            break;
    
        case '*':
            result = op1 * op2;
            break;
    
        case '/':
            //* ternary operator -> {condition} ? value_if_true : value_if_false
            // if second operand is 0, displays error. Otherwise carry out carry out division as per normal
            result = op2 === 0 ? 'Error' : op1 / op2; 
            break;

        default:
            result = 'Error';
    }
    // displays result of calculation
    displayElement.textContent = result;
    // converts result into string and stores it as first operand in next calculation
    firstOperand = result.toString();
    // clear the second operand
    secondOperand = '';
    // set flag to reset display for next input
    shouldResetDisplay = true; 
}

//? References
// https://www.freecodecamp.org/news/how-to-convert-a-string-to-a-number-in-javascript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
// https://www.youtube.com/watch?v=dQeyBN9BBwg