import {
  initialCards,
  formsData,
  cardsContainerSelector,
  popupImageSelector,
  popupProfileSelector,
  popupAddCardSelector,
  profileNameTextSelector,
  profileAboutTextSelector,
  cardTemplateID,
} from "./scripts/data.js";

import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import Section from "./scripts/Section.js";
import UserInfo from "./scripts/Userinfo.js";
import FormValidator from "./scripts/FormValidator.js";
import Card from "./scripts/Card.js";

import "./index.css";

// --------------- Объявляем переменные --------------

const bttnOpenPopupCard = document.querySelector(".profile__add-card");
const bttnOpenPopupProfile = document.querySelector(".profile__edit-button");

// -----------------  Описываем функции -----------------

function renderCard({ title, source }) {
  const newCard = new Card(title, source, cardTemplateID, handleCardClick);
  const cardElement = newCard.generateCard();
  sectionElement.addItem(cardElement);
}

function handleCardClick() {
  popupImage.open(this._source, this._title);
}

function openProfileModal() {
  formValidationProfile.refreshForm();

  const userCurrentData = userInfo.getUserInfo();
  popupUserModal.inputsList.forEach((item) => (item.value = userCurrentData[item.name]));

  formValidationProfile.toggleButtonState();
  popupUserModal.open();
}

function openAddCardModal() {
  formValidationAddCard.refreshForm();
  formValidationAddCard.toggleButtonState();
  popupNewCard.open();
}

function submitProfileData(event) {
  event.preventDefault();

  const userNewData = this.getInputValues();
  userInfo.setUserInfo(userNewData);

  this.close();
}

function submitNewCard(event) {
  event.preventDefault();

  const cardNewData = this.getInputValues();
  renderCard(cardNewData);

  this.close();
  formValidationAddCard.refreshForm();
  formValidationAddCard.toggleButtonState();
}

// Кнопка открытия модального окна профиля
bttnOpenPopupProfile.addEventListener("click", () => openProfileModal());

// Кнопка открытия модального новых карточек
bttnOpenPopupCard.addEventListener("click", () => openAddCardModal());

// ---------------- Запуск валидации форм ----------------
const formValidationProfile = new FormValidator(formsData, document.forms[0]);
const formValidationAddCard = new FormValidator(formsData, document.forms[1]);
formValidationProfile.enableValidation();
formValidationAddCard.enableValidation();

// ----------- Стартовый рендер карточек по массиву  ---------
const sectionElement = new Section({ items: initialCards, renderer: renderCard }, cardsContainerSelector);
sectionElement.render();

// ----------------- Создание экземпляров классов --------------
const popupImage = new PopupWithImage(popupImageSelector);
const popupUserModal = new PopupWithForm(popupProfileSelector, submitProfileData);
const popupNewCard = new PopupWithForm(popupAddCardSelector, submitNewCard);
const userInfo = new UserInfo(profileNameTextSelector, profileAboutTextSelector);
