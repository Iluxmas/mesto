// Объявляем переменные и элементы

const inputName = document.querySelector('.popup__input_type_name');
const inputAbout = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const addCardBttn = document.querySelector('.profile__add-card');
const modalImageZoom = document.querySelector('.popup_card-zoom');
const imageZoomed = modalImageZoom.querySelector('.popup__zoom-image');
const cardTemplate = document.querySelector('#card-template').content;
const profileAbout = document.querySelector('.profile__about');
const modalAddCard = document.querySelector('.popup_add-card');
const deleteCardBttn = document.querySelector('.card__remove-button');
const cardsContainer = document.querySelector('.gallery__container');
const editProfileBttn = document.querySelector('.profile__edit-button');
const closeModalBttns = document.querySelectorAll('.popup__close-button');
const popupProfileForm = document.querySelector('.popup__form_profile');
const popupAddCardForm = document.querySelector('.popup__form_add-card');
const modalEditProfile = document.querySelector('.popup_profile-edit');

// ---------------  Описываем функции -------------- 

function toggleLike(event) {
  event.target.classList.toggle('card__like-button_active');
};

function openModal(element) {
  element.classList.add('popup_opened');
};

function closeModal(event) {
  event.target.closest('.popup').classList.remove('popup_opened');
};

function saveFormData(event) {
  event.preventDefault();

  if (inputName.value && inputAbout.value) {

    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closeModal(event);

  } else {
    alert('Заполните все поля');
  }
};

function openEditModal() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openModal(modalEditProfile);
};

function openImageModal(data) {
  const imageZoomedCaption = modalImageZoom.querySelector('.popup__image-caption');
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

// Стартовый рендер карточек по массиву и template

initialCards.forEach(item => renderNewCard(item, cardsContainer));

// --------------- Навешиваем обработчики --------------- 

// Кнопка сохранения формы профиля

popupProfileForm.addEventListener('submit', saveFormData);

// Кнопки закрытия модальных окон

closeModalBttns.forEach(item => item.addEventListener('click', closeModal));

// Кнопка открытия модального окна профиля

editProfileBttn.addEventListener('click', () => openEditModal());

// Кнопка добавления карточек

addCardBttn.addEventListener('click', () => openModal(modalAddCard));

// Кнопка сохранение формы новой карточки

popupAddCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newCardName = document.querySelector('.popup__input_type_title');
  const newCardSrc = document.querySelector('.popup__input_type_source');

  if (newCardName.value && newCardSrc.value) {

    renderNewCard({
      name: newCardName.value,
      source: newCardSrc.value
    }, cardsContainer);

    popupAddCardForm.reset();
    closeModal(event);

  } else {
    alert('Заполните все поля');
  }
});