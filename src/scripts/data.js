const athensImage = new URL("../img/gallery_image_Athens_original.JPEG", import.meta.url);
const brusselsImage = new URL("../img/gallery_image_Brussel_original.JPG", import.meta.url);
const creteImage = new URL("../img/gallery_image_Crete_original.JPEG", import.meta.url);
const istanbulImage = new URL("../img/gallery_image_Istanbul_original.JPEG", import.meta.url);
const rotterdamImage = new URL("../img/gallery_image_Rotterdam_original.JPEG", import.meta.url);
const montenegroImage = new URL("../img/gallery_image_SvetiStephan_original.JPEG", import.meta.url);

const initialCards = [
  { name: "Афины", source: athensImage },
  { name: "Атомиум, Брюссель", source: brusselsImage },
  { name: "Остров Крит", source: creteImage },
  { name: "Стамбульский кот", source: istanbulImage },
  { name: "Кубические дома, Роттердам", source: rotterdamImage },
  { name: "Свети-Стефан", source: montenegroImage },
];

const formsData = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__form-save",
  inactiveButtonClass: "popup__form-save_type_inactive",
  inputErrorClass: "popup__input_type_error",
  errorVisibleClass: "popup__error_visible",
};

const cardsContainerSelector = ".gallery__container";
const popupImageSelector = ".popup_card-zoom";
const popupProfileSelector = ".popup_profile-edit";
const popupAddCardSelector = ".popup_add-card";
const profileNameTextSelector = ".profile__name";
const profileAboutTextSelector = ".profile__about";
const cardTemplateID = "#card-template";

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
};
