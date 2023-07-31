"use strict";

const btns = document.querySelectorAll(".basic-button");
const btnContainer = document.querySelectorAll(".button-container");
const btnAll = document.querySelector(".customize");
const body = document.querySelector(".body");
const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".buttons");
const input = document.querySelector(".input");
const output = document.querySelector(".output");
const allClear = document.querySelector(".all-clear");
const numGrid = document.querySelector(".grid-container");

//functions
//the customization section
let active = [];
//saving the configuration before the rainbow button was pressed
const saveConfig = function () {
  active = [];
  btns.forEach((btn, i) => {
    if (btn.classList.contains("active"))
      active.push(btn.getAttribute("data-color"));
  });
  console.log(active);
};

//returning the configuration to the saved one
const retConfig = function () {
  let i = 0;
  btns.forEach((btn) => {
    console.log(btn);
    if (btn.getAttribute("data-color") === active[i]) {
      btn.classList.add("active");
      i++;
      console.log(i);
    }
  });
};

//to set the active class to the elements
const container = function (targetE, className) {
  const clickedContainer = targetE.closest(className);

  const rainbow = targetE
    .closest(".customize")
    .querySelector(".rainbow-button");

  if (
    rainbow.classList.contains("active") &&
    targetE.classList.contains("basic-button")
  ) {
    rainbow.classList.remove("active");
    body.classList.remove("rainbow");
    retConfig();
    body.classList.remove("rainbow");
    screen.classList.remove("rainbow");
    buttons.forEach((btn) => {
      btn.classList.remove("rainbow");
    });
  }

  [...clickedContainer.children].forEach((child) =>
    child.classList.remove("active")
  );
  targetE.classList.add("active");
};

//changing the colors in the calculator
const colors = function (targetE) {
  const color = targetE.getAttribute("data-color");
  const element = clickedElement(targetE);
  switch (element) {
    case "border":
      body.style.borderColor = color;
      screen.style.borderColor = color;
      buttons.forEach((item) => (item.style.borderColor = color));
      break;
    case "body":
      body.style.backgroundColor = color;
      break;
    case "screen":
      screen.style.backgroundColor = color;
      break;
    case "button":
      buttons.forEach((item) => (item.style.backgroundColor = color));
      break;
    case "fonts":
      buttons.forEach((item) => (item.style.color = color));
      input.style.color = color;
      output.style.color = color;
      break;
    default:
      console.log("error");
  }
};

//choosing the element that was clicked
const clickedElement = function (targetE) {
  const text = String(
    targetE.closest(".button-container").previousElementSibling.innerText
  );
  return text.toLowerCase();
};

//the actual functions of the calculator
//variables needed for functionalities
const currentValue = "0";
const maxDisplayLength = 16;
let opActive = false;
//if we initiliaze ipstring as empty, if we push symbol at start e.g. +, ip string will be '+ 9' which will throw error
let ipString = "0";
let symbolActive = false;
let dotActive = false;
let mulActive = false;
let percentActive = false;

//all clearing the calculator
const allClearBtn = function () {
  input.innerText = "0";
  output.innerText = "0";
  opActive = false;
  ipString = "";
};

//clearing the input screen
const clearBtn = function () {
  input.innerText = "0";
  ipString = "";
};

//% sign functionality
const addPercent = function (percent) {
  // if (!symbolActive) {
  if (!opActive) {
    if (!percentActive) {
      if (!symbolActive) {
        input.innerText += "%";
        ipString = ipString + "/100";
      } else {
        replacer();
        input.innerText += "%";
        ipString = ipString + "/100";
      }
    }
    percentActive = true;
  } else {
    input.innerText = output.innerText + "%";
    ipString = eval(ipString.slice(-1) / 100);
    console.log(ipString);
  }
  return;
};

//computing and showing output
const compute = function () {
  if (ipString.includes("%")) {
    addPercent();
    return;
  }
  const string = eval(ipString);
  output.innerText = string;
  opActive = true;
  dotActive = false;
  mulActive = false;
  percentActive = false;
  symbolActive = false;
};

