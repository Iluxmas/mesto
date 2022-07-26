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
    cardElement.querySelector(".card__image").addEventListener("click", () => this._openImageModal());
  }

  _toggleLike(event) {
    event.target.classList.toggle("card__like-button_active");
  }

  _openImageModal() {
    imageZoomed.src = this.source;
    imageZoomed.alt = this.name;
    imageZoomedCaption.textContent = this.name;
    openModal(modalImageZoom);
  }

  generateCard() {
    this.cardElement = document.querySelector(this.templateClass).content.querySelector(".card").cloneNode(true);
    this.cardImage = this.cardElement.querySelector(".card__image");

    this.cardImage.src = this.source;
    this.cardElement.querySelector(".card__title").textContent = this.name;
    this.cardElement.querySelector(".card__image").alt = this.name;

    this._setEventListeners(this.cardElement);

    return this.cardElement;
  }
}
