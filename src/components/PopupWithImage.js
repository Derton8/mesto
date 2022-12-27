import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  
  constructor(popupSelector) {
    super(popupSelector);
    this._fullScreenImage = this._popup.querySelector('.popup__img');
    this._titleImage = this._popup.querySelector('.popup__title');
  }

  open(name, link) {
    this._fullScreenImage.src = link;
    this._fullScreenImage.alt = name;
    this._titleImage.textContent = name;
    super.open();
  }

}