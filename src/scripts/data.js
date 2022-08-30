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
  popupAvatarSelector,
  popupConfirmationSelector,
  profileAvatarImgSelector,
  apiData,
  profileBlockSelector,
};
