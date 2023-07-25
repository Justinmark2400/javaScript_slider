"use strict";

const slider = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dots = document.querySelector(".dots");
const slides = [...slider];
const noOfSlide = slides.length - 1;
let currentSlide = 0;

const createDots = function () {
  slides.forEach((slide, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dots__dot");
    dot.dataset.slide = i;
    dots.append(dot);
  });
};

const changeSlide = function (num) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translate(${(num + i) * 100}%)`;
  });
};

const changeDots = function (slide) {
  const dotsArr = [...document.querySelectorAll(".dots__dot")];
  dotsArr.forEach((dot) => dot.classList.remove("dots__dot--active"));
  dotsArr[slide].classList.add("dots__dot--active");
};

const previous = function () {
  currentSlide++;
  currentSlide = (currentSlide > 0 && -noOfSlide) || currentSlide;
  changeSlide(currentSlide);
  changeDots(Math.abs(currentSlide));
};

const next = function () {
  currentSlide--;
  currentSlide = (currentSlide >= -noOfSlide && currentSlide) || 0;
  changeSlide(currentSlide);
  changeDots(Math.abs(currentSlide));
};

const init = function () {
  createDots();
  changeSlide(currentSlide);
  changeDots(currentSlide);
};
init();

btnRight.addEventListener("click", next);
btnLeft.addEventListener("click", previous);

dots.addEventListener("click", function (e) {
  const target = e.target.closest(".dots__dot");
  if (!target) return;
  changeDots(target.dataset.slide);
  changeSlide(-target.dataset.slide);
  currentSlide = -target.dataset.slide;
});

document.body.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") previous();
  if (e.key === "ArrowRight") next();
});
