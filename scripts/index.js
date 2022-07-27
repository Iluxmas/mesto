import FormValidator from "./validation.js";
import Card from "./cards.js";
import { initialCards, formsData } from "./data.js";

// ------------ Объявляем переменные --------------

const profileAbout = document.querySelector(".profile__about");
const profileName = document.querySelector(".profile__name");
const bttnOpenPopupCard = document.querySelector(".profile__add-card");
const cardsContainer = document.querySelector(".gallery__container");
const bttnOpenPopupProfile = document.querySelector(".profile__edit-button");

const modalImageZoom = document.querySelector(".popup_card-zoom");
const bttnCloseModalZoom = modalImageZoom.querySelector(".popup__close-button");
const imageZoomed = modalImageZoom.querySelector(".popup__zoom-image");
const imageZoomedCaption = modalImageZoom.querySelector(".popup__image-caption");
const modalAddCard = document.querySelector(".popup_add-card");
const formPopupAddCard = modalAddCard.querySelector(".popup__form_add-card");
const bttnSubmitAddCard = modalAddCard.querySelector(".popup__form-save");
const inputsListAddCard = [...modalAddCard.querySelectorAll(".popup__input")];
const bttnCloseModalAddCard = modalAddCard.querySelector(".popup__close-button");
const newCardName = modalAddCard.querySelector(".popup__input_type_title");
const newCardSrc = modalAddCard.querySelector(".popup__input_type_source");

const modalEditProfile = document.querySelector(".popup_profile-edit");
const formPopupProfile = modalEditProfile.querySelector(".popup__form_profile");
const bttnSubmitProfile = modalEditProfile.querySelector(".popup__form-save");
const inputsListProfile = [...modalEditProfile.querySelectorAll(".popup__input")];
const bttnCloseModalProfile = modalEditProfile.querySelector(".popup__close-button");
const inputName = modalEditProfile.querySelector(".popup__input_type_name");
const inputAbout = modalEditProfile.querySelector(".popup__input_type_about");

// ------------------  Описываем функции -----------------

function openModal(popup) {
  popup.classList.add("popup_opened");
  addPopupEventListeners(popup);
}

function closeModal(popup) {
  popup.classList.remove("popup_opened");
  removePopupEventListeners(popup);
}

function addPopupEventListeners(popupElement) {
  popupElement.addEventListener("mousedown", closeModalOverlayHandler);
  document.addEventListener("keydown", closeModalEscapeHandler);
}

function removePopupEventListeners(popupElement) {
  popupElement.removeEventListener("mousedown", closeModalOverlayHandler);
  document.removeEventListener("keydown", closeModalEscapeHandler);
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

function openProfileModal() {
  formValidationProfile.refreshForm();

  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;

  formValidationProfile.toggleButtonState();

  openModal(modalEditProfile);
}

function openAddCardModal() {
  formValidationAddCard.refreshForm();
  formValidationAddCard.toggleButtonState();

  openModal(modalAddCard);
}

function createCard(name, src, templateId) {
  const newCard = new Card(name, src, templateId);
  const cardElement = newCard.generateCard();
  return cardElement;
}

function renderCard(name, src, templateId, container) {
  const newCard = createCard(name, src, templateId);
  container.prepend(newCard);
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

  renderCard(newCardName.value, newCardSrc.value, "#card-template", cardsContainer);

  formPopupAddCard.reset();
  formValidationAddCard.toggleButtonState();

  const popupElement = event.target.closest(".popup");
  closeModal(popupElement);
}

// ------------------ Навешиваем обработчики -------------------

// Кнопка сохранения формы профиля
formPopupProfile.addEventListener("submit", submitProfileData);

// Кнопка сохранение формы новой карточки
formPopupAddCard.addEventListener("submit", submitNewCard);

// Кнопка открытия модального окна профиля
bttnOpenPopupProfile.addEventListener("click", openProfileModal);

// Кнопка открытия модального новых карточек
bttnOpenPopupCard.addEventListener("click", openAddCardModal);

// Кнопки закрытия попапов
bttnCloseModalZoom.addEventListener("click", () => closeModal(modalImageZoom));
bttnCloseModalAddCard.addEventListener("click", () => closeModal(modalAddCard));
bttnCloseModalProfile.addEventListener("click", () => closeModal(modalEditProfile));

// ---------------- Запуск валидации форм ----------------
const formValidationProfile = new FormValidator(formsData, document.forms[0]);
const formValidationAddCard = new FormValidator(formsData, document.forms[1]);
formValidationProfile.enableValidation();
formValidationAddCard.enableValidation();

// --------- Стартовый рендер карточек по массиву и template -------
initialCards.forEach((item) => renderCard(item.name, item.source, "#card-template", cardsContainer));

export { openModal, imageZoomed, imageZoomedCaption, modalImageZoom };
