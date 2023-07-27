"use strict";

const btns = document.querySelectorAll(".basic-button");
const btnContainer = document.querySelectorAll(".button-container");
const btnAll = document.querySelector(".customize");
const frame = document.querySelector(".frame");
const screen = document.querySelector(".screen");
const gridItem = document.querySelector(".grid-item");

//functions

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

/*
//changing the colors in the calculator
const borderChanger = function (element, color) {
  window.getComputedStyle(element).border = `5px solid #${color}`;
  console.log(element, color);
};

borderChanger("frame", "0f52ba");

const updateCalc = function () {
  window.getComputedStyle(frame).border = `hi`;
};
*/
//choosing the element that was clicked

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

/*const element = function (targetE) {
  if (targetE.closest(".border")) return "border";
};

const changeBorder = function (color) {
  //getting the window.getComputedStyle
  const computedStyle = window.getComputedStyle(element).elemen;
};

//changing the actual color
const colors = function (targetE) {
  const elementClicked = element(targetE);
  changeBorder();
};*/
