import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.imageZoomed = document.querySelector(".popup__zoom-image");
    this.imageZoomedCaption = document.querySelector(".popup__image-caption");
  }

  open(source, name) {
    super.open();
    this.imageZoomed.src = source;
    this.imageZoomed.alt = name;
    this.imageZoomedCaption.textContent = name;
  }
}
