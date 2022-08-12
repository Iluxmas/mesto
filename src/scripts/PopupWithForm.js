import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, cbFormSubmit) {
    super(popupSelector);
    this._cbFormSubmit = cbFormSubmit.bind(this);
    this._form = this.popupElement.querySelector(".popup__form");
  }

  getInputValues() {
    return [...this.popupElement.querySelectorAll(".popup__input")].map((item) => item.value);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._cbFormSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener("submit", this._cbFormSubmit);
  }
}
