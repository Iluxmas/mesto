// function checkInputValidity(formElement, inputElement, errorVisibleClass, inputErrorClass) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, errorVisibleClass, inputErrorClass, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement, errorVisibleClass, inputErrorClass);
//   }
// }

// function showInputError(formElement, inputElement, errorVisibleClass, inputErrorClass, errorMessage) {
//   const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
//   inputElement.classList.add(inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorVisibleClass);
// }

// function hideInputError(formElement, inputElement, errorVisibleClass, inputErrorClass) {
//   const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorVisibleClass);
//   errorElement.textContent = "";
// }

// function hasInvalidInput([...inputsList]) {
//   return inputsList.some((inputElement) => !inputElement.validity.valid);
// }

// function toggleButtonState([...inputList], buttonElement, inactiveButtonClass) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(inactiveButtonClass);
//     buttonElement.setAttribute("disabled", "");
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//     buttonElement.removeAttribute("disabled");
//   }
// }

// function setEventListeners(
//   formElement,
//   inputSelector,
//   errorVisibleClass,
//   inputErrorClass,
//   submitButtonSelector,
//   inactiveButtonClass
// ) {
//   const inputsList = [...formElement.querySelectorAll(inputSelector)];
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputsList, buttonElement);
//   inputsList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(formElement, inputElement, errorVisibleClass, inputErrorClass);
//       toggleButtonState(inputsList, buttonElement, inactiveButtonClass);
//     });
//   });
// }

// function enableValidation({
//   formSelector,
//   inputSelector,
//   submitButtonSelector,
//   inactiveButtonClass,
//   inputErrorClass,
//   errorVisibleClass,
// }) {
//   const formsList = [...document.querySelectorAll(formSelector)];
//   formsList.forEach((formElement) => {
//     formElement.addEventListener("submit", (event) => event.preventDefault());

//     setEventListeners(
//       formElement,
//       inputSelector,
//       errorVisibleClass,
//       inputErrorClass,
//       submitButtonSelector,
//       inactiveButtonClass
//     );
//   });
// }

// //enableValidation(formsData);

//

//
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
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.classList.add(this.errorVisibleClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorVisibleClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput([...inputsList]) {
    return inputsList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState([...inputList], buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    const inputsList = this.formElement.querySelectorAll(this.inputSelector);
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);

    this._toggleButtonState(inputsList, buttonElement);

    inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputsList, buttonElement);
      });
    });
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (event) => event.preventDefault());
    this._setEventListeners();
  }
}
