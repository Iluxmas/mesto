export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this._bttnClosePopup = this.popupElement.querySelector(".popup__close-button");
    this._boundEscHandler = this._handleEscClose.bind(this);
    this._boundOverlayHandler = this._closeModalOverlayHandler.bind(this);
    this._boundClose = this.close.bind(this);
  }

  open() {
    this.popupElement.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this.popupElement.classList.remove("popup_opened");
    this.removeEventListeners();
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  _closeModalOverlayHandler(event) {
    if (event.target == event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._bttnClosePopup.addEventListener("click", this._boundClose);
    this.popupElement.addEventListener("mousedown", this._boundOverlayHandler);
    document.addEventListener("keydown", this._boundEscHandler);
  }

  removeEventListeners() {
    this._bttnClosePopup.removeEventListener("click", this._boundClose);
    this.popupElement.removeEventListener("mousedown", this._boundOverlayHandler);
    document.removeEventListener("keydown", this._boundEscHandler);
  }
}
