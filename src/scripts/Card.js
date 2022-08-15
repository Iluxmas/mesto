export default class Card {
  constructor(title, source, templateClass, handleCardClick) {
    this._title = title;
    this._source = source;
    this.templateClass = templateClass;
    this._handleCardClick = handleCardClick.bind(this);
  }

  _setEventListeners() {
    this._cardElement.querySelector(".card__like-button").addEventListener("click", this._toggleLike);
    this._cardElement.querySelector(".card__remove-button").addEventListener("click", () => this._removeCard());
    this._cardElement.querySelector(".card__image").addEventListener("click", () => this._handleCardClick());
  }

  _removeCard() {
    this._cardElement.remove();
  }

  _toggleLike(event) {
    event.target.classList.toggle("card__like-button_active");
  }

  generateCard() {
    this._cardElement = document.querySelector(this.templateClass).content.querySelector(".card").cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardImage.src = this._source;
    this._cardImage.alt = this._title;

    this._cardElement.querySelector(".card__title").textContent = this._title;

    this._setEventListeners();

    return this._cardElement;
  }
}
