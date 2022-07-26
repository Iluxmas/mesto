import FormValidator from "./validation.js";
import Card from "./cards.js";

// Объявляем переменные

const profileAbout = document.querySelector(".profile__about");
const profileName = document.querySelector(".profile__name");
const addCardBttn = document.querySelector(".profile__add-card");
const cardsContainer = document.querySelector(".gallery__container");
const editProfileBttn = document.querySelector(".profile__edit-button");
const modalImageZoom = document.querySelector(".popup_card-zoom");
const imageZoomed = modalImageZoom.querySelector(".popup__zoom-image");
const bttnCloseModalZoom = modalImageZoom.querySelector(".popup__close-button");
const imageZoomedCaption = modalImageZoom.querySelector(".popup__image-caption");

const modalAddCard = document.querySelector(".popup_add-card");
const popupAddCardForm = modalAddCard.querySelector(".popup__form_add-card");
const bttnSubmitAddCard = modalAddCard.querySelector(".popup__form-save");
const bttnCloseModalAddCard = modalAddCard.querySelector(".popup__close-button");
const newCardName = modalAddCard.querySelector(".popup__input_type_title");
const newCardSrc = modalAddCard.querySelector(".popup__input_type_source");

const modalEditProfile = document.querySelector(".popup_profile-edit");
const popupProfileForm = modalEditProfile.querySelector(".popup__form_profile");
const bttnSubmitProfile = modalEditProfile.querySelector(".popup__form-save");
const bttnCloseModalProfile = modalEditProfile.querySelector(".popup__close-button");
const inputName = modalEditProfile.querySelector(".popup__input_type_name");
const inputAbout = modalEditProfile.querySelector(".popup__input_type_about");

const initialCards = [
  { name: "Афины", source: "./img/gallery_image_Athens_original.JPEG" },
  { name: "Атомиум, Брюссель", source: "./img/gallery_image_Brussel_original.JPG" },
  { name: "Остров Крит", source: "./img/gallery_image_Crete_original.JPEG" },
  { name: "Стамбульский кот", source: "./img/gallery_image_Istanbul_original.JPEG" },
  { name: "Кубические дома, Роттердам", source: "./img/gallery_image_Rotterdam_original.JPEG" },
  { name: "Свети-Стефан", source: "./img/gallery_image_SvetiStephan_original.JPEG" },
];

const formsData = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__form-save",
  inactiveButtonClass: "popup__form-save_type_inactive",
  inputErrorClass: "popup__input_type_error",
  errorVisibleClass: "popup__error_visible",
};
// ---------------  Описываем функции --------------

function openModal(popup) {
  popup.classList.add("popup_opened");
  addPopupEventListeners(popup);
}

function closeModal(popup) {
  popup.classList.remove("popup_opened");
  removePopupEventListeners(popup);
}

function clearErrors(popup) {
  const formElement = popup.querySelector(".popup__form");
  const inputsList = [...formElement.querySelectorAll(formsData.inputSelector)];

  inputsList.forEach((item) => {
    item.nextElementSibling.classList.remove(formsData.errorVisibleClass);
    item.classList.remove(formsData.inputErrorClass);
  });
  formElement.reset();
}

function closeModalOverlayHandler(event) {
  if (event.target == event.currentTarget) {
    const popupElement = event.currentTarget;
    closeModal(popupElement);
  }
}

function closeModalEscapeHandler(event) {
  if (event.key === "Escape") {
    const popupElement = document.querySelector(".popup_opened");
    closeModal(popupElement);
  }
}

function addPopupEventListeners(popupElement) {
  popupElement.addEventListener("mousedown", closeModalOverlayHandler);
  document.addEventListener("keydown", closeModalEscapeHandler);
}

function removePopupEventListeners(popupElement) {
  popupElement.removeEventListener("mousedown", closeModalOverlayHandler);
  document.removeEventListener("keydown", closeModalEscapeHandler);
}

function openEditModal() {
  clearErrors(modalEditProfile);

  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;

  bttnSubmitProfile.classList.remove("popup__form-save_type_inactive");
  bttnSubmitProfile.removeAttribute("disabled");

  openModal(modalEditProfile);
}

function openAddCardModal() {
  clearErrors(modalAddCard);
  openModal(modalAddCard);
}

function submitProfileData(event) {
  event.preventDefault();
  const popupElement = event.target.closest(".popup");

  if (inputName.validity.valid && inputAbout.validity.valid) {
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closeModal(popupElement);
  }
}

function submitNewCard(event) {
  event.preventDefault();
  const popupElement = event.target.closest(".popup");

  if (newCardName.validity.valid && newCardSrc.validity.valid) {
    const newCard = new Card(newCardName.value, newCardSrc.value, "#card-template");
    const cardElement = newCard.generateCard();
    cardsContainer.prepend(cardElement);

    popupAddCardForm.reset();
    closeModal(popupElement);
    bttnSubmitAddCard.classList.add(formsData.inactiveButtonClass);
    bttnSubmitAddCard.setAttribute("disabled", "");
  }
}

// --------------- Навешиваем обработчики ---------------

// Кнопка сохранения формы профиля
popupProfileForm.addEventListener("submit", submitProfileData);

// Кнопка открытия модального окна профиля
editProfileBttn.addEventListener("click", openEditModal);

// Кнопка добавления карточек
addCardBttn.addEventListener("click", openAddCardModal);

// Кнопка сохранение формы новой карточки
popupAddCardForm.addEventListener("submit", submitNewCard);

// Кнопки закрытия попапов
bttnCloseModalZoom.addEventListener("click", () => closeModal(modalImageZoom));
bttnCloseModalAddCard.addEventListener("click", () => closeModal(modalAddCard));
bttnCloseModalProfile.addEventListener("click", () => closeModal(modalEditProfile));

// ---------------  Запуск валидации форм ---------------

[...document.forms].forEach((form) => {
  const formValidation = new FormValidator(formsData, form);
  formValidation.enableValidation();
});

// --------- Стартовый рендер карточек по массиву и template -------

initialCards.forEach((item) => {
  const newCard = new Card(item.name, item.source, "#card-template");
  const cardElement = newCard.generateCard();
  cardsContainer.append(cardElement);
});

export { openModal, imageZoomed, imageZoomedCaption, modalImageZoom };
