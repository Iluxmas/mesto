import Popup from "./Popup.js";

import { imageZoomed, imageZoomedCaption } from "./data.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(source, name) {
    super.open();
    imageZoomed.src = source;
    imageZoomed.alt = name;
    imageZoomedCaption.textContent = name;
  }
}
