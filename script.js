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

/*
//capturing the state before rainbow
const state = function(){
  borderColor = body.
}
*/

//setting the default calculator setting after exiting the rainbow setting
const defaultSetting = function () {
  btnContainer.forEach((container) =>
    container.querySelector(".basic-button").classList.add("active")
  );
};

//to set the active class to the elements
const container = function (targetE, className) {
  const clickedContainer = targetE.closest(className);

  [...clickedContainer.children].forEach((child) =>
    child.classList.remove("active")
  );

  const rainbow = targetE
    .closest(".customize")
    .querySelector(".rainbow-button");

  if (
    rainbow.classList.contains("active") &&
    targetE.classList.contains("basic-button")
  ) {
    rainbow.classList.remove("active");
    defaultSetting();
  }

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

//variables needed for functionalities
const currentValue = "0";
const maxDisplayLength = 16;
let opActive = false;
let ipString = "";
let symbolActive = false;
let dotActive = false;
let mulActive = "";

//all clearing the calculator
const allClearBtn = function () {
  input.innerText = "0";
  output.innerText = "0";
  opActive = false;
  ipString = "";
};

//clearing the input
const clearBtn = function () {
  input.innerText = "0";
  ipString = "";
};

//changing the sign
const changeSign = function () {
  input.innerText = -Number(output.innerText);
  opActive = console.log(output.innerText);
};

//computing and showing output
const compute = function () {
  if (ipString.includes("%")) {
    console.log("%");
    return;
  }
  const string = eval(ipString);
  output.innerText = string;
  opActive = true;
};

//adding the input to the screen

const addNumber = function (number) {
  if (!opActive) {
    if (input.innerText === "0") {
      input.innerText = number;
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
  console.log(ipString);
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
      return ".";
    default:
      return "-";
  }
};

const addSymbol = function (symbol) {
  if (symbol === "*") symbol = "×";
  if (symbol === "/") symbol = "÷";
  const symb = convert(symbol);
  if (!opActive) {
    if (!symbolActive) {
      input.innerText += symbol;
    } else {
      // if (
      //   (activeSymbol === "*" || activeSymbol === "/") &&
      //   (symbol === "×" || symbol === "÷")
      // ) {
      input.innerText = input.innerText.slice(0, -1);
      input.innerText += symbol;
      // activeSymbol = input.innerText.slice(-1);
      // console.log(activeSymbol);
      ipString = ipString.slice(0, -1);
      // }
    }
  } else {
    input.innerText = output.innerText;
    input.innerText += symbol;
  }
  opActive = false;
  ipString = ipString + symb;
  // if (symb === "+" || symb === "-")
  symbolActive = true;
};

// const addPercent = const()

//backspace implementation
const backspace = function () {
  input.innerText = input.innerText.slice(0, -1);
  if (input.innerText === "") {
    input.innerText = "0";
    return;
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//event handlers
btnAll.addEventListener("click", function (e) {
  if (e.target.classList.contains("basic-button")) {
    container(e.target, ".button-container");
    colors(e.target);
  }

  if (e.target.classList.contains("mode-button")) container(e.target, ".mode");

  if (e.target.classList.contains("rainbow-button")) {
    btns.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
  }
});

//for click events on operands and operations

body.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("all-clear")) allClearBtn();
  if (e.target.classList.contains("clear")) clearBtn();
  if (e.target.classList.contains("changer")) changeSign();
  if (e.target.classList.contains("number")) addNumber(e.target.innerText);
  if (e.target.classList.contains("symbol")) addSymbol(e.target.innerText);
  if (e.target.classList.contains("percent")) addPercent(e.target.innerText);
  if (e.target.classList.contains("equalsTo")) compute();
});

window.addEventListener("keydown", function (e) {
  e.preventDefault();
  console.log(e.key);
  if (Number(e.key)) addNumber(e.key);

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

/*
  if (currentValue === "0" || currentValue === "Error") {
    currentValue = number;
  } else {
    currentValue += number;
  }
  // Truncate the displayed value if it exceeds the maximum length
  if (currentValue.length > maxDisplayLength) {
    currentValue = currentValue.slice(currentValue.length - maxDisplayLength);
  }
  input.innerText = currentValue;
  */
