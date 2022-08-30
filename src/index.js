import {
  formsData,
  cardsContainerSelector,
  popupImageSelector,
  popupProfileSelector,
  popupAddCardSelector,
  profileNameTextSelector,
  profileAboutTextSelector,
  cardTemplateID,
  popupAvatarSelector,
  popupConfirmationSelector,
  profileAvatarImgSelector,
  apiData,
  profileBlockSelector,
} from "./scripts/data.js";

import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import Section from "./scripts/Section.js";
import UserInfo from "./scripts/Userinfo.js";
import FormValidator from "./scripts/FormValidator.js";
import Card from "./scripts/Card.js";
import ApiService from "./scripts/ApiService.js";

import "./index.css";

// --------------- Объявляем переменные --------------

const bttnOpenPopupCard = document.querySelector(".profile__add-card");
const bttnOpenPopupProfile = document.querySelector(".profile__edit-button");
const bttnOpenPopupAvatar = document.querySelector(".profile__avatar-edit");

// -----------------  Описываем функции -----------------

function renderCard({ name, link, likes, _id: cardId, owner }) {
  const isLiked = likes.map((userObj) => userObj._id).indexOf(userInfo.userId) > -1;
  const isOwner = userInfo.userId === owner._id;

  const newCard = new Card(
    name,
    link,
    likes,
    cardId,
    isOwner,
    isLiked,
    cardTemplateID,
    handleCardClick,
    handleCardDelete,
    handleCardLike
  );

  return newCard.generateCard();
}

// ручки
function handleCardClick(source, title) {
  popupImage.open(source, title);
}

function handleCardDelete(id, element) {
  popupDeleteConfirmation.id = id;
  popupDeleteConfirmation.element = element;
  popupDeleteConfirmation.open();
}

function handleCardLike(cardId, isLiked) {
  apiService
    .toggleLike(cardId, isLiked)
    .then((data) => this.toggleLike(data))
    .catch((err) => console.log(err));
}

// открывашки
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

function openAvatarModal() {
  formValidationAvatar.refreshForm();
  formValidationAvatar.toggleButtonState();
  popupAvatar.open();
}

// отправляшки
function submitProfileData(event) {
  event.preventDefault();
  const interval = incredibleUserExperience(true, this.submitBttn);

  const userNewData = this.getInputValues();
  const currentUserData = userInfo.getUserInfo();

  if (userInfo.isDataNew(currentUserData, userNewData)) {
    apiService
      .patchProfileData(userNewData)
      .then((data) => {
        userInfo.setUserInfo(data);
        this.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        clearInterval(interval);
        incredibleUserExperience(false, this.submitBttn);
      });
  } else {
    this.close();
  }
}

function submitNewCard(event) {
  event.preventDefault();
  const interval = incredibleUserExperience(true, this.submitBttn);

  const cardNewData = this.getInputValues();

  apiService
    .postNewCard(cardNewData)
    .then((data) => {
      sectionElement.addItem(renderCard(data));
      this.close();
      formValidationAddCard.refreshForm();
      formValidationAddCard.toggleButtonState();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      clearInterval(interval);
      incredibleUserExperience(false, this.submitBttn);
    });
}

function submitCardDeletion(event) {
  event.preventDefault();
  const interval = incredibleUserExperience(true, this.submitBttn);

  apiService
    .deleteCard(popupDeleteConfirmation.id)
    .then(() => {
      this.element.remove();
      popupDeleteConfirmation.close();
      return;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      clearInterval(interval);
      incredibleUserExperience(false, this.submitBttn);
    });
}

function submitNewAvatar(event) {
  event.preventDefault();
  const interval = incredibleUserExperience(true, this.submitBttn);

  const newAvatarData = this.getInputValues();

  apiService
    .patchProfileAvatar(newAvatarData)
    .then(() => apiService.getProfileInfo())
    .then((data) => {
      userInfo.setUserAvatar(data);
      this.close();
      formValidationAvatar.refreshForm();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      clearInterval(interval);
      incredibleUserExperience(false, this.submitBttn);
    });
}

// State-Of-Art award of UX Expo 2220 :D

function incredibleUserExperience(isLoading, element) {
  // effect only noticeable on slow connections
  let ms = 200;
  if (isLoading) {
    let interval = setInterval(() => {
      setTimeout(() => (element.textContent += " ."), 0);
      setTimeout(() => (element.textContent += " ."), ms);
      setTimeout(() => (element.textContent += " ."), ms * 2);
      setTimeout(() => (element.textContent = element.textContent.split(" ")[0]), ms * 3);
    }, ms * 4);
    return interval;
  } else {
    element.textContent = element.textContent.split(" ")[0];
  }
}

// Кнопка открытия модального окна профиля
bttnOpenPopupProfile.addEventListener("click", () => openProfileModal());

// Кнопка открытия модального окна новой карточки
bttnOpenPopupCard.addEventListener("click", () => openAddCardModal());

// Кнопка открытия модального окна изменения аватара
bttnOpenPopupAvatar.addEventListener("click", () => openAvatarModal());

// ----------- Стартовый рендер карточек по массиву  -----------
const sectionElement = new Section({ renderer: renderCard }, cardsContainerSelector);

// -------- Получение стартовой информации с сервера -----------

const apiService = new ApiService(apiData);

Promise.all([apiService.getProfileInfo(), apiService.getInitialCards()])
  .then((data) => {
    userInfo.setUserInfo(data[0]);
    userInfo.setUserAvatar(data[0]);
    userInfo.setUserId(data[0]);
    sectionElement.render(data[1].reverse());
  })
  .catch((err) => console.log(err));

// ---------- Создание и запуск экземпляров валидации форм -----------
const formValidationProfile = new FormValidator(formsData, document.forms[0]);
const formValidationAddCard = new FormValidator(formsData, document.forms[1]);
const formValidationAvatar = new FormValidator(formsData, document.forms[2]);
formValidationProfile.enableValidation();
formValidationAddCard.enableValidation();
formValidationAvatar.enableValidation();

// ----------------- Создание экземпляров классов --------------
const popupImage = new PopupWithImage(popupImageSelector);

const popupUserModal = new PopupWithForm(popupProfileSelector, submitProfileData);
const popupNewCard = new PopupWithForm(popupAddCardSelector, submitNewCard);
const popupAvatar = new PopupWithForm(popupAvatarSelector, submitNewAvatar);
const popupDeleteConfirmation = new PopupWithForm(popupConfirmationSelector, submitCardDeletion);

const userInfo = new UserInfo(
  profileBlockSelector,
  profileNameTextSelector,
  profileAboutTextSelector,
  profileAvatarImgSelector
);
