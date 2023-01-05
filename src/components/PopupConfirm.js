import Popup from "./Popup";

export default class PopupConfirm extends Popup {
  
  constructor(popupSelector) {
    super(popupSelector);
    this._btnConfirm = this._popup.querySelector('.form__sub-btn');
  }

  open(onConfirm) {
    this._onConfirm = onConfirm;
    super.open();
  }

  close() {
    this._onConfirm = undefined;
    super.close();
  }

  setEventListeners() {
    this._btnConfirm.addEventListener('click', () => {
      this._onConfirm();
      this.close();
    });
    super.setEventListeners();
  }

}