const addNumber = function (number) {
  //because if ipsrting is 0 at start and we push a number e.g. 9, it will become 09
  if (ipString === "0") ipString = "";
  if (!opActive) {
    if (input.innerText === "0") {
      input.innerText = number;
    } else if (percentActive) {
      input.innerText = input.innerHTML + "×" + number;
      ipString = ipString + "*";
    } else {
      input.innerText += number;
    }
  } else {
    clearBtn();
    opActive = false;
    input.textContent = number;
  }
  ipString = ipString + number;
  symbolActive = false;
  // dotActive = false;
  mulActive = false;
  percentActive = false;
  console.log(ipString);
};

//checking for the symbol to determine the next action.
const symbolChecker = function (symb) {
  if (symb === "+" || symb === "-") {
    symbolActive = true;
    mulActive = false;
  } else {
    mulActive = true;
    symbolActive = false;
  }
};

//adding the symbol to the inputTExt
const replacer = function () {
  input.innerText = input.innerText.slice(0, -1);
  ipString = ipString.slice(0, -1);
};

//converting the symbols to JS underestandable forms
const convert = function (symbol) {
  switch (symbol) {
    case "×":
      return "*";
    case "÷":
      return "/";
    case "+":
      return "+";
    case ".":
      dotActive = true;
      return ".";
    default:
      return "-";
  }
};

const addSymbol = function (symbol) {
  if (symbol === "*") symbol = "×";
  if (symbol === "/") symbol = "÷";

  //making sure two user cannot put two dots consecutively
  if (symbol === "." && dotActive) {
    dotActive = true;
    return;
  }
  const symb = convert(symbol);

  if (symb != ".") dotActive = false;

  if (!opActive) {
    if (!symbolActive) {
      //if the active symbol is * or / and the symbol pushed is also one of those, replace the symbol
      if (mulActive && (symb === "*" || symb === "/")) {
        replacer();
      }

      input.innerText += symbol;
    } else {
      replacer();
      input.innerText += symbol;
    }
  } else {
    //when output is active, pushing symbol will add the symbol to the output
    input.innerText = output.innerText;
    ipString = input.innerText;
    input.innerText += symbol;
  }

  ipString = ipString + symb;
  opActive = false;
  percentActive = false;
  symbolChecker(symb);
};

//backspace implementation
const backspace = function () {
  if (input.innerText.slice(-1) === "%") {
    input.innerText = input.innerText.slice(0, -1);
    ipString = ipString.slice(0, -4);
    console.log(ipString);
  } else {
    replacer();
    if (input.innerText === "") {
      input.innerText = "0";
      return;
    }
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//event handlers
btnAll.addEventListener("click", function (e) {
  if (e.target.classList.contains("basic-button")) {
    container(e.target, ".button-container");
    colors(e.target);
  }

  if (e.target.classList.contains("rainbow-button")) {
    saveConfig();
    btns.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    body.classList.add("rainbow");
    screen.classList.add("rainbow");
    buttons.forEach((btn) => {
      btn.classList.add("rainbow");
    });
  }
});

//for click events on operands and operations
body.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("all-clear")) allClearBtn();
  if (e.target.classList.contains("delete")) backspace();
  if (e.target.classList.contains("number")) addNumber(e.target.innerText);
  if (e.target.classList.contains("symbol")) addSymbol(e.target.innerText);
  if (e.target.classList.contains("percent")) addPercent(e.target.innerText);
  if (e.target.classList.contains("equalsTo")) compute();
});

window.addEventListener("keydown", function (e) {
  e.preventDefault();
  console.log(e.key);
  if (Number(e.key)) addNumber(e.key);
  if (e.key === "0") addNumber(e.key);

  if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "*" ||
    e.key === "/" ||
    e.key === "."
  )
    addSymbol(e.key);

  if (e.key === "Backspace") backspace();

  if (e.key === "Enter") compute();
});
