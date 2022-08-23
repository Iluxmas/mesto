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

  const cardElement = newCard.generateCard();
  sectionElement.addItem(cardElement);
}

function handleCardClick() {
  popupImage.open(this._source, this._title);
}

function handleCardDelete(id) {
  popupDeleteConfirmation.id = id;
  popupDeleteConfirmation.open();
}

function handleCardLike(cardId, isLiked) {
  apiService
    .toggleLike(cardId, isLiked)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Проблема с проставкой лайка");
    })
    .then((data) => {
      this.likesCounter.textContent = data.likes.length;
      this.isLiked = !this.isLiked;
      this.likeBttn.classList.toggle("card__like-button_active");
    })
    .catch((err) => console.log(err));
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

function openAvatarModal() {
  formValidationAvatar.refreshForm();
  formValidationAvatar.toggleButtonState();
  popupAvatar.open();
}

function incredibleUserExperience(isLoading, element) {
  let ms = 200;
  if (isLoading) {
    let counter = 0;
    let interval = setInterval(() => {
      setTimeout(() => (element.textContent += " ."), 0);
      setTimeout(() => (element.textContent += " ."), ms);
      setTimeout(() => (element.textContent += " ."), ms * 2);
      setTimeout(() => (element.textContent = element.textContent.split(" ")[0]), ms * 3);

      if (counter++ === 5) {
        clearInterval(interval);
      }
    }, ms * 4);
  } else {
    element.textContent = element.textContent.split(" ")[0];
  }
}

function submitProfileData(event) {
  event.preventDefault();
  incredibleUserExperience(true, this._submitBttn);

  const userNewData = this.getInputValues();
  const currentUserData = userInfo.getUserInfo();

  if (userInfo.isDataNew(currentUserData, userNewData)) {
    apiService
      .patchProfileData(userNewData)
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject("Не получилось обновить данные профиля...");
      })
      .then((data) => userInfo.setUserInfo(data))
      .catch((err) => console.log(err))
      .finally(() => {
        incredibleUserExperience(false, this._submitBttn);
        this.close();
      });
  } else {
    this.close();
  }
}

function submitNewCard(event) {
  event.preventDefault();
  incredibleUserExperience(true, this._submitBttn);

  const cardNewData = this.getInputValues();

  apiService
    .postNewCard(cardNewData)
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject("Проблема с загрузкой новой карточки");
    })
    .then((data) => {
      renderCard(data);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      incredibleUserExperience(false, this._submitBttn);
      this.close();
      formValidationAddCard.refreshForm();
      formValidationAddCard.toggleButtonState();
    });
}

function submitCardDeletion(event) {
  event.preventDefault();
  incredibleUserExperience(true, this._submitBttn);

  apiService
    .deleteCard(popupDeleteConfirmation.id)
    .then(() => apiService.getInitialCards())
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(
        `Данные карточек не загрузились... Сервер спит... А бэкендеры уже нет \n status: ${res.status}`
      );
    })
    .then((data) => {
      sectionElement.items = data;
      sectionElement.render();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      incredibleUserExperience(false, this._submitBttn);

      popupDeleteConfirmation.close();
    });
}

function submitNewAvatar(event) {
  event.preventDefault();
  incredibleUserExperience(true, this._submitBttn);

  const newAvatarData = this.getInputValues();

  apiService
    .patchProfileAvatar(newAvatarData)
    .then(() => apiService.getProfileInfo())
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Данные профиля не грузятся... Сервер спит... А бэкендеры уже нет");
    })
    .then((data) => {
      userInfo.setUserAvatar(data);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      incredibleUserExperience(false, this._submitBttn);
      this.close();
      formValidationAvatar.refreshForm();
    });
}

// Кнопка открытия модального окна профиля
bttnOpenPopupProfile.addEventListener("click", () => openProfileModal());

// Кнопка открытия модального окна новой карточки
bttnOpenPopupCard.addEventListener("click", () => openAddCardModal());

// Кнопка открытия модального окна изменения аватара
bttnOpenPopupAvatar.addEventListener("click", () => openAvatarModal());

// ----------- Стартовый рендер карточек по массиву  -----------
const sectionElement = new Section({ items: null, renderer: renderCard }, cardsContainerSelector);

// -------- Получение стартовой информации с сервера -----------

const apiService = new ApiService(apiData);

apiService
  .getProfileInfo()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Данные профиля не грузятся... Сервер спит... А бэкендеры уже нет");
  })
  .then((data) => {
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
    userInfo.setUserId(data);
  })
  .catch((err) => console.log(err));

apiService
  .getInitialCards()
  .then((res) => {
    if (res.ok) return res.json();
    return Promise.reject("Данные карточек не загрузились... Сервер спит... А бэкендеры уже нет");
  })
  .then((data) => {
    data.forEach((card) => renderCard(card));
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
