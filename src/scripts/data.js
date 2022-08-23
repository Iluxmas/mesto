const athensImage = new URL("../img/gallery_image_Athens_original.JPEG", import.meta.url);
const brusselsImage = new URL("../img/gallery_image_Brussel_original.JPG", import.meta.url);
const creteImage = new URL("../img/gallery_image_Crete_original.JPEG", import.meta.url);
const istanbulImage = new URL("../img/gallery_image_Istanbul_original.JPEG", import.meta.url);
const rotterdamImage = new URL("../img/gallery_image_Rotterdam_original.JPEG", import.meta.url);
const montenegroImage = new URL("../img/gallery_image_SvetiStephan_original.JPEG", import.meta.url);

const initialCards = [
  { title: "Афины", source: athensImage, likes: 1 },
  { title: "Атомиум, Брюссель", source: brusselsImage, likes: 2 },
  { title: "Остров Крит", source: creteImage, likes: 3 },
  { title: "Стамбульский кот", source: istanbulImage, likes: 4 },
  { title: "Кубические дома, Роттердам", source: rotterdamImage, likes: 5 },
  { title: "Свети-Стефан", source: montenegroImage, likes: 6 },
];

const formsData = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__form-save",
  inactiveButtonClass: "popup__form-save_type_inactive",
  inputErrorClass: "popup__input_type_error",
  errorVisibleClass: "popup__error_visible",
};

const apiData = {
  token: "e3b90272-213a-40d8-9441-a8ba33ac1e6e",
  identifier: "cohort-49",
};

const cardsContainerSelector = ".gallery__container";
const popupImageSelector = ".popup_card-zoom";
const popupProfileSelector = ".popup_profile-edit";
const popupAddCardSelector = ".popup_add-card";
const popupAvatarSelector = ".popup_avatar";
const popupConfirmationSelector = ".popup_confirmation";
const profileBlockSelector = ".profile__info";
const profileNameTextSelector = ".profile__name";
const profileAboutTextSelector = ".profile__about";
const profileAvatarImgSelector = ".profile__avatar";
const cardTemplateID = "#card-template";

const imageZoomed = document.querySelector(".popup__zoom-image");
const imageZoomedCaption = document.querySelector(".popup__image-caption");

export {
  initialCards,
  formsData,
  cardsContainerSelector,
  popupImageSelector,
  popupProfileSelector,
  popupAddCardSelector,
  profileNameTextSelector,
  profileAboutTextSelector,
  cardTemplateID,
  imageZoomed,
  imageZoomedCaption,
  popupAvatarSelector,
  popupConfirmationSelector,
  profileAvatarImgSelector,
  apiData,
  profileBlockSelector,
};
