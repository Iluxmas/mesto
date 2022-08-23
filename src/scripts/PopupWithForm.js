import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, cbFormSubmit) {
    super(popupSelector);
    this._cbFormSubmit = cbFormSubmit.bind(this);
    this._form = this.popupElement.querySelector(".popup__form");
    this.inputsList = [...this.popupElement.querySelectorAll(".popup__input")];
    this._submitBttn = this._form.querySelector(".popup__form-save");
  }

  getInputValues() {
    const inputsValuesObj = {};
    this.inputsList.forEach((item) => (inputsValuesObj[item.name] = item.value));
    return inputsValuesObj;
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
