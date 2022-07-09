const formsData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-save',
    inactiveButtonClass: 'popup__form-save_type_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorVisibleClass: 'popup__error_visible'
};

function checkInputValidity(formElement, inputElement, errorVisibleClass, inputErrorClass) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, errorVisibleClass, inputErrorClass, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement, errorVisibleClass, inputErrorClass);
    }
};

function showInputError(formElement, inputElement, errorVisibleClass, inputErrorClass, errorMessage) {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorVisibleClass);
};

function hideInputError(formElement, inputElement, errorVisibleClass, inputErrorClass) {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorVisibleClass);
    errorElement.textContent = '';
};

function hasInvalidInput([...inputsList]) {
    return inputsList.some(inputElement => !inputElement.validity.valid);
}

function toggleButtonState([...inputList], buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

function setEventListeners(formElement, inputSelector, errorVisibleClass, inputErrorClass, submitButtonSelector, inactiveButtonClass) {
    const inputsList = [...formElement.querySelectorAll(inputSelector)];
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputsList, buttonElement);
    inputsList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {

            checkInputValidity(formElement, inputElement, errorVisibleClass, inputErrorClass);
            toggleButtonState(inputsList, buttonElement, inactiveButtonClass);
        });
    });
};

function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorVisibleClass
}) {
    const formsList = [...document.querySelectorAll(formSelector)];
    formsList.forEach((formElement) => {
        formElement.addEventListener('submit', event => event.preventDefault());

        setEventListeners(formElement, inputSelector, errorVisibleClass, inputErrorClass, submitButtonSelector, inactiveButtonClass);
    });
};

enableValidation(formsData);