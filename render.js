//import products from './data/proucts.js';
import galleryItems from "./gallery-items.js";

const arrowRightKey = "ArrowRight";
const arrowLeftKey = "ArrowLeft";
const escapeKey = "Escape";

let currentPosition;

let position = 1;
const minPosition = 1;
const maxPosition = galleryItems.length;

// console.log(galleryItems);

const galleryLiEl = galleryItems.map((item) => {
  const liEl = document.createElement("li");
  liEl.classList.add("gallery__item");

  const aEl = document.createElement("a");
  aEl.classList.add("gallery__link");
  aEl.href = item.original;

  const imgEl = document.createElement("img");
  imgEl.classList.add("gallery__image");
  imgEl.src = item.preview;
  imgEl.dataset.source = item.original;
  imgEl.dataset.position = position++;
  imgEl.alt = item.description;

  aEl.appendChild(imgEl);
  liEl.appendChild(aEl);
  return liEl;
});

function setPosition() {
  return (position += 1);
}
// console.dir(galleryLiEl);

const galleryEl = document.querySelector(".js-gallery");
const modalWindow = document.querySelector(".js-lightbox");
const btnCloseModal = document.querySelector(
  "button[data-action=close-lightbox]"
);
const imgModal = document.querySelector(".lightbox__image");
const overlayModal = document.querySelector(".lightbox__overlay");

// console.log(galleryEl);
// console.log(modalWindow);
// console.log(btnCloseModal);
// console.log(imgModal);
// console.log(overlayModal);

galleryEl.append(...galleryLiEl);

overlayModal.addEventListener("click", onOverlayClick);
document.addEventListener("keydown", escKeyCloseModal);
galleryEl.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);

// modalWindow.addEventListener("click", closeModal);

function escKeyCloseModal(e) {
  const presKey = e.key; 
  
  if (presKey === escapeKey) {
    // console.log("enter Escape");
    closeModal();
  }
  if (presKey === arrowLeftKey) {
    // console.log("Ліва стрілка");
    prevImage();
  }
  if (presKey === arrowRightKey) {
    // console.log("права стрілка");
    nextImage();
  }
}

function onOverlayClick(e) {
  // console.log(e.target);
  closeModal();
}

function openModal(evt) {
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  // console.log(evt.target.nodeName);
  evt.preventDefault();
  modalWindow.classList.add("is-open");
  setSrcImg(evt.target);
  currentPosition = evt.target.dataset.position;
  console.log(currentPosition);
}

function closeModal(e) {
  // console.log(e.target);
  modalWindow.classList.remove("is-open");
  cleanScrImgModal();
}

function setSrcImg(imgEl) {
  imgModal.src = imgEl.dataset.source;
  imgModal.alt = imgEl.alt;
}

function cleanScrImgModal() {
  imgModal.src = "";
  imgModal.alt = "";
}

function prevImage() {
  currentPosition = Number(currentPosition) - 1;
  if (currentPosition >= minPosition) {   
    setSrcImg(getImgEl(currentPosition));
  }
  else {
    currentPosition = maxPosition;
   setSrcImg(getImgEl(currentPosition));
  }
}

function nextImage() {
  currentPosition = Number(currentPosition) + 1;
  // console.log(t)
  if (currentPosition <= maxPosition) {
    setSrcImg(getImgEl(currentPosition));
  }
  else {
    currentPosition = minPosition;
    setSrcImg(getImgEl(currentPosition));
  }
}

function getImgEl(curPos) {
  return document.querySelector(`img[data-position='${curPos}']`);
}