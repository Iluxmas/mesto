import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(source, name) {
    super.open();
    this._imageZoomed = this.popupElement.querySelector(".popup__zoom-image");
    this._imageZoomedCaption = this.popupElement.querySelector(".popup__image-caption");
    this._imageZoomed.src = source;
    this._imageZoomed.alt = name;
    this._imageZoomedCaption.textContent = name;
  }
}
