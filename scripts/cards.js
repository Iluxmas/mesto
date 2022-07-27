import { openModal, imageZoomed, imageZoomedCaption, modalImageZoom } from "./index.js";

// Описание класса карточек
export default class Card {
  constructor(name, source, templateClass) {
    this._name = name;
    this._source = source;
    this.templateClass = templateClass;
  }

  _setEventListeners() {
    this.cardElement.querySelector(".card__like-button").addEventListener("click", this._toggleLike);
    this.cardElement.querySelector(".card__remove-button").addEventListener("click", () => this.cardElement.remove());
    this.cardElement.querySelector(".card__image").addEventListener("click", () => this._openImageModal());
  }

  _toggleLike(event) {
    event.target.classList.toggle("card__like-button_active");
  }

  _openImageModal() {
    imageZoomed.src = this._source;
    imageZoomed.alt = this._name;
    imageZoomedCaption.textContent = this._name;
    openModal(modalImageZoom);
  }

  generateCard() {
    this.cardElement = document.querySelector(this.templateClass).content.querySelector(".card").cloneNode(true);
    this.cardImage = this.cardElement.querySelector(".card__image");

    this.cardImage.src = this._source;
    this.cardElement.querySelector(".card__title").textContent = this._name;
    this.cardElement.querySelector(".card__image").alt = this._name;

    this._setEventListeners();

    return this.cardElement;
  }
}
