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

  if (rainbow.classList.contains("active")) {
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
    targetE.closest(".button-container").previousElementSibling.textContent
  );
  return text.toLowerCase();
};

//all clearing the calculator
const allClearBtn = function () {
  input.textContent = "0";
  output.textContent = "";
};

//clearing the input
const clearBtn = function () {
  input.textContent = "0";
};

//changing the sign
const changeSign = function () {
  input.textContent = -Number(output.textContent);
};

//adding the input to the screen
const currentValue = "0";
const maxDisplayLength = 16;

const inputScreen = function (number) {
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
  input.textContent = currentValue;
  */
  if (number === "*") number = "×";
  if (number === "/") number = "÷";
  if (input.textContent === "0") {
    input.textContent = number;
  } else {
    input.textContent += number;
  }
};

//backspace implementation
const backspace = function () {
  input.textContent = input.textContent.slice(0, -1);
  if (input.textContent === "") {
    input.textContent = "0";
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

body.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("all-clear")) allClearBtn();
  if (e.target.classList.contains("clear")) clearBtn();
  if (e.target.closest(".buttons").classList.contains("changer")) changeSign();
  if (
    e.target.classList.contains("symbol") ||
    e.target.classList.contains("number")
  )
    inputScreen(e.target.textContent);
});

window.addEventListener("keydown", function (e) {
  e.preventDefault();
  console.log(e.key);
  if (
    Number(e.key) ||
    e.key === "+" ||
    e.key === "-" ||
    e.key === "*" ||
    e.key === "/" ||
    e.key === "."
  )
    inputScreen(e.key);

  if (e.key === "Backspace") backspace();
});

// console.log(Number("a"));
