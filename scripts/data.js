const initialCards = [
  { name: "Афины", source: "./img/gallery_image_Athens_original.JPEG" },
  { name: "Атомиум, Брюссель", source: "./img/gallery_image_Brussel_original.JPG" },
  { name: "Остров Крит", source: "./img/gallery_image_Crete_original.JPEG" },
  { name: "Стамбульский кот", source: "./img/gallery_image_Istanbul_original.JPEG" },
  { name: "Кубические дома, Роттердам", source: "./img/gallery_image_Rotterdam_original.JPEG" },
  { name: "Свети-Стефан", source: "./img/gallery_image_SvetiStephan_original.JPEG" },
];

const formsData = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__form-save",
  inactiveButtonClass: "popup__form-save_type_inactive",
  inputErrorClass: "popup__input_type_error",
  errorVisibleClass: "popup__error_visible",
};

export { initialCards, formsData };
