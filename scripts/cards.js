import { openModal, imageZoomed, imageZoomedCaption, modalImageZoom } from "./index.js";

// Описание класса карточек
export default class Card {
  constructor(name, source, templateClass) {
    this.name = name;
    this.source = source;
    this.templateClass = templateClass;
  }

  _setEventListeners(cardElement) {
    cardElement.querySelector(".card__like-button").addEventListener("click", this._toggleLike);
    cardElement.querySelector(".card__remove-button").addEventListener("click", () => cardElement.remove());
    cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => this._openImageModal(this.name, this.source));
  }

  _toggleLike(event) {
    event.target.classList.toggle("card__like-button_active");
  }

  _openImageModal(name, source) {
    imageZoomed.src = source;
    imageZoomed.alt = name;
    imageZoomedCaption.textContent = name;
    openModal(modalImageZoom);
  }

  generateCard() {
    const cardElement = document.querySelector(this.templateClass).content.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");

    cardImage.src = this.source;
    cardElement.querySelector(".card__title").textContent = this.name;
    cardElement.querySelector(".card__image").alt = this.name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}
