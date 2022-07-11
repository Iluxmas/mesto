// Объявляем переменные и элементы

const popup = document.querySelectorAll('.popup');
const cardTemplate = document.querySelector('#card-template').content;
const profileAbout = document.querySelector('.profile__about');
const profileName = document.querySelector('.profile__name');
const addCardBttn = document.querySelector('.profile__add-card');
const deleteCardBttn = document.querySelector('.card__remove-button');
const cardsContainer = document.querySelector('.gallery__container');
const editProfileBttn = document.querySelector('.profile__edit-button');

const modalImageZoom = document.querySelector('.popup_card-zoom');
const imageZoomed = modalImageZoom.querySelector('.popup__zoom-image');
const bttnCloseModalZoom = modalImageZoom.querySelector('.popup__close-button');
const imageZoomedCaption = modalImageZoom.querySelector('.popup__image-caption');

const modalAddCard = document.querySelector('.popup_add-card');
const popupAddCardForm = modalAddCard.querySelector('.popup__form_add-card');
const bttnSubmitAddCard = modalAddCard.querySelector('.popup__form-save');
const inputsListAddCard = [...modalAddCard.querySelectorAll('.popup__input')];
const bttnCloseModalAddCard = modalAddCard.querySelector('.popup__close-button');
const newCardName = modalAddCard.querySelector('.popup__input_type_title');
const newCardSrc = modalAddCard.querySelector('.popup__input_type_source');

const modalEditProfile = document.querySelector('.popup_profile-edit');
const popupProfileForm = modalEditProfile.querySelector('.popup__form_profile');
const bttnSubmitProfile = modalEditProfile.querySelector('.popup__form-save');
const inputsListProfile = [...modalEditProfile.querySelectorAll('.popup__input')];
const bttnCloseModalProfile = modalEditProfile.querySelector('.popup__close-button');
const inputName = modalEditProfile.querySelector('.popup__input_type_name');
const inputAbout = modalEditProfile.querySelector('.popup__input_type_about');

// ---------------  Описываем функции -------------- 

function toggleLike(event) {
  event.target.classList.toggle('card__like-button_active');
};

function openModal(popup) {
  popup.classList.add('popup_opened');
  addPopupEventListeners(popup);
};

function closeModal(popup) {
  popup.classList.remove('popup_opened');
  removePopupEventListeners(popup);
};

function clearErrors(popup) {
  const formElement = popup.querySelector(formsData.formSelector);
  const inputsList = [...formElement.querySelectorAll(formsData.inputSelector)];
  inputsList.forEach(item => hideInputError(formElement, item, formsData.errorVisibleClass, formsData.inputErrorClass));
  formElement.reset();
}

function closeModalOverlayHandler(event) {
  if (event.target == event.currentTarget) {
    const popupElement = event.currentTarget;
    closeModal(popupElement);
  }
};

function closeModalEscapeHandler(event) {
  if (event.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    closeModal(popupElement);
  }
}

function addPopupEventListeners(popupElement) {
  popupElement.addEventListener('mousedown', closeModalOverlayHandler);
  document.addEventListener('keydown', closeModalEscapeHandler);
}

function removePopupEventListeners(popupElement) {
  popupElement.removeEventListener('mousedown', closeModalOverlayHandler);
  document.removeEventListener('keydown', closeModalEscapeHandler);
}

function openEditModal() {
  clearErrors(modalEditProfile);

  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;

  openModal(modalEditProfile);
  toggleButtonState(inputsListProfile, bttnSubmitProfile, formsData.inactiveButtonClass);
};

function openAddCardModal() {
  clearErrors(modalAddCard);
  openModal(modalAddCard);
  toggleButtonState(inputsListAddCard, bttnSubmitAddCard, formsData.inactiveButtonClass);
}

function openImageModal(data) {
  imageZoomed.src = data.source;
  imageZoomed.alt = data.source;
  imageZoomedCaption.textContent = data.name;
  openModal(modalImageZoom);
};

function createCard(data) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = data.source;
  cardElement.querySelector('.card__title').textContent = cardElement.querySelector('.card__image').alt = data.name;
  cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);
  cardElement.querySelector('.card__remove-button').addEventListener('click', () => cardElement.remove());

  // Обработчик открытия фотографии
  cardImage.addEventListener('click', () => openImageModal(data));

  return cardElement;
};

function renderNewCard(data, container) {
  const cardElement = createCard(data);
  container.prepend(cardElement);
};

function submitProfileData(event) {
  event.preventDefault();
  const popupElement = event.target.closest('.popup');

  if (inputName.validity.valid && inputAbout.validity.valid) {
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closeModal(popupElement);
  }
};

function submitNewCard(event) {
  event.preventDefault();
  const popupElement = event.target.closest('.popup');

  if (newCardName.validity.valid && newCardSrc.validity.valid) {

    renderNewCard({
      name: newCardName.value,
      source: newCardSrc.value
    }, cardsContainer);

    popupAddCardForm.reset();
    closeModal(popupElement);

  }
};

// Стартовый рендер карточек по массиву и template

initialCards.forEach(item => renderNewCard(item, cardsContainer));

// --------------- Навешиваем обработчики --------------- 

// Кнопка сохранения формы профиля

popupProfileForm.addEventListener('submit', submitProfileData);

// Кнопка открытия модального окна профиля

editProfileBttn.addEventListener('click', openEditModal);

// Кнопка добавления карточек

addCardBttn.addEventListener('click', openAddCardModal);

// Кнопка сохранение формы новой карточки

popupAddCardForm.addEventListener('submit', submitNewCard);

// Кнопки закрытия попапов

bttnCloseModalZoom.addEventListener('click', () => closeModal(modalImageZoom));
bttnCloseModalAddCard.addEventListener('click', () => closeModal(modalAddCard));
bttnCloseModalProfile.addEventListener('click', () => closeModal(modalEditProfile));