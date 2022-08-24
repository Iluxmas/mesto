export default class Card {
  constructor(
    name,
    link,
    likes,
    cardId,
    isOwner,
    isLiked,
    templateClass,
    handleCardClick,
    handleCardDelete,
    handleCardLike
  ) {
    this._title = name;
    this._source = link;
    this._likesArray = likes;
    this._cardId = cardId;
    this._isOwner = isOwner;
    this.isLiked = isLiked;
    this.templateClass = templateClass;
    this._handleCardClick = handleCardClick.bind(this);
    this._handleCardDelete = handleCardDelete.bind(this);
    this._handleCardLike = handleCardLike.bind(this);
  }

  _setEventListeners() {
    this.likeBttn.addEventListener("click", () => this._handleCardLike(this._cardId, this.isLiked));
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleCardClick(this._source, this._title));

    if (this._isOwner) {
      this._deleteBttn.addEventListener("click", () => this._handleCardDelete(this._cardId, this._cardElement));
    }
  }

  removeCard() {
    this._cardElement.remove();
  }

  toggleLike(data) {
    this.likesCounter.textContent = data.likes.length;
    this.isLiked = !this.isLiked;
    this.likeBttn.classList.toggle("card__like-button_active");
  }

  generateCard() {
    this._cardElement = document.querySelector(this.templateClass).content.querySelector(".card").cloneNode(true);

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._source;
    this._cardImage.alt = this._title;

    this._deleteBttn = this._cardElement.querySelector(".card__remove-button");
    this.likeBttn = this._cardElement.querySelector(".card__like-button");
    this.likesCounter = this._cardElement.querySelector(".card__like-counter");

    this._cardElement.querySelector(".card__title").textContent = this._title;
    this.likesCounter.textContent = this._likesArray.length;

    this._setEventListeners();

    if (!this._isOwner) {
      this._deleteBttn.style.display = "none";
    }

    if (this.isLiked) {
      this.likeBttn.classList.add("card__like-button_active");
    }

    return this._cardElement;
  }
}
