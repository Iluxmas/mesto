export default class FormValidator {
  constructor(
    { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorVisibleClass },
    formElement
  ) {
    this.inputSelector = inputSelector;
    this.submitButtonSelector = submitButtonSelector;
    this.inactiveButtonClass = inactiveButtonClass;
    this.inputErrorClass = inputErrorClass;
    this.errorVisibleClass = errorVisibleClass;
    this.formElement = formElement;
    this.inputsList = [...this.formElement.querySelectorAll(this.inputSelector)];
    this._buttonElement = this.formElement.querySelector(this.submitButtonSelector);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.classList.add(this.errorVisibleClass);
    errorElement.textContent = errorMessage;
  }

  hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorVisibleClass);
    errorElement.textContent = "";
  }

  refreshForm() {
    this.inputsList.forEach((input) => {
      this.hideInputError(input);
      input.value = "";
    });
  }

  _hasInvalidInput() {
    return this.inputsList.some((inputElement) => !inputElement.validity.valid);
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(this.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    this.toggleButtonState();
    this.inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (event) => event.preventDefault());
    this._setEventListeners();
  }
}
