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
import FormValidator from "./scripts/Validation.js";
import Card from "./scripts/Card.js";

import "./index.css";

// --------------- Объявляем переменные --------------

const bttnOpenPopupCard = document.querySelector(".profile__add-card");
const bttnOpenPopupProfile = document.querySelector(".profile__edit-button");

// -----------------  Описываем функции -----------------

function renderCard({ name, source }) {
  const newCard = new Card(name, source, cardTemplateID, handleCardClick);
  const cardElement = newCard.generateCard();
  sectionElement.addItem(cardElement);
}

function handleCardClick() {
  popupImage.open(this._source, this._name);
}

function openProfileModal() {
  formValidationProfile.refreshForm();

  const userCurrentData = userInfo.getUserInfo();
  formValidationProfile.inputsList[0].value = userCurrentData.name;
  formValidationProfile.inputsList[1].value = userCurrentData.info;

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
  userInfo.setUserInfo({ name: userNewData[0], info: userNewData[1] });

  this.close();
}

function submitNewCard(event) {
  event.preventDefault();

  const cardNewData = this.getInputValues();
  renderCard({ name: cardNewData[0], source: cardNewData[1] });

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
