// Объявляем переменные и элементы

let initialCards = [{
    name: 'Афины',
    source: './img/gallery_image_Athens_original.JPEG'
  },
  {
    name: 'Атомиум, Брюссель',
    source: './img/gallery_image_Brussel_original.JPG'
  },
  {
    name: 'Крит',
    source: './img/gallery_image_Crete_original.JPEG'
  },
  {
    name: 'Стамбульский кот',
    source: './img/gallery_image_Istanbul_original.JPEG'
  },
  {
    name: 'Кубические дома, Роттердам',
    source: './img/gallery_image_Rotterdam_original.JPEG'
  },
  {
    name: 'Свети-Стефан',
    source: './img/gallery_image_SvetiStephan_original.JPEG'
  }
];

const modalEditProfile = document.querySelector('.popup_profile-edit');
const modalAddCard = document.querySelector('.popup_add-card');
const modalImageZoom = document.querySelector('.popup_card-zoom');
const closeModalBttns = document.querySelectorAll('.popup__close-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputAbout = document.querySelector('.popup__input_type_about');
const popupProfileForm = document.querySelector('.popup__form_profile');
const popupAddCardForm = document.querySelector('.popup__form_add-card');
const editProfileBttn = document.querySelector('.profile__edit-button');
const addCardBttn = document.querySelector('.profile__add-card');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const deleteCardBttn = document.querySelector('.card__remove-button');
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.gallery__container');

// ---------------  Описываем функции -------------- 

const toggleLike = function (event) {
  event.target.classList.toggle('card__like-button_active');
};

const openModal = function (element) {
  element.classList.add('popup_opened');
};

const closeModal = function (event) {
  event.target.closest('.popup').classList.remove('popup_opened');
};

const removeCard = function (event) {
  event.target.closest('.card').remove();
};

const saveFormData = function (event) {
  event.preventDefault();

  if (inputName.value && inputAbout.value) {

    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closeModal(event);

  } else {
    alert('Заполните все поля');
  }
};

const renderNewCard = function (data, container) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = data.source;
  cardElement.querySelector('.card__title').textContent = cardElement.querySelector('.card__image').alt = data.name;
  cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);
  cardElement.querySelector('.card__remove-button').addEventListener('click', (event) => removeCard(event));

  // Обработчик открытия фотографии
  cardImage.addEventListener('click', (event) => {
    openModal(modalImageZoom);
    const imageCaption = event.target.parentNode.querySelector('.card__title').innerHTML;
    modalImageZoom.querySelector('.popup__zoom-image').src = modalImageZoom.querySelector('.popup__zoom-image').alt = event.target.src;
    modalImageZoom.querySelector('.popup__image-caption').textContent = imageCaption;
  });

  container.append(cardElement);
};

// Стартовый рендер карточек по массиву и template

initialCards.forEach(item => {
  renderNewCard(item, cardsContainer);
});

// --------------- Навешиваем обработчики --------------- 

// Кнопка сохранения формы профиля

popupProfileForm.addEventListener('submit', saveFormData);

// Кнопки закрытия модальных окон

closeModalBttns.forEach(item => item.addEventListener('click', closeModal));

// Кнопка открытия модального окна профиля

editProfileBttn.addEventListener('click', () => {
  openModal(modalEditProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
});

// Кнопка добавления карточек

addCardBttn.addEventListener('click', () => {
  openModal(modalAddCard);
});

// Кнопка сохранение формы новой карточки

popupAddCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newCardName = document.querySelector('.popup__input_type_title');
  const newCardSrc = document.querySelector('.popup__input_type_source');

  if (newCardName.value && newCardSrc.value) {

    newCardRender({
      name: newCardName.value,
      source: newCardSrc.value
    }, cardsContainer);

    popupAddCardForm.reset();
    closeModal(event);

  } else {
    alert('Заполните все поля');
  }
});