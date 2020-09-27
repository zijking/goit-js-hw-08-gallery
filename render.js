//import products from './data/proucts.js';
import galleryItems from "./gallery-items.js";

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
  imgEl.alt = item.description;

  aEl.appendChild(imgEl);
  liEl.appendChild(aEl);
  return liEl;
});

// console.dir(galleryLiEl);

const galleryEl = document.querySelector(".js-gallery");
const modalWindow = document.querySelector(".js-lightbox");
const btnCloseModal = document.querySelector(
  "button[data-action=close-lightbox]"
);
const imgModal = document.querySelector(".lightbox__image");

// console.log(galleryEl);
// console.log(modalWindow);
// console.log(btnCloseModal);
// console.log(imgModal);

galleryEl.append(...galleryLiEl);

galleryEl.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
// modalWindow.addEventListener("click", closeModal);

function openModal(evt) {
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  console.log(evt.target.nodeName);
  evt.preventDefault();
  modalWindow.classList.add("is-open");
  setSrcImg(evt.target);
}

function closeModal(e) {
  console.log(e.target);
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